/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// Personal API Key for OpenWeatherMap API
let apiKey = '4fecd2575fa828dd357fce43399d78ea';
// Event listener to add function to existing HTML DOM element
const button=document.getElementById('generate');
button.addEventListener('click', getWeather);
/* Function called by event listener */
function getWeather(){
const zipCode =  document.getElementById('zip').value;
const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`
const Feelings= document.getElementById('feelings').value;
getTemp(baseURL,zipCode, apiKey)
.then((data)=>{
  //call back post function
  postProjectData('http://localhost:8080/add',{date: newDate, temp: data.main.temp, content: Feelings});
})
.then(
  updateUI()
)
};
/* Function to GET Web API Data*/
async function getTemp (baseURL,zipCode, apikey){
  const res = await fetch(baseURL+zipCode+apikey)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}
/* Function to POST data */
const postProjectData = async ( url = 'http://localhost:8080/add', data = {})=>{
  console.log(data)
    const res = await fetch('http://localhost:8080/add', {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),         
  })
  .then(res => res.json());

  try {
    const data = await res.json()
    console.log('response data?', data)
  } catch(error) {
    console.log('Error happened here!')
    console.error(error)
  }
}

  /* Function to GET Project Data */
  async function updateUI (){
    const req = await fetch('http://localhost:8080/all');
    try{
      const data = await req.json();
      console.log('response data?', data)
      document.getElementById('temp').innerHTML = data.temp;
      document.getElementById('date').innerHTML = data.date;
      document.getElementById('content').innerHTML = data.content;
    }
    catch(error){
      console.log('Error happened here!')
    console.error(error)
    }
  }
   

 



  