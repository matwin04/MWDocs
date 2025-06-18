
# TransitLand API

## 1. Get Station Departures
### 1.1 Example 
#### With Onestop ID
https://transit.land/api/v2/rest/stops/s-9qh0n07bue-santaana/departures

#### Fetch Generator JS
```js
fetch("https://transit.land/api/v2/rest/stops/s-9qh0n07bue-santaana/departures", {
      "method": "GET",
      "headers": {
            "apikey": "WOo9vL8ECMWN76EcKjsNGfo8YgNZ7c2u"
      }
})
.then((res) => res.text())
.then(console.log.bind(console))
.catch(console.error.bind(console));
```


### 1.2 Response
| Key Or Index | Example Value         |
| ------------ | --------------------- |
| id           | 1436974125            |
| onestop_id   | s-9qh0n07bue-santaana |
| stop_name    | Santa Ana             |
|              |                       |
# Manual GTFS Data
