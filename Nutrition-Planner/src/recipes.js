
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
    //store in local after it fetch
    newUserProfile.storeValue("recipes", recipeArray, true)
    //filter more base on calories count
    const filteredCaloriesRecipes = recipeArray.filter(checkCals)
    //filter more base on nutrients
    //const filteredRecipes = checkNutrients(filteredCaloriesRecipes)
    //populate the recipes sections
    console.log(filteredCaloriesRecipes)
    displayInGrid(recipeArray)

}

//Paremeter is the innertext of the dropdown list
function applyDietFilter(appliedFilter) {
    //get form the stored list
    const recipeArray = newUserProfile.getData("recipes")
    //filter out the appliedFilter List
    const appliedFilterRecipes = recipeArray.filter(eachRecipe => checkRecipeLabels(eachRecipe, appliedFilter))
    console.log(appliedFilterRecipes)
    displayInGrid(appliedFilterRecipes)

    return


}

//check if the health label of the recipe has the applied filiter
function checkRecipeLabels(eachRecipe, appliedFilter) {
    //get the array of the health labels
    const recpieHealthLabels = eachRecipe.recipe.healthLabels
    if (recpieHealthLabels.includes(appliedFilter)) {
        console.log(eachRecipe)
        return eachRecipe
    }
}

function filterVeganLabel(eachRecipe) {

    const recpieHealthLabels = eachRecipe.recipe.healthLabels

    if (recpieHealthLabels.includes("Vegan")) {
        console.log(eachRecipe)
        return eachRecipe
    }
}

function displayInGrid(filteredRecipes) {
    const grids = document.getElementsByClassName("recipe-item-contents")
    const recipeName = document.getElementsByTagName("h3")
    const links = document.getElementsByTagName("a")
    const imgs = document.getElementsByTagName("img")
    const gridslen = grids.length
    for (let i = 0; i < gridslen; i++) {
        //get random recipe
        //const randomRecipe = Math.floor((Math.random() * filteredRecipes.length - 1) + 0);
        imgs[i].src = filteredRecipes[i].recipe.image
        links[i].href = filteredRecipes[i].recipe.url
        recipeName[i].innerText = filteredRecipes[i].recipe.label

    }

    //hide the loader-spinner, this only workd for on awake
    document.getElementById("loader-spinner-sect").style.display = "none"
    document.getElementById("recipes-sect").style.display = "block"
}

function checkCals(eachRecipe) {
    //each item in the array is an object, with one key "recipe"
    //get the value of that recipe key
    //value is also an object, get the key calories
    const recipeCalories = eachRecipe.recipe.calories
    //get the selected Calories Info, the calories counts
    const usersCalories = newUserProfile[newUserProfile.selectedCaloriesInfo].calories
    console.log(newUserProfile[newUserProfile.selectedCaloriesInfo].calories)
    const estOneMealCalories = usersCalories / 2
    if (islessThan(recipeCalories, estOneMealCalories)) {
        console.log(eachRecipe)
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
        const usersNutrients = newUserProfile[newUserProfile.selectedCaloriesInfo]
        const usersProtein = usersNutrients.protein.grams
        const usersCarbs = usersNutrients.carbs.grams
        const usersFats = usersNutrients.fats.grams
        //get estimated nutrient for one meal
        const estOneMealProtein = usersProtein / 3
        const estOneMealCarbs = usersCarbs / 3
        const estOneMealFats = usersFats / 3

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

function addEventListeners() {
    // document.getElementById("recipes-container").addEventListener('click', (event) => {
    //     if (event.target.classList.contains("recipe-item-contents")) {
    //         //go to the url of the recipe
    //         const anchor = event.target.closest("a");
    //         console.log(anchor.getAttribute("href"))

    //     } else {
    //         console.log("not a recipe")
    //     }
    // })
    document.getElementById("filter-list").addEventListener('click', (event) => {
        if (event.target.classList.contains("dropdown-item")) {
            applyDietFilter(event.target.innerText)
            // if(event.target.id = "vegan"){
            //     //filter the recipes by vegan, get the innerhtml
            //     applyDietFilter(event.target.innerText)
            // }

        } else {
            console.log("not the dropdown list")
        }

        const dropdownOptions = document.getElementById("filter-list")

        const btns = dropdownOptions.getElementsByClassName("dropdown-item active")
        if (btns.length > 0) {
            btns[0].className = btns[0].className.replace(" active", "")
        }

        //add the active class to it so it will highlight
        event.target.className += " active"
    })


}

function init() {
    //get a a bucnh a receipes firts


    if (newUserProfile.hasStorage("goal-nutrients-info")) {
        console.log("goal-nutrients-info page has data")
        //get data
        //newUserProfile.inputstorage("recipes")
        newUserProfile.inputstorage("goal-nutrients-info")
        newUserProfile.inputstorage("maintainence-nutrients-info")
        newUserProfile.inputstorage("goal")
        newUserProfile.inputstorage("user-info")
        newUserProfile.inputstorage("selected-calories-info")
        //displayInGrid( newUserProfile.recipes)
        //return
    }
    fetchDataAsync("https://edamam-recipe-search.p.rapidapi.com/search?q=lunch&from=0&to=60", options)

    addEventListeners()
    //filter recipes that match with user nutritents
    //populate the recipes
}
init()