import { WebCrawlerController } from "./classes/WebCrawlerController";

const getStartingURL = ():string => {
  let args: string[] = process.argv.slice(2);
  return args[0];
};

let visitedPages = new Set<string>();
let urlByLinks = new Map<string, string[]>();

const crawlPageLinks = async (links: string[], subDomain: string) => {
  for(let link of links){
    if(!visitedPages.has(link)){
      const crawler = new WebCrawlerController(link, subDomain);
      let links:string[] = await crawler.fetch();
      visitedPages.add(link);
      urlByLinks.set(link, links);

      if(links.length > 0){
        await crawlPageLinks(links, subDomain);
      }
    } 
  }
};

const printUrlByLinks = () => {
  console.log('##################<VISITED URLS AND LINKS ON PAGE>#############################');
  const obj = Object.fromEntries(urlByLinks);
  console.log(JSON.stringify(obj, null, 2));
  console.log('##################</VISITED URLS AND LINKS ON PAGE>#############################');
};

const main = async () => {
  try {
    let url: URL = new URL(getStartingURL());
    let subDomain: string = url.origin;

    console.log('##################<Crawling Started....>#############################');
    await crawlPageLinks([url.href], subDomain);
    printUrlByLinks();
  } catch (error: any) {
    console.log('Invalid URL. Please try again.')
  }
};

main();