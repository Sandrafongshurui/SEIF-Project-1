
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
                const recipeArray = newUserProfile.shownRecipes
                createReceipeGrid(recipeArray)
            }
        }
    })
}

//Paremeter is the innertext of the dropdown list
function applyDietFilter(appliedFilter) {
    //get shown recipes from the stored list
    const recipeArray = newUserProfile.shownRecipes
    //filter out the appliedFilter List
    const appliedFilterRecipes = recipeArray.filter(eachRecipe => checkRecipeLabels(eachRecipe, appliedFilter))
    if(appliedFilterRecipes.length === 0){
        //append a message
        noResultsMsg()
    }
    createReceipeGrid(appliedFilterRecipes)
    return
}

//check if the health label of the recipe has the applied filiter
function checkRecipeLabels(eachRecipe, appliedFilter) {
    //get the array of the health labels
    const recpieHealthLabels = eachRecipe.recipe.healthLabels
    if (recpieHealthLabels.includes(appliedFilter)) {
        return eachRecipe
    }
}

async function fetchDataAsync(url, options) {
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data.hits)//returns an array of 100
    const recipeArray = data.hits
    //some recipes has more than 1 yields, so need to divide to get more accurate results
    checkYield(recipeArray)
    //store in local after it fetch
    newUserProfile.storeValue("recipes", recipeArray, true)
    filterByCalories(recipeArray)
   
}

function filterByCalories(recipeArray){
 //filter more base on calories count
 const filteredCaloriesRecipes = recipeArray.filter(checkCals)
 filterByNutrients(filteredCaloriesRecipes)
 
}

function filterByNutrients(recipeArray){
//filter more base on nutrients
 const filteredNutrientsRecipes = recipeArray.filter(checkNutrients)
 //store as shown recepies
 newUserProfile.storeValue("shownRecipes", filteredNutrientsRecipes, true)
 createReceipeGrid(filteredNutrientsRecipes)
}

function checkYield(recipeArray){
    recipeArray.forEach(eachRecipe => {
       if( eachRecipe.recipe.yield > 1){
             const calPerPax = eachRecipe.recipe.calories / eachRecipe.recipe.yield
             eachRecipe.recipe.calories = calPerPax
             const protPerPax = eachRecipe.recipe.totalNutrients.PROCNT.quantity / eachRecipe.recipe.yield
             eachRecipe.recipe.totalNutrients.PROCNT.quantity = protPerPax
             const carbsPerPax = eachRecipe.recipe.totalNutrients.CHOCDF.quantity / eachRecipe.recipe.yield
             eachRecipe.recipe.totalNutrients.CHOCDF.quantity = carbsPerPax
             const fatsPerPax = eachRecipe.recipe.totalNutrients.FAT.quantity / eachRecipe.recipe.yield
             eachRecipe.recipe.totalNutrients.FAT.quantity = fatsPerPax
       }
    })
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
    const usersCalories = newUserProfile[newUserProfile.selectedCaloriesInfo].calories
    const estOneMealCalories = usersCalories / 3
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

    calulateOneMealNutrients(estOneMealCalories, estOneMealCarbs, estOneMealProtein, estOneMealFats)

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

function noResultsMsg(){
    const recipeRow1 = document.getElementById("recipe-row-1")
    const errorMessage = document.createElement("p")
    errorMessage.classList.add("h3", "mt-5")
    errorMessage.innerHTML += "Sorry we are unable to get any results base on your currrent filter"
    errorMessage.innerHTML += "<br>"
    errorMessage.innerHTML += "Please try another filter or change your previous information!"

    recipeRow1.append(errorMessage)
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
    carbSpan.classList.add("me-1")
    const protSpan = document.createElement("span")
    protSpan.classList.add("me-1")
    const fatsSpan = document.createElement("span")
    fatsSpan.classList.add("me-1")

    recipeName.innerText = eachRecipe.recipe.label
    recipeLink.href = eachRecipe.recipe.url
    recipeLink.setAttribute("target", "blank")
    //recipeImg.setAttribute("target", "blank")
    recipeLink.setAttribute("rel", "noopener noreferrer")
    recipeImg.src = eachRecipe.recipe.image
    // recipeNutrition.innerText = "Nutritional content:"
    carbSpan.innerText = `Carbs:${Math.round(eachRecipe.recipe.totalNutrients.CHOCDF.quantity)}g`
    protSpan.innerText = ` Protein:${Math.round(eachRecipe.recipe.totalNutrients.PROCNT.quantity)}g`
    fatsSpan.innerText = ` Fats:${Math.round(eachRecipe.recipe.totalNutrients.FAT.quantity)}g`
    carbSpan.classList.add("carbs-span")
    protSpan.classList.add("prot-span")
    fatsSpan.classList.add("fats-span")

    recipeNutrition.append(breakEl, carbSpan, protSpan, fatsSpan)
    recipeLink.append(recipeImg, recipeItemContents)
    recipeItemContents.append(recipeName, recipeNutrition)
    recipeItem.append(recipeLink)
    

    return recipeItem
}

function calulateOneMealNutrients(cals, carbs, protein, fats){
    const estOneMeal = {}
    estOneMeal.calories = cals
    estOneMeal.carbs = carbs
    estOneMeal.protein = protein
    estOneMeal.fats = fats
    newUserProfile.storeValue("estOneMeal", estOneMeal, true)

    inputPersonalisedTable()
}

function inputPersonalisedTable(){
  const estOneMealItem = newUserProfile.estOneMeal
  document.getElementById("calories").innerText = `${Math.round(estOneMealItem.calories)} cal`
  document.getElementById("carbs-in-grams").innerText = `${Math.round(estOneMealItem.carbs)} g`
  document.getElementById("prot-in-grams").innerText = `${Math.round(estOneMealItem.protein)} g`
  document.getElementById("fats-in-grams").innerText = `${Math.round(estOneMealItem.fats)} g`
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
       

        // //sometimes i get the 403 forbidden error when i get the recipes from my local storage
        // console.log("get from st")
        // //hide the loader-spinner, this only works for on awake
        // document.getElementById("loader-spinner-sect").style.display = "none"
        // document.getElementById("recipes-sect").style.display = "block"
        // //get recipes from userprofile
        // const recipeArray = newUserProfile.recipes
        // filterByCalories(recipeArray)
       
        fetchDataAsync("https://edamam-recipe-search.p.rapidapi.com/search?q=supper&from=0&to=100", options)
        
        return
    }

    //check if goal-nutrients-page local storage is present
    //means calories and nutrients has been calculated already, just need to input to table
    if (newUserProfile.hasStorage("goal-nutrients-info")) {
        newUserProfile.inputStorage("goal-nutrients-info")
        newUserProfile.inputStorage("maintainence-nutrients-info")
        newUserProfile.inputStorage("goal")
        newUserProfile.inputStorage("user-info")
        newUserProfile.inputStorage("user-info")

        fetchDataAsync("https://edamam-recipe-search.p.rapidapi.com/search?q=supper&from=0&to=100", options)
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