import { strict as assert } from 'assert';
import puppeteer from 'puppeteer';

import { fetchRequest } from './index.js';

let fetchRequestSource = fetchRequest.toString();

(async () => {
  let result;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  result = page.evaluate(fetchRequestString => {
    let fetchRequestInBrowser = new Function(`return ${fetchRequestString}`)();
    return fetchRequestInBrowser('http://httpstat.us/200');
  }, fetchRequestSource);
  await assert.doesNotReject(result, Error);
  console.log('✅ Request completed');

  result = page.evaluate(fetchRequestString => {
    let fetchRequestInBrowser = new Function(`return ${fetchRequestString}`)();
    let request = fetchRequestInBrowser('http://httpstat.us/200?sleep=1000');
    setTimeout(() => request.cancel(), 10);
    return request;
  }, fetchRequestSource);
  await assert.rejects(result, {
    message: 'Evaluation failed: DOMException: The user aborted a request.',
    name: 'Error'
  });
  console.log('✅ Request canceled');

  await browser.close();
})();
