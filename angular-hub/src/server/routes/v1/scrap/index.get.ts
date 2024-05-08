import { defineEventHandler, getQuery } from 'h3';
import pupeteer from 'puppeteer';

// TODO duplicate to /communities, keep it as promoted on social media
export default defineEventHandler(async (event) => {
  const { url }: { url: string } = getQuery(event);
  try {
    const browser = await pupeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const titleSelector = await page.waitForSelector('h1');
    const title = await page.evaluate(
      (titleSelector) => titleSelector.textContent,
      titleSelector,
    );

    console.log(title);
  } catch (error) {
    throw new Error('Invalid community data format');
  }
});
