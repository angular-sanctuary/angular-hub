const puppeteer = require('puppeteer');

(async () => {
  const response = await fetch('https://angular-hub.com/api/v1/communities');
  const communities = await response.json();

  // Angular Community Meetup filtered form automation due to regular non-angular events and date errors
  const filteredCommunities = communities.filter(
    (community) =>
      !!community.eventsUrl &&
      community.eventsUrl.includes('meetup.com') &&
      community.name !== 'Angular Community Meetup',
  );

  for await (const community of filteredCommunities) {
    // Launch the browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      // Navigate to the Meetup group's events page
      console.log(`Navigating to ${community.eventsUrl}...`);
      await page.goto(community.eventsUrl, { waitUntil: 'domcontentloaded' });

      // Extract event details for each upcoming event
      const eventsData = await page.evaluate(() => {
        const events = [];

        // Select all upcoming events
        document.querySelectorAll('li div a.flex').forEach((event) => {
          const eventName = event.querySelector('span')?.innerText;
          const eventDate = event.querySelector('time')?.innerText;
          const eventLocation =
            event.querySelector('span.text-gray6')?.innerText;

          if (eventName && eventDate) {
            events.push({ eventName, eventDate, eventLocation });
          }
        });

        return events;
      });

      console.log('Upcoming Events:', eventsData);
    } catch (error) {
      console.error('Error extracting data:', error);
    } finally {
      // Close the browser
      await browser.close();
    }
  }
})();
