fetch("https://test.api.amadeus.com/v1/security/oauth2/token",
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
}*/

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
fetch("https://api.covid19tracking.narrativa.com/api/country/spain?date_from=2020-03-20&date_to=2020-03-22", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


