
import newUserProfile from "./JavaScript Files/main.js"

function addEventListeners() {
    document.getElementById("filter-list").addEventListener('click', (event) => {
        if (event.target.classList.contains("dropdown-item")) {
            const currentRecipes = document.getElementsByClassName("recipe-item")
            while (currentRecipes.length > 0) {
                currentRecipes[0].remove();
            }
            if (event.target.id !== "no-filter") {
                applyDietFilter(event.target.innerText)
            } else {
                const recipeArray = newUserProfile.recipes
                createReceipeGrid(recipeArray)
            }
        }
    })
}

//Paremeter is the innertext of the dropdown list
function applyDietFilter(appliedFilter) {
    //get from the stored list
    const recipeArray = newUserProfile.recipes
    //filter out the appliedFilter List
    const appliedFilterRecipes = recipeArray.filter(eachRecipe => checkRecipeLabels(eachRecipe, appliedFilter))
    console.log(appliedFilterRecipes)
    createReceipeGrid(appliedFilterRecipes)
    //displayInGrid(appliedFilterRecipes)
    return
}

//check if the health label of the recipe has the applied filiter
function checkRecipeLabels(eachRecipe, appliedFilter) {
    //get the array of the health labels
    const recpieHealthLabels = eachRecipe.recipe.healthLabels
    if (recpieHealthLabels.includes(appliedFilter)) {
        console.log(eachRecipe.recipe.label)
        return eachRecipe
    }
}

async function fetchDataAsync(url, options) {
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data.hits)//returns an array of 60 recipes
    const recipeArray = data.hits
    //filter more base on calories count
    const filteredCaloriesRecipes = recipeArray.filter(checkCals)
    //filter more base on nutrients
    const filteredNutrientsRecipes = filteredCaloriesRecipes.filter(checkNutrients)
    //store in local after it fetch, internal filter base on users calories
    newUserProfile.storeValue("recipes", filteredNutrientsRecipes, true)
    createReceipeGrid(filteredNutrientsRecipes)
}

function checkCals(eachRecipe) {
    const recipeCalories = eachRecipe.recipe.calories
    //get the selected Calories Info, the calories counts
    const usersCalories = newUserProfile[newUserProfile.selectedCaloriesInfo].calories
    const estOneMealCalories = usersCalories / 3
    if (islessThan(recipeCalories, estOneMealCalories)) {
        console.log("suitable calories")
        return eachRecipe
    }
}

function checkNutrients(eachRecipe) {
    //get protein, carbs, fats from recipe
    const recipeNutrients = eachRecipe.recipe.totalNutrients
    const recipeProtein = recipeNutrients.PROCNT.quantity
    const recipeCarbs = recipeNutrients.CHOCDF.quantity
    const recipeFats = recipeNutrients.FAT.quantity
    //get protein, carbs, fats from users selceted calories info
    const usersNutrients = newUserProfile[newUserProfile.selectedCaloriesInfo].grams
    const usersProtein = usersNutrients.protein
    const usersCarbs = usersNutrients.carbs
    const usersFats = usersNutrients.fats
    //get estimated nutrient for one meal
    const estOneMealProtein = usersProtein / 3
    const estOneMealCarbs = usersCarbs / 3
    const estOneMealFats = usersFats / 3

    //check that the recipe suits the user's nutritional needs
    if (islessThan(recipeProtein, estOneMealProtein) && islessThan(recipeCarbs, estOneMealCarbs) && islessThan(recipeFats, estOneMealFats)) {
        console.log("suitable nutrients")
        return eachRecipe
    } else {
        //console.log("not suitable")
    }
}

function islessThan(count, controlCount) {
    return count <= controlCount ? true : false
}

function createReceipeGrid(recipesArray) {
    const recipeRow1 = document.getElementById("recipe-row-1")
    recipesArray.forEach(eachRecipe => {
        recipeRow1.append(creatRecipeItem(eachRecipe))
    });
    document.getElementById("loader-spinner-sect").style.display = "none"
    document.getElementById("recipes-sect").style.display = "block"
}

function creatRecipeItem(eachRecipe) {
    const recipeItem = document.createElement("div")
    recipeItem.classList.add("recipe-item", "btn", "me-2", "p-0", "mb-2")
    const recipeItemContents = document.createElement("div")
    recipeItemContents.classList.add("recipe-item-contents", "p-2")
    const recipeLink = document.createElement("a")
    const recipeName = document.createElement("h3")
    const recipeImg = document.createElement("img")
    const recipeNutrition = document.createElement("p")
    const breakEl = document.createElement("br")
    const carbSpan = document.createElement("span")
    const protSpan = document.createElement("span")
    const fatsSpan = document.createElement("span")

    recipeName.innerText = eachRecipe.recipe.label
    recipeLink.href = eachRecipe.recipe.url
    recipeImg.setAttribute('target', '_blank');
    recipeImg.src = eachRecipe.recipe.image
    recipeNutrition.innerText = "Nutritional content:"
    carbSpan.innerText = `Carbs:${Math.round(eachRecipe.recipe.totalNutrients.CHOCDF.quantity)}g`
    protSpan.innerText = ` Protein:${Math.round(eachRecipe.recipe.totalNutrients.PROCNT.quantity)}g`
    fatsSpan.innerText = ` Fats:${Math.round(eachRecipe.recipe.totalNutrients.FAT.quantity)}g`
    carbSpan.classList.add("carbs-span")
    protSpan.classList.add("prot-span")
    fatsSpan.classList.add("fats-span")

    recipeNutrition.append(breakEl, carbSpan, protSpan, fatsSpan)
    recipeLink.append(recipeImg)
    recipeItemContents.append(recipeName, recipeNutrition)
    recipeItem.append(recipeLink, recipeItemContents)

    return recipeItem
}

function init() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '73737b6a41mshf395571d0182015p1516ebjsn0514a22c2864',
            'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
        }
    };

    addEventListeners()

    if (newUserProfile.hasStorage("recipes")) {
        newUserProfile.inputStorage("recipes")
        newUserProfile.inputStorage("goal-nutrients-info")
        newUserProfile.inputStorage("maintainence-nutrients-info")
        newUserProfile.inputStorage("selected-calories-info")
        newUserProfile.inputStorage("goal")
        newUserProfile.inputStorage("user-info")
        //hide the loader-spinner, this only works for on awake
        document.getElementById("loader-spinner-sect").style.display = "none"
        document.getElementById("recipes-sect").style.display = "block"
        //get recipes from userprofile
        const recipeArray = newUserProfile.recipes
        createReceipeGrid(recipeArray)
        //fetchDataAsync("https://edamam-recipe-search.p.rapidapi.com/search?q=lunch&from=0&to=100", options)
        return
    }

    //check if goal-nutrients-page local storage is present
    //means calories and nutrients has been calculated already, just need to input to table
    if (newUserProfile.hasStorage("goal-nutrients-info")) {
        newUserProfile.inputStorage("goal-nutrients-info")
        newUserProfile.inputStorage("maintainence-nutrients-info")
        newUserProfile.inputStorage("goal")
        newUserProfile.inputStorage("user-info")

        fetchDataAsync("https://edamam-recipe-search.p.rapidapi.com/search?q=lunch&from=0&to=100", options)
        return
    }

    //check if user-info page local storage is present
    if (newUserProfile.hasStorage("user-info")) {
        newUserProfile.goToPage("./calories-info.html")
        return
    }

    //check if goal-page local storage is present
    if (newUserProfile.hasStorage("goal")) {
        newUserProfile.goToPage("./user-info.html")
        return
    }

    //direct to goal-page
    newUserProfile.goToPage("./index.html")
}

init()