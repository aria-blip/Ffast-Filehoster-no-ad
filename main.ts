export function add(a: number, b: number): number {
  return a + b;
}

import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

// URL of the page to scrape
var siteurlurl = "https://fitgirl-repacks.site/forza-horizon-5/";

async function fetchAndExtractLinks(url:string):Promise<string[]> {
  // Fetch the page HTML
  const response = await fetch(url);
  const html = await response.text();

  // Parse the HTML document
  const doc = new DOMParser().parseFromString(html, "text/html");
  if (!doc) {
    console.error("Failed to parse HTML");
    return [];
  }

  // Select elements based on XPath (converting to querySelector)
  const targetElement = doc.querySelector("#post-22615 ul li:nth-child(2) div div:nth-child(2)");

  if (!targetElement) {
    console.error("Element not found!");
    return [];
  }

  // Extract all links inside the target element
  const links = Array.from(targetElement.querySelectorAll("a"))
    .map(a => a.getAttribute("href") || "");

  return links
  }

var listoflinks=await fetchAndExtractLinks(siteurlurl)

var listofsecretlinks: string[] = []; // Ensure this is an array of strings

for(var i of listoflinks){
  const response = await fetch(i);
const text = await response.text();

// Regex to find window.open("https://someurl")
const match = text.match(/window\.open\("([^"]+)"\)/);
console.log(match)

if (match) {
  listofsecretlinks.push(match[0].replace('window.open("',"").replace('")',""))
  console.log(match[0].replace('window.open("',"").replace('")',""))
} else {
  console.log("No match found");
}
}


async function downloadFile(url:string,filePath:string) {
  console.log(1)
  const response = await fetch(url);
  console.log(11)

  if (!response.ok) {
    console.error("Failed to download file:", response.status, response.statusText);
    return;
  }
  console.log(111)

  const file = await Deno.create(filePath);
  const writableStream = file.writable;
  await response.body?.pipeTo(writableStream).then(
  ()=>{console.log("finished downloading "+filePath.slice(-16))});
  

}


for (let i = 0; i < listofsecretlinks.length; i++) { // Ensure proper comparison
  
const filePath = "./downloads/"; // Change file name if needed
await downloadFile(listofsecretlinks[i],filePath+listoflinks[i].slice(-16),)

}


