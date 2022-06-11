// async function getFruitsData(url) {
//         const response = await fetch(url)
//         const data = await response.json()//the response must be true if not it will wait
//         console.log("data: ", data)
// }

// const init = () => {
//     getFruitsData("https://fit-life-food.p.rapidapi.com/food") 
// }

//testing api
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '73737b6a41mshf395571d0182015p1516ebjsn0514a22c2864',
		'X-RapidAPI-Host': 'fit-life-food.p.rapidapi.com'
	}
};

fetch('https://fit-life-food.p.rapidapi.com/food', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));