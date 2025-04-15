import { defineEventHandler, sendError, createError } from "h3";
import puppeteer from "puppeteer";

export default defineEventHandler(async (event) => {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    const url = "https://quotes.toscrape.com/";

    await page.goto(url);

    const quote = await page.$eval(".quote .text", (el) =>
      el.textContent?.trim()
    );

    await browser.close();

    return { title: quote };
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Error occurred during scraping",
      })
    );
  }
});
