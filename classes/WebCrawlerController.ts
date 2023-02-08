import axios from 'axios';
import cheerio from 'cheerio';

export class WebCrawlerController {
  url: string;
  links: string[];

  constructor(inputURL: string) {
    this.url = inputURL.endsWith( '/') ? inputURL : inputURL + '/';
    this.links = [];
  }

  async fetch(){
    try {
      await this.getPageLinks();
      this.links = [... new Set(this.links)];
      return this.links;
    } catch (error) {
      throw error;
    }
  }

  async getPageLinks(){
    try {
      const response = await this.getPageData();
      const $ = cheerio.load(response);
      const links = $('a[href^="' + this.url + '"]')
        .map((i, el) => $(el).attr('href'))
        .get();
      console.log('*******', links);
    } catch (error) {
      throw new Error('An error occured retrieving link');
    }
  }

  async getPageData(){
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async crawlPageLinks(links: string[]){
    for(let link of links){
      console.log('*******', link);
    }
  }
}