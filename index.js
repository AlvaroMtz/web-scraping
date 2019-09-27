const cheerio  = require('cheerio');
const request = require('request-promise');
const fs = require('fs-extra')

const writeStream = fs.createWriteStream('quotes.csv')

async function init () {

  const $ = await  request({
      uri: 'http://quotes.toscrape.com/',
      transform: body => cheerio.load(body)
  })

  writeStream.write('Quotes|Author|Tags\n');

    $('.quote').each((i, el) => {
        const tags = [];
        const text = $(el).find('span.text').text().replace(/(^\“|\”$)/g, "");
        const author = $(el).find('span small.author').text()
        $(el).find('.tags a.tag').each((i, el) => tags.push($(el).text()) )
        writeStream.write(`${text}|${author}|${tags}\n`)
    })

}

init();