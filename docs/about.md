
# About
<p style="color: #ff7340; border: 1px solid rgba(255, 135, 23, 0.25); border-radius:5px; padding: 1rem;">
Welcome this website unlike <a href="https://mattwiner.org">mattwiner.org</a> uses vitepress
This is more of a API testing ground and a place
to keep some personal notes
</p>

## Routes
| ID                                       | Link |
| ---------------------------------------- | ---- |
| [Metro K-Line](routes/r-9q5c-metrokline) |      |
|                                          |      |
<div id=""></div>
<script>
async function fetchRoute(routeID) {
}
async function fetchDepartures(stopId) {
  const TRANSIT_API_KEY = "WOo9vL8ECMWN76EcKjsNGfo8YgNZ7c2u";
  const response = await fetch(`https://transit.land/api/v2/rest/stops/${stopId}/departures`, {
    method: "GET",
    headers: {
      apikey: TRANSIT_API_KEY
    }
  });

  if (!response.ok) {
    console.error(`Failed to fetch departures: ${response.status}`);
    return;
  }

  const data = await response.json();
  const departures = data.departures.map(dep => ({
    trip: dep.trip,
    departure: dep.departure_time,
    route_color: `#${dep.trip.route.route_color}`,
    route_text_color: `#${dep.trip.route.route_text_color}`
  }));
  document.setContent
  console.log(departures);
}
</script>

https://www.transit.land/feeds/o-9qh-metrolinktrains
https://www.transit.land/api/v2/rest/routes/f-9qh-metrolinktrains

<a href="/metrolink/routes/OC-Line">OC LINE</a>

<script src="https://unpkg.com/maplibre-gl@^5.6.0/dist/maplibre-gl.js"></script>
<link href="https://unpkg.com/maplibre-gl@^5.6.0/dist/maplibre-gl.css" rel="stylesheet" />

<div id="container"></div>
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script type="module">

// Declare the x (horizontal position) scale.
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// Add the y-axis.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// Append the SVG element.
container.append(svg.node());

</script>