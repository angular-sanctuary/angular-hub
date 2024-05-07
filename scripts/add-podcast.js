const fs = require('fs');
const order = require('./../add-podcast.json');

const [name, url, logo, language] = Object.values(order);

let podcastRaw = fs.readFileSync(
  './angular-hub/src/public/assets/data/podcast.json',
);
let podcastData = JSON.parse(podcastRaw);
let json = JSON.stringify(
  [
    ...podcastData,
    {
      name,
      url,
      logo,
      language,
    },
  ],
  null,
  2,
);

fs.writeFileSync('./angular-hub/src/public/assets/data/podcast.json', json);
