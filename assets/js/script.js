var originOptions = ["JFK", "LGA", "NWK", "MAD", "RIO"]; 
var destinationOptions = ["JFK", "LGA", "NWK", "MAD", "RIO"]; 

var originSelect = document.getElementById("origin"); 
var destinationSelect = document.getElementById("destination"); 

applyChoices(originOptions, originSelect);
applyChoices(destinationOptions, destinationSelect);

var searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", searchResults);

var origin;
var destination;
var departureDate;

function searchResults(){
    origin = document.getElementById("origin").value;
    destination = document.getElementById("destination").value;
    departureDate = moment(document.getElementById("departure-date").value).format("YYYY-MM-DD");

    // fetch("https://www.airport-data.com/api/ap_info.json?iata=JFK",
    // {
    //     //mode: "no-cors",
    //     headers: {"Content-Type": "application/json"}
    // })
    // .then(function(data){
    //     console.log(data);
    // });

    //flightSearch();
    COVIDSearch();
    

}

function flightSearch(){
    fetch("https://test.api.amadeus.com/v1/security/oauth2/token",
    {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: "grant_type=client_credentials&client_id=lnAAmWl7igs0Zz53pQS7zKu7Dh4cyqGA&client_secret=bsn0KuCd9bBXIVR6"
    })
    .then(processJSON)
    .then(fetchFlight)
    .then(processJSON)
    .then(displayResults)
    .catch(err => {
	    console.error(err);
    });
}

function displayResults(response){
    for(var i = 0; i < 2; i ++){
        console.log(response.data[i]);
        console.log("Seats:" + response.data[i].numberOfBookableSeats);
        console.log("Price:" + response.data[i].price.total);
        console.log("CheckedBags:" + response.data[i].pricingOptions.includedCheckedBagsOnly);
        console.log("OneWay:" + response.data[i].oneWay);
        console.log("DepartureTime:" + response.data[i].itineraries[0].segments[0].departure.at);
    }
    
}

function processJSON(response){
	return response.json();
};

function fetchFlight(token){
    console.log(token.access_token);
    return fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=1`,
    {
        headers: {"Authorization": "Bearer " + token.access_token }
    });
}

function COVIDSearch(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

    var COVIDorigin;
    if(origin == "MAD")
      COVIDorigin = "Spain";
      
    fetch(`https://api.covid19tracking.narrativa.com/api/country/${COVIDorigin}?date_from=${moment().format("YYYY-MM-DD")}`, requestOptions)
        .then(response => response.json())
        .then(function(result){
            console.log(result.total.today_confirmed);
            console.log(result.total.yesterday_confirmed);
            console.log(result.total.today_deaths);
            console.log(result.total.yesterday_deaths);
            console.log(result.total.today_open_cases);
            console.log(result.total.yesterday_open_cases);
        })
        .catch(error => console.log('error', error));

}

function applyChoices(options, select){
    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

/*fetch("https://test.api.amadeus.com/v1/security/oauth2/token",
{
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: "grant_type=client_credentials&client_id=lnAAmWl7igs0Zz53pQS7zKu7Dh4cyqGA&client_secret=bsn0KuCd9bBXIVR6"
})
.then(processJSON)
.then(fetchFlight)
.then(processJSON)
.then(console.log)
.catch(err => {
	console.error(err);
});

function processJSON(response){
	return response.json();
};

function fetchFlight(token){
    console.log(token.access_token);
    return fetch("https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=RIO&destinationLocationCode=MAD&departureDate=2021-11-01&adults=1",
    {
        headers: {"Authorization": "Bearer " + token.access_token }
    });
}

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
fetch("https://api.covid19tracking.narrativa.com/api/country/spain?date_from=2020-03-20&date_to=2020-03-22", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

*/


