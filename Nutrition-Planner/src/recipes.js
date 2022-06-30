
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
    //displayInGrid(recipeArray)
    createReceipeGrid(recipeArray)
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
    const recipeName = document.getElementsByTagName("h3")
    const links = document.getElementsByTagName("a")
    const imgs = document.getElementsByTagName("img")
    const carbSpan = document.getElementsByClassName("carbs-span")
    const protSpan = document.getElementsByClassName("prot-span")
    const fatsSpan = document.getElementsByClassName("fats-span")
    const filteredRecipesLen = filteredRecipes.length
    for (let i = 0; i < filteredRecipesLen; i++) {
        imgs[i].src = filteredRecipes[i].recipe.image
        links[i].href = filteredRecipes[i].recipe.url
        recipeName[i].innerText = filteredRecipes[i].recipe.label
        carbSpan[i].innerText = `Carbs:${Math.round(filteredRecipes[i].recipe.totalNutrients.CHOCDF.quantity)}g`
        protSpan[i].innerText = ` Protein:${Math.round(filteredRecipes[i].recipe.totalNutrients.PROCNT.quantity)}g`
        fatsSpan[i].innerText = ` Fats:${Math.round(filteredRecipes[i].recipe.totalNutrients.FAT.quantity)}g`

    }
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

function createReceipeGrid(recipesArray) {
    const recipeRow1 = document.getElementById("recipe-row-1")
    recipesArray.forEach(eachRecipe => {
        recipeRow1.append(creatRecipeItem(eachRecipe))

    });

    // document.getElementById("loader-spinner-sect").style.display = "none"
    // document.getElementById("recipes-sect").style.display = "block"

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

    recipeLink.href = eachRecipe.recipe.url
    recipeImg.setAttribute('target', '_blank');
    recipeImg.src = eachRecipe.recipe.image
    recipeLink.append(recipeImg)

    recipeNutrition.innerText = "Nutritional content:"
    carbSpan.innerText = `Carbs:${Math.round(eachRecipe.recipe.totalNutrients.CHOCDF.quantity)}g`
    protSpan.innerText = ` Protein:${Math.round(eachRecipe.recipe.totalNutrients.PROCNT.quantity)}g`
    fatsSpan.innerText = ` Fats:${Math.round(eachRecipe.recipe.totalNutrients.FAT.quantity)}g`
    carbSpan.classList.add("carbs-span")
    protSpan.classList.add("prot-span")
    fatsSpan.classList.add("fats-span")
    recipeNutrition.append(breakEl, carbSpan, protSpan, fatsSpan)

    recipeName.innerText = eachRecipe.recipe.label
    recipeItemContents.append(recipeName, recipeNutrition)

    recipeItem.append(recipeLink, recipeItemContents)

    return recipeItem

}
function addEventListeners() {

    document.getElementById("filter-list").addEventListener('click', (event) => {
        if (event.target.classList.contains("dropdown-item")) {
            if (event.target.id !== "no-filter") {
                console.log(event.target.id)
                applyDietFilter(event.target.innerText)
            } else {
                console.log(event.target.id)
                const recipeArray = newUserProfile.getData("recipes")
                displayInGrid(recipeArray)
            }

        } else {
            console.log("not the dropdown list")
        }

        // const dropdownOptions = document.getElementById("filter-list")

        // const btns = dropdownOptions.getElementsByClassName("dropdown-item active")
        // if (btns.length > 0) {
        //     btns[0].className = btns[0].className.replace(" active", "")
        // }

        // //add the active class to it so it will highlight
        // event.target.className += " active"
    })


}

function init() {
    //get a a bucnh a receipes firts
    //check if theres recipes storage 
    addEventListeners()
    if (newUserProfile.hasStorage("recipes")) {
        console.log(localStorage)
        //hide the loader-spinner, this only workd for on awake
        document.getElementById("loader-spinner-sect").style.display = "none"
        document.getElementById("recipes-sect").style.display = "block"
        console.log("recipes page has data")
        //get data
        newUserProfile.inputstorage("recipes")
        newUserProfile.inputstorage("goal-nutrients-info")
        newUserProfile.inputstorage("maintainence-nutrients-info")
        // const storedGoalInfo = newUserProfile.getData("goal-nutrients-info")
        // const storedMaintainenceInfo = newUserProfile.getData("maintainence-nutrients-info")
        // //store in the newUserProfile, no need to store in local storage agian, so false
        // newUserProfile.storeValue("goal-nutrients-info", storedGoalInfo, false)
        // newUserProfile.storeValue("maintainence-nutrients-info", storedMaintainenceInfo, false)

        newUserProfile.inputstorage("goal")
        newUserProfile.inputstorage("user-info")
        const recipeArray = newUserProfile.getData("recipes")
        console.log(recipeArray)
        createReceipeGrid(recipeArray)
        //fetchDataAsync("https://edamam-recipe-search.p.rapidapi.com/search?q=lunch&from=0&to=60", options)


        //goalCalculatedNutrients.goal = newUserProfile.goal
        //     const storedUserInfo = newUserProfile.getData("user-info")
        //     //store in the newUserProfile, no need to store in local storage agian, so false
        //    newUserProfile.storeValue("user-info", storedUserInfo, false)

        //    const storedGoal = newUserProfile.getData("goal")
        //    //store in the newUserProfile, no need to store in local storage agian, so false
        //    newUserProfile.storeValue("goal", storedGoal, false)

        //display the goal nutrients in the table
        console.log(newUserProfile)
        //calculateCaloriesAndNutrients()
        //goalCalculatedNutrients.inputValuesInTable(newUserProfile.goalNutrientsInfo)

        //inputStorage()
        return
    }
    //check if theres goal-nutrients-info storage 
    //means calories and nutrients has been calculated already, just need to input to table
    if (newUserProfile.hasStorage("goal-nutrients-info")) {
        console.log("goal-nutrients-info page has data")
        //get data
        newUserProfile.inputstorage("goal-nutrients-info")
        newUserProfile.inputstorage("maintainence-nutrients-info")
        // const storedGoalInfo = newUserProfile.getData("goal-nutrients-info")
        // const storedMaintainenceInfo = newUserProfile.getData("maintainence-nutrients-info")
        // //store in the newUserProfile, no need to store in local storage agian, so false
        // newUserProfile.storeValue("goal-nutrients-info", storedGoalInfo, false)
        // newUserProfile.storeValue("maintainence-nutrients-info", storedMaintainenceInfo, false)

        newUserProfile.inputstorage("goal")
        newUserProfile.inputstorage("user-info")
        //goalCalculatedNutrients.goal = newUserProfile.goal
        //     const storedUserInfo = newUserProfile.getData("user-info")
        //     //store in the newUserProfile, no need to store in local storage agian, so false
        //    newUserProfile.storeValue("user-info", storedUserInfo, false)

        //    const storedGoal = newUserProfile.getData("goal")
        //    //store in the newUserProfile, no need to store in local storage agian, so false
        //    newUserProfile.storeValue("goal", storedGoal, false)

        //display the goal nutrients in the table
        console.log(newUserProfile)
        //calculateCaloriesAndNutrients()

        fetchDataAsync("https://edamam-recipe-search.p.rapidapi.com/search?q=lunch&from=0&to=60", options)


        //goalCalculatedNutrients.inputValuesInTable(newUserProfile.goalNutrientsInfo)

        //inputStorage()
        return
    }

    //if no goal-nutrients-info page data, check if got user-info page data
    //if have , get the data
    //use it to calculate for this page, and also store it in the newUserProfile
    if (newUserProfile.hasStorage("user-info")) {
        console.log("user-info page has data")
        // newUserProfile.inputstorage("goal")
        // newUserProfile.inputstorage("user-info")
        // //goalCalculatedNutrients.goal = newUserProfile.goal
        // // //get data
        // // const storedUserInfo = newUserProfile.getData("user-info")
        // //  //store in the newUserProfile, no need to store in local storage agian, so false
        // // newUserProfile.storeValue("user-info", storedUserInfo, false)
        // //calculate base on storedUserInfo
        // calculateCaloriesAndNutrients()
        newUserProfile.goToPage("./calories-info.html")
        return
    }

    //if no user-info page data, check if goal localstorage is present
    //if have, get the data
    if (newUserProfile.hasStorage("goal")) {
        console.log("goal page has data")
        //  newUserProfile.inputstorage("goal")
        //  goalCalculatedNutrients.goal = newUserProfile.goal
        // // //get data
        // // const storedGoal = newUserProfile.getData("goal")
        // // //store in the newUserProfile, no need to store in local storage agian, so false
        // // newUserProfile.storeValue("goal", storedGoal, false)
        // //direct to user -info page
        newUserProfile.goToPage("./user-info.html")
        return
    }

    // //if no goal page data
    // //direct to index page
    newUserProfile.goToPage("./index.html")

    // filter recipes that match with user nutritents
    // populate the recipes
}
init()