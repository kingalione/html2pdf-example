const puppeteer = require("puppeteer");
const fs = require('fs');

function base64Encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString('base64');
}
(async () => {
  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Website URL to export as pdf
  const website_url =
    "https://www.bannerbear.com/blog/how-to-convert-html-into-pdf-with-node-js-and-puppeteer/";

  // Open URL in current page
  await page.goto(website_url, { waitUntil: "networkidle0" });

// Capture screenshot
  await page.screenshot({
    path: `blabla.jpg`,
  });
  const image = 'data:image/png;base64,' + base64Encode('blabla.jpg');

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType("screen");

  await page.goto(image, {waitUntil: 'networkidle2'});
  // Downlaod the PDF
  const pdf = await page.pdf({
    path: "result.pdf",
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  // Close the browser instance
  await browser.close();
})();


// example from:
//https://stackoverflow.com/questions/59677228/convert-screenshot-to-pdf-in-puppeteer