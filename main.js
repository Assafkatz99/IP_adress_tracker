
const output_ex = {
    "ip": "8.8.8.8",
    "location": {
        "country": "US",
        "region": "California",
        "city": "Mountain View",
        "lat": 37.40599,
        "lng": -122.078514,
        "postalCode": "94043",
        "timezone": "-07:00",
        "geonameId": 5375481
    },
    "domains": [
        "0d2.net",
        "003725.com",
        "0f6.b0094c.cn",
        "007515.com",
        "0guhi.jocose.cn"
    ],
    "as": {
        "asn": 15169,
        "name": "Google LLC",
        "route": "8.8.8.0/24",
        "domain": "https://about.google/intl/en/",
        "type": "Content"
    },
    "isp": "Google LLC"
}

const buildMap = (lat,lng) => {
    


    // let map = L.map('map').setView([lat+0.003, lng], 15);
    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(map);

    // let marker = L.marker([lat, lng]).addTo(map);
    
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
    ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    osmLayer = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
    var map = new L.Map('map');
    map.setView(new L.LatLng(lat,lng), 15 );
    map.addLayer(osmLayer);
    let marker = L.marker([lat, lng]).addTo(map);
    
    
}


const getIpDataAndPutInDisplay = async (ip_input) => {
    
// ######################### Pulling IP information #########################

    let ip_data;
    // await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_AHrDRbJAZkNbupmUCVakYg50sQqIn&ipAddress=${ip_input}`)
    // .then(response => response.json())
    // .then(data_api => ip_data = data_api)
    // .catch(error => console.error(error));

    ip_data = output_ex;


// ######################### Put information inside modal #########################
    document.getElementById("ip_address_span_id").innerHTML = ip_data["ip"]
    document.getElementById("location_span_id").innerHTML = ip_data["location"]["city"] + ", " + ip_data["location"]["country"]
    document.getElementById("timezone_span_id").innerHTML = "UTC " + ip_data["location"]["timezone"]
    document.getElementById("isp_span_id").innerHTML = ip_data["isp"]

// ######################### Put information inside map #########################

buildMap(ip_data["location"]["lat"], ip_data["location"]["lng"])


}


buildMap(32.524529, 34.941971) // Binyamina's location

document.getElementById("search_button_id").addEventListener("click", () => {

    let input_bar = document.getElementById("search_input_id")

    var ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    // if (ipFormat.test(input_bar.value)){
    getIpDataAndPutInDisplay(input_bar.value)
        input_bar.value = ""
    // }else{
    //     alert("please type again proper IP address")
    // }
    
})

