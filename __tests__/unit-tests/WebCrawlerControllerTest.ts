import 'jest';
import axios from 'axios';
import { WebCrawlerController } from "../../classes/WebCrawlerController";

describe('WebCrawlerController', () => {
  let instance: WebCrawlerController;
  axios.get = jest.fn();
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let htmlData = `"<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>HTML 5 Boilerplate</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
      <a href="https://www.example.com"></a>
      <a href="/about-us"></a>
      </body>
    </html>"`;

  let emptyHtmlData = `"<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>HTML 5 Boilerplate</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
      </body>
    </html>"`;

  beforeEach(() => {
    instance = new WebCrawlerController('https://www.example.com', 'https://www.example.com' );
    mockedAxios.get.mockResolvedValue({
      data: htmlData,
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });
  });

  it('should get the page html data', async () => {
    expect(instance).toBeInstanceOf(WebCrawlerController);
    const pageData = await instance.getPageData();
    expect(pageData).toBeDefined();
    expect(pageData).toEqual(htmlData);
  });

  it('should return all links on the page', async () => {
    expect(instance).toBeInstanceOf(WebCrawlerController);
    const fetch = await instance.fetch();
    expect(fetch).toBeDefined();
    expect(fetch).toEqual(["https://www.example.com/about-us", "https://www.example.com"]);
  });

  it('should return empty list of links', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: emptyHtmlData,
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    expect(instance).toBeInstanceOf(WebCrawlerController);
    const fetch = await instance.fetch();
    expect(fetch).toBeDefined();
    expect(fetch).toEqual([]);
  });


  it('should console log error message for error getting page data', async () => {  
    let instance: WebCrawlerController = new WebCrawlerController('https://www.example.com', 'https://www.example.com' );
    console.log = jest.fn();
    mockedAxios.get.mockRejectedValue(Object.assign(new Error('A 404 status code occured retrieving url: https://www.example.com/'),{ response: {status: 404 }}));
    
    expect(instance).toBeInstanceOf(WebCrawlerController);
    const fetch = await instance.getPageData();
    expect(console.log).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('A 404 status code occured retrieving url: https://www.example.com/');
    
  });
});







