
import newUserProfile from "./JavaScript Files/main.js"
console.log("this is recipes.js")
//const recipeArray = null
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
    console.log(data.hits)//returns an array of 10 recipes
    const recipeArray = data.hits
    //filter more base on calories count
    const filteredCaloriesRecipes = recipeArray.filter(checkCals)
    //filter more base on nutrients
    const filteredRecipes = checkNutrients(filteredCaloriesRecipes)
    //populate the recipes sections
    console.log(filteredRecipes)
    displayInGrid(filteredRecipes)
}

function displayInGrid(filteredRecipes){
    const grids = document.getElementsByTagName("h3")
    const imgs = document.getElementsByTagName("img")
    const imgsArray = [...imgs]
    const gridArray = [...grids]
    console.log(gridArray)
    gridArray.forEach(eachGrid => {
        eachGrid.innerHTML= "Raasin"
   });
   imgsArray.forEach(eachImg => {
    eachImg.src= filteredRecipes[0].recipe.image
});


}

function checkCals(eachRecipe) {
    //each item in the array is an object, with one key "recipe"
    //get the value of that recipe key
    //value is also an object, get the key calories
    const recipeCalories = eachRecipe.recipe.calories
    //get the selected Calories Info, the calories counts
    const usersCalories = newUserProfile.totalCaloriesInfo[newUserProfile.selectedCaloriesInfo].calories
    const estOneMealCalories = 700//usersCalories/3
    if (islessThan(recipeCalories, estOneMealCalories)) {
        return eachRecipe
    }
}

function checkNutrients(recipesArray) {
    const recipeArrayLength = recipesArray.length
    const filteredRecipes = []
    for (let i = 0; i < recipeArrayLength; i++) {
        //get protein, carbs, fats from recipe
        const recipeNutrients = recipesArray[i].recipe.totalNutrients
        const recipeProtein = recipeNutrients.PROCNT.quantity
        const recipeCarbs = recipeNutrients.CHOCDF.quantity
        const recipeFats = recipeNutrients.FAT.quantity
        //get protein, carbs, fats from users selceted calories info
        const usersNutrients = newUserProfile.totalCaloriesInfo[newUserProfile.selectedCaloriesInfo]
        const usersProtein = usersNutrients.protein.grams
        const usersCarbs = usersNutrients.carbs.grams
        const usersFats = usersNutrients.fats.grams
        //get estimated nutrient for one meal
        const estOneMealProtein = 40//usersProtein/3
        const estOneMealCarbs= 40//usersCarbs/3
        const estOneMealFats= 40//usersFats/3

        //check that the recipe suits the user's nutritional needs
        if (islessThan(recipeProtein, estOneMealProtein) && islessThan(recipeCarbs, estOneMealCarbs) && islessThan(recipeFats, estOneMealFats)) {
            filteredRecipes.push(recipesArray[i])
        }
    }
    return filteredRecipes
}

function islessThan(count, controlCount) {
    return count <= controlCount ? true : false
}

function init() {
    //get a a bucnh a receipes firts
    fetchDataAsync("https://edamam-recipe-search.p.rapidapi.com/search?q=lunch&from=0&to=40", options)
    //filter recipes that match with user nutritents
    //populate the recipes
}
init()