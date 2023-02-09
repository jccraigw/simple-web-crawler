import axios from 'axios';
import cheerio from 'cheerio';

export class WebCrawlerController {
  url: string;
  links: string[];
  subDomain: string;

  constructor(inputURL: string, hrefSubDomain: string) {
    this.url = inputURL.endsWith( '/') ? inputURL : inputURL + '/';
    this.links = [];
    this.subDomain = hrefSubDomain;
  };

  fetch = async(): Promise<string[]> => {
    try {
      await this.getPageLinks();
      this.links = [... new Set(this.links)]; 
    } catch (error) {
      console.log('An error occured fetching page')
    }
    return this.links;
  };

  getPageLinks = async () => {
    try {
      const response = await this.getPageData();
      const $ = cheerio.load(response ? response: '');
      const links = $('a[href^="' + this.subDomain + '"]')
        .map((i, el) => $(el).attr('href'))
        .get();
      this.links = links;
    } catch (error) {
      console.log('An error occured retrieving page links')
    }
  };

  getPageData = async () => {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error:any) {
     console.log(`A ${error.response.status} status code occured retrieving url: ${this.url}`);
    }
  };
}