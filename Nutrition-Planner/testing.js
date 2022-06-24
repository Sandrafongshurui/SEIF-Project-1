//homepage. 3 buttons needed,
//click button, link to the userinfo page, store user goal in local storage
//userinfo page. user's inputs and selection needs to be saved in local storage
//Forced user to only input numbers, and must select option or else prompt if there are blanks
//


// ////This API works
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '73737b6a41mshf395571d0182015p1516ebjsn0514a22c2864',
		'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
	}
};

//retrieving from api with async
async function fetchDataAsync(url, options) {
  const response = await fetch(url, options)//returns a prmose, retunring the re.json
  const data = await response.json()//converts the .json string ito a js object, and retrun a promise
  console.log(data.hits)
}


const storeUserGoal = () => {
	 console.log("stroe user goal in local storage")
	 //window.location.href
	//  const userGoalPara = document.querySelector(".user-info-page p")
	//  userGoalPara.innerHTML = goal
}


const createUserProfile = () => {
	const newUser = new User()
}

class User{
	constructor(goal, gender, age, weight, dailyActivity, physicalFreq){

	}
	//store local data function()
}

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '73737b6a41mshf395571d0182015p1516ebjsn0514a22c2864',
// 		'X-RapidAPI-Host': 'yummly2.p.rapidapi.com'
// 	}
// };

// fetch('https://yummly2.p.rapidapi.com/feeds/search?start=0&maxResult=18&maxTotalTimeInSeconds=7200&ENERC_KCALMax=500&PROCNTMax=5', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// //fetch the metadata
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '73737b6a41mshf395571d0182015p1516ebjsn0514a22c2864',
// 		'X-RapidAPI-Host': 'yummly2.p.rapidapi.com'
// 	}
// };


// fetch('https://yummly2.p.rapidapi.com/feeds/search?start=0&maxResult=5&PROCNTMax=22', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


function init() {
	fetchDataAsync("https://edamam-recipe-search.p.rapidapi.com/search?q=lunch&from=0&to=10", options)
}
init()