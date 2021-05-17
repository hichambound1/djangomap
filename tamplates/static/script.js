
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGljaGFtLTQzIiwiYSI6ImNrb2lpb3p6YjAyZTQydW53MTRnZHhrcTYifQ.e7Pas7184hVMFQKbKt4reA'; // replace this with your access token
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/hicham-43/ckoij6l7608w018mwz3j9lzl7', // replace this with your style URL
      center: [-87.661557, 41.893748],
      zoom: 10.7
    });

    // code from the next step will go here
   navigator.geolocation.getCurrentPosition(successCallback,errorCallback,{enableHighAccuracy:true})
   function successCallback(position) {
       setupMap([position.coords.longitude,position.coords.latitude])
   }
   function errorCallback() {
       alert("couldn't find the location");
       setupMap([-87.661557, 41.893748])
    }
   function setupMap(center) {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/hicham-43/ckoij6l7608w018mwz3j9lzl7', // replace this with your style URL
        center:center,
        zoom: 10.7
      });        
    
     
      map.addControl(new mapboxgl.NavigationControl());
//  var directions = new MapboxDirections({
//         accessToken:mapboxgl.accessToken,
//         unit: 'metric',
//         profile: 'mapbox/cycling'
//       });
      
    // map.addControl(directions, 'top-left');
   } 
  
var draw = new MapboxDraw({
displayControlsDefault: false,
controls: {
polygon: true,
trash: true
},
defaultMode: 'draw_polygon'
});
map.addControl(draw);
 
map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);
 
function updateArea(e) {
var data = draw.getAll();
var answer = document.getElementById('calculated-area');
if (data.features.length > 0) {
var area = turf.area(data);
// restrict to area to 2 decimal points
var rounded_area = Math.round(area * 100) / 100;
answer.innerHTML =
'<p><strong>' +
rounded_area +
'</strong></p><p>square meters</p>';
} else {
answer.innerHTML = '';
if (e.type !== 'draw.delete')
alert('Use the draw tools to draw a polygon!');
}
}
