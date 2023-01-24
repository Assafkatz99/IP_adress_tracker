let map;

function createMap(lang, lng) {
  if (map) {
    map.remove();
  }
  
  const mapDiv = document.getElementById("map");
  map = L.map(mapDiv).setView([lang+0.002, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
  }).addTo(map);
    
  L.marker([lang, lng]).addTo(map);

}

const getIpDataAndPutInDisplay = async (ip_input) => {
    
// ######################### Pulling IP information #########################

    let ip_data;
    await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_AHrDRbJAZkNbupmUCVakYg50sQqIn&ipAddress=${ip_input}`)
    .then(response => response.json())
    .then(data_api => ip_data = data_api)
    .catch(error => console.error(error));


// ######################### Put information inside modal #########################
    document.getElementById("ip_address_span_id").innerHTML = ip_data["ip"]
    document.getElementById("location_span_id").innerHTML = ip_data["location"]["city"] + ", " + ip_data["location"]["country"]
    document.getElementById("timezone_span_id").innerHTML = "UTC " + ip_data["location"]["timezone"]
    document.getElementById("isp_span_id").innerHTML = ip_data["isp"]

// ######################### Put information inside map #########################

createMap(ip_data["location"]["lat"], ip_data["location"]["lng"])


}


createMap(32.524529, 34.941971) // Binyamina's location

document.getElementById("search_button_id").addEventListener("click", () => {

    let input_bar = document.getElementById("search_input_id")

    var ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (ipFormat.test(input_bar.value)){
    getIpDataAndPutInDisplay(input_bar.value)
        input_bar.value = ""
    }else{
        alert("please type again proper IP address")
    }
    
})

