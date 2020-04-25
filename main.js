const cheerio = require('cheerio')
const fetch = require('node-fetch')
const rawdata = require('./data.json')

Promise.all(
  rawdata.map(({ link }) =>
    fetch('https://www.albumoftheyear.org/' + link).then((body) => body.text()),
  ),
)
  .then((data) => {
    const res = data
      .map((page, i) => {
        const $ = cheerio.load(page)
        return [
          rawdata[i].value,
          $('.artistCriticScoreBox [itemprop="ratingValue"]').text(),
          $('.artistCriticScoreBox [itemprop="reviewCount"]').text(),
          $('.artistUserScoreBox .artistUserScore').text(),
          $('.artistUserScoreBox strong').text(),
          $('.detailRow')
            .first()
            .find('a')
            .map((i, el) => $(el).text())
            .get()
            .join(', '),
        ]
      })
      .map((row) => row.join('\t'))
      .join('\n')
    console.log(res)
  })
  .catch((err) => {
    console.log(`Something went wrong: ${err}`)
  })
