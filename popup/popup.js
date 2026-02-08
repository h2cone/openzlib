const wikiUrl = 'https://en.wikipedia.org/wiki/Z-Library';
const selectors = [
    '#mw-content-text > div.mw-content-ltr.mw-parser-output > table.infobox.vcard > tbody > tr:nth-child(4) > td > div > ul > li:nth-child(2) > a',
    '#mw-content-text > div.mw-content-ltr.mw-parser-output > table.infobox.vcard > tbody > tr:nth-child(4) > td > div > ul > li:nth-child(2) > span > a',
    'table.infobox.vcard a.external'
];

fetch(wikiUrl)
    .then(response => response.text())
    .then(text => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(text, 'text/html');
        let target = selectors
            .map(selector => doc.querySelector(selector))
            .find(element => element !== null);

        if (!target) {
            throw new Error('Unable to find Z-Library URL from Wikipedia infobox.');
        }

        let url = new URL(target.getAttribute('href'), wikiUrl).href;
        // open the url in a new tab
        chrome.tabs.create({ url: url });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
