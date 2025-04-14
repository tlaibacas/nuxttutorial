import { defineEventHandler, sendError, createError } from 'h3';
import puppeteer from 'puppeteer';

export default defineEventHandler(async (event) => {
  try {
    console.log('[Scraping] Launching browser...');
    const browser = await puppeteer.launch();

    console.log('[Scraping] Opening new page...');
    const page = await browser.newPage();

    const url = 'https://quotes.toscrape.com/';
    console.log(`[Scraping] Navigating to: ${url}`);
    await page.goto(url);

    console.log('[Scraping] Extracting first quote...');
    const quote = await page.$eval('.quote .text', (el) => el.textContent?.trim());

    console.log(`[Scraping] First quote found: ${quote}`);

    console.log('[Scraping] Closing browser...');
    await browser.close();

    console.log('[Scraping] Done!');
    return { quote };
  } catch (error) {
    console.error('[Scraping] Error during scraping:', error);
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Error occurred during scraping'
    }));
  }
});
