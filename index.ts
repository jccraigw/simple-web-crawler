import { WebCrawlerController } from "./classes/WebCrawlerController";
const getStartingURL = ():string => {
  let args: string[] = process.argv.slice(2);
  return args[0];
};

async function main() {
  try {
    let url: URL = new URL(getStartingURL());
    //dont think I need subDomain now
    let subDomain: string = url.hostname;
    console.log(subDomain, url.href);
    //this is the intial call.
    const crawler = new WebCrawlerController(url.href);
    let links = await crawler.fetch();
    if(links.length > 0){
      crawler.crawlPageLinks(links);
    }
  } catch (error: any) {
    throw new Error('Invalid URL');
  }
}

main();