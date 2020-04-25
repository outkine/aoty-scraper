# AOTY scraper

1. On open.spotify.com -> artists
```js
var artists = Array.from(document.querySelectorAll('._7ea86789e4af7992dcd49c8342079eca-scss'))
                .map(el => el.innerText)
```

2. On albumoftheyear.org
```js
Promise.all(artists.map(artist =>
	fetch(`https://www.albumoftheyear.org/search-autocomplete.php?term=${artist}`)
            .then(res => res.json()).then(data => data[0])
)).then(res => console.log(JSON.stringify(res.filter(Boolean))))
```

3. Copy and paste that into ./data.json, and run main.js
