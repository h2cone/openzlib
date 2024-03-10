const wikiUrl = 'https://en.wikipedia.org/wiki/Z-Library';
const selector = '#mw-content-text > div.mw-content-ltr.mw-parser-output > table.infobox.vcard > tbody > tr:nth-child(4) > td > div > ul > li:nth-child(1) > span > a'

fetch(wikiUrl)
    .then(response => response.text())
    .then(text => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(text, 'text/html');
        // select the target element
        let target = doc.querySelector(selector);
        let url = target.getAttribute('href');
        // open the url in a new tab
        chrome.tabs.create({ url: url });
    })
    .catch((error) => {
        console.error('Error:', error);
    });