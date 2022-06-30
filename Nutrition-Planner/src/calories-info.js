import newUserProfile from "./JavaScript Files/main.js"
import { goalCalculatedNutrients } from "./JavaScript Files/main.js"

function addEventListeners() {
    const caloriesRequiredOptions = document.getElementById("calories-required")
    let selectedCaloriesId = ""
    document.getElementById("btn-goal-calories").addEventListener('click', (event) => {
        if (event.target.type === "button" || event.target.parentElement.type === "button") {
            selectedCaloriesId = event.currentTarget.id
            goalCalculatedNutrients.inputValuesInTable(newUserProfile.goalNutrientsInfo)

            //store the selecetd in userprofile
            selectedCaloriesId === "btn-goal-calories"
            newUserProfile.selectedCaloriesInfo = "goalNutrientsInfo"

            const btns = caloriesRequiredOptions.getElementsByClassName("btn active")
            if (btns.length > 0) {
                btns[0].className = btns[0].className.replace(" active", "")
            }

            //add the active class to it so it will highlight
            event.currentTarget.className += " active"
            return
        }
    })

    document.getElementById("btn-maintainence-calories").addEventListener('click', (event) => {
        if (event.target.type === "button" || event.target.parentElement.type === "button") {
            selectedCaloriesId = event.currentTarget.id
            goalCalculatedNutrients.inputValuesInTable(newUserProfile.maintainenceNutrientsInfo)

            //store the selecetd in userprofile
            selectedCaloriesId === "btn-maintainence-calories"
            newUserProfile.selectedCaloriesInfo = "maintainenceNutrientsInfo"

            const btns = caloriesRequiredOptions.getElementsByClassName("btn active")
            if (btns.length > 0) {
                btns[0].className = btns[0].className.replace(" active", "")
            }

            //add the active class to it so it will highlight
            event.currentTarget.className += " active"
            return
        }
    })

    //click get recipes button, then store in local storage
    document.getElementById("btn-get-recipes").addEventListener('click', () => {
        newUserProfile.storeValue("goal-nutrients-info", goalCalculatedNutrients.goalNutrientsInfo, true)
        newUserProfile.storeValue("maintainence-nutrients-info", goalCalculatedNutrients.maintainenceNutrientsInfo, true)
        newUserProfile.storeValue("selected-calories-info", newUserProfile.selectedCaloriesInfo, true)
        newUserProfile.goToPage("./recipes.html")
    })
}

function calculateCaloriesAndNutrients() {
    //get the calories number base for goal and maintenence 
    //medthod is stalled in userprofile class beacuse the user-info from there is needed to calculate it
    goalCalculatedNutrients.maintainenceNutrientsInfo.calories = newUserProfile.calculateMaintainenceCalories()
    goalCalculatedNutrients.goalNutrientsInfo.calories = newUserProfile.calculateGoalCalories()

    //calculate the breakdown of the nutrients
    goalCalculatedNutrients.calculateMaintainenceNutrients()
    goalCalculatedNutrients.calculateGoalNutrients()

    //store in local storage and newuserprofile
    newUserProfile.storeValue("goal-nutrients-info", goalCalculatedNutrients.goalNutrientsInfo, true)
    newUserProfile.storeValue("maintainence-nutrients-info", goalCalculatedNutrients.maintainenceNutrientsInfo, true)
    newUserProfile.storeValue("selected-calories-info", newUserProfile.selectedCaloriesInfo, true)
}

function selectDefaultOption() {
    //by default selected goal is the the active button
    const defaultSelected = document.getElementById("btn-goal-calories")
    defaultSelected.focus()
    defaultSelected.click()
}

function updateDomBtns() {
    document.getElementById("btn-goal-num").innerText = goalCalculatedNutrients.goalNutrientsInfo.calories
    document.getElementById("btn-goal-name").innerText = goalCalculatedNutrients.goal
    document.getElementById("btn-maintainence-num").innerText = goalCalculatedNutrients.maintainenceNutrientsInfo.calories
    selectDefaultOption()
}

//hide and unhide the 3 different description
function updateDomDescription() {
    const paraEl = document.getElementsByClassName("article")
    console.log(paraEl)
    for (let i = 0; i <= paraEl.length - 1; i++) {
        console.log(paraEl[i].className)
        if (paraEl[i].className.includes(" d-block")) {
            paraEl[i].className = paraEl[i].className.replace(" d-block", " d-none")
        }
        if (paraEl[i].id === `${newUserProfile.goal}-article`) {
            paraEl[i].className = paraEl[i].className.replace(" d-none", " d-block")
        }
    }
}

function init() {
    console.log(localStorage)
    addEventListeners()

    //check if got user-info page data
    //use it to calculate for this page, and also store it in the newUserProfile
    if (newUserProfile.hasStorage("user-info")) {
        newUserProfile.inputStorage("goal")
        newUserProfile.inputStorage("user-info")
        goalCalculatedNutrients.goal = newUserProfile.goal
        calculateCaloriesAndNutrients()
        updateDomBtns()
        updateDomDescription()
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