# Simple Web Crawler<!-- omit in toc -->

## Table of Content<!-- omit in toc -->

- [Program Structure](#program-structure)
  - [Feature](#feature)
  - [Feature Goal](#feature-goal)
  - [Technical Plan](#technical-plan)
  - [Affected Data Model](#affected-data-model)
  - [Limitations/Trade-offs](#lmitationstrade-offs)
  - [Error Handling](#error-handling)
- [Getting Started](#getting-started)
- [Manual Installation](#manual-installation)
  - [Prerequisites](#prerequisites)
  - [Install Dependencies](#install-dependencies)
  - [Run the Project](#run-the-project)

## Program Structure

### Feature

Simple Web Crawler

### Feature Goal

The goal of this feature is to print each URL visited and the links found on that page. Given a starting URL from the user, the crawler should visit each URL it finds in the same domain. It will not follow external links and is limited to one subdomain.

### Technical Plan

Implement program using node.js with typescript. Node.js will allow us to run outside of a browser and typescript will allow us to add type safety to this project. Since UI is not a concern I wont be using reactjs for the frontend and will simply display the list in the terminal. 

  - Get starting URL 
  Use arguments provided to command prompt as url starting point.

  - Get subdomain
  Parse command prompt argument for url subdomain. This will be set to limit crawler from visiting external links. Cast url string to new URL type and pull hostname value from url object. This will be done to all links to insure no external links are followed. ----******uSing a new method now***** parsed with cheerio link selector

  - Web crawl
  Axios will be used for fetching wesite data and Cheerio will also be used to parse HTML. After visiting a page I will leverage Cheerio to pull all links filtering by subdomain. If more links are found the process of visiting and finding links will be repeated until all pages are visited and all links found. 

  - Populate URL data map
  During the web crawl I will be buildng a url by links map. see [Affected Data Model](#affected-data-model). This will have a key of the url visited and a list of all the valid urls on that page to visit.

  - Print data
  When the crawler has finished its job I will print the json object to the terminal displaying all the urls and the links on their pages.

### Affected Data Model
```typescript
let urlByLinks: Map<string, string[]> = {
  "https://www.monzo.com/" : ["https://www.monzo.com/about-us","https://www.monzo.com/contact-us", ...],
}
```
### Lmitations/Trade-offs

1. Only one url can be crawled at a time

2. Can not use frameworks to handle crawling

3. 

### Error Handling
  - Axios error
  Display errors message passed back on terminal to user.
  - URL error
  Display error message received during string to URL type conversion. 

## Getting Started
## Manual Installation
### Prerequisites
### Install Dependencies
### Run the Project
  if you see zsh: command not found: ts-node need to install ts-code globally ```npm install -g ts-node``` or use npx ts-node index.ts
