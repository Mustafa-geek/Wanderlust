mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style:"mapbox://styles/mapbox/streets-v12", //style URL
    center: ans.geometry.coordinates,  //iske andar listing mei apan jo location diye uske cordinates sve hota using geometery...see listings.js in controllers in createLisiting
    zoom: 8 // starting zoom
});

// console.log(ans.geometry.coordinates);

const marker1 = new mapboxgl.Marker({color:"red"})      // Create a default Marker and add it to the map.
        .setLngLat(ans.geometry.coordinates)   
        .setPopup(
            new mapboxgl.Popup({offset:25})
        .setHTML(`<h4>${ans.title}</h4><p> Exact location will be provided after booking </p>`
        )
        )     
        .addTo(map);
