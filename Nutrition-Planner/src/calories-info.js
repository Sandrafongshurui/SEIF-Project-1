import newUserProfile from "./JavaScript Files/main.js"
import { goalCalculatedNutrients } from "./JavaScript Files/main.js"


//const goalCalculatedNutrients = new CalculatedNutrients(newUserProfile.goal)
//by default maintenece
//const maintainenceCalculatedNutrients = new CalculatedNutrients("maintainence")
console.log("this is the calories-info.js")



function addEventListeners() {
    const caloriesRequiredOptions = document.getElementById("calories-required")
    let selectedCaloriesId = ""
    document.getElementById("btn-goal-calories").addEventListener('click', (event) => {
        if (event.target.type === "button" || event.target.parentElement.type === "button") {
            selectedCaloriesId = event.currentTarget.id
            console.log(selectedCaloriesId)


            goalCalculatedNutrients.inputValuesInTable(newUserProfile.goalNutrientsInfo)
            //store the selecetd btn
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
            console.log(selectedCaloriesId)


            goalCalculatedNutrients.inputValuesInTable(newUserProfile.maintainenceNutrientsInfo)
            //store the selecetd btn
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
        //get the selected buttton, recepies recommedation base on that
        console.log(newUserProfile)
        newUserProfile.goToPage("./recipes.html")

    })

}

function calculateCaloriesAndNutrients() {

    //get the calories number base for goal and maintenence 
    //medthod to stalled is in userprofile beacuse the user-info from there is needed to calculate it
    goalCalculatedNutrients.maintainenceNutrientsInfo.calories = newUserProfile.calculateMaintainenceCalories()
    goalCalculatedNutrients.goalNutrientsInfo.calories = newUserProfile.calculateGoalCalories()
    console.log(goalCalculatedNutrients.maintainenceNutrientsInfo.calories)
    console.log(goalCalculatedNutrients.goalNutrientsInfo.calories)

    //calculate the breakdown of the maintainenec nutrients
    goalCalculatedNutrients.calculateMaintainenceNutrients()
    //store in newuserprofile
    newUserProfile.maintainenceNutrientsInfo = goalCalculatedNutrients.maintainenceNutrientsInfo
    console.log(goalCalculatedNutrients.maintainenceNutrientsInfo)

    //calculate the breakdown of the goal nutrients
    goalCalculatedNutrients.calculateGoalNutrients()
    //store in newuserprofile
    newUserProfile.goalNutrientsInfo = goalCalculatedNutrients.goalNutrientsInfo
    console.log(goalCalculatedNutrients.goalNutrientsInfo)

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
    //const btnNum = document.getElementById("btn-goal-num")
    document.getElementById("btn-goal-num").innerText = goalCalculatedNutrients.goalNutrientsInfo.calories
    document.getElementById("btn-goal-name").innerText = goalCalculatedNutrients.goal

    document.getElementById("btn-maintainence-num").innerText = goalCalculatedNutrients.maintainenceNutrientsInfo.calories
    selectDefaultOption()

}

function updateDomDescription(){
    const paraEl = document.getElementsByClassName("article")
    console.log(paraEl)
    for (let i = 0; i <= paraEl.length-1; i++) {
        console.log(paraEl[i].className)
        if (paraEl[i].className.includes(" d-block")) {
            paraEl[i].className = paraEl[i].className.replace(" d-block", " d-none")
        }

        if (paraEl[i].id === `${newUserProfile.goal}-article`) {
            paraEl[i].className = paraEl[i].className.replace(" d-none", " d-block")
        }
    }
}

// function createDescription(selectedNutritionInfo){
//     const goalArticle = document.getElementById("goal-article")
//     const goalArticlePara = document.createElement("p").classList.add("m-0")
//    const span1 = document.createElement("span")
//    const span2 = document.createElement("span")
//    const span3 = document.createElement("span")
//    span1.innerText = goalCalculatedNutrients.nutrientsEquationNums[selectedNutritionInfo.goal]
//    //span2.innerText = selectedNutritionInfo.
//    goalArticlePara .append("span1")
//    goalArticle.append(goalArticlePara)
//    goalArticle.innerText += "follows a"

// }


function init() {
    addEventListeners()

    //if no goal-nutrients-info page data, check if got user-info page data
    //if have , get the data
    //use it to calculate for this page, and also store it in the newUserProfile
    if (newUserProfile.hasStorage("user-info")) {
        console.log("user-info page has data")
        newUserProfile.inputstorage("goal")
        newUserProfile.inputstorage("user-info")
        goalCalculatedNutrients.goal = newUserProfile.goal
        // //get data
        // const storedUserInfo = newUserProfile.getData("user-info")
        //  //store in the newUserProfile, no need to store in local storage agian, so false
        // newUserProfile.storeValue("user-info", storedUserInfo, false)
        //calculate base on storedUserInfo
        calculateCaloriesAndNutrients()
        updateDomBtns()
        updateDomDescription()
        return
    }

    if (newUserProfile.hasStorage("goal")) {
        // console.log("goal page has data")
        //  newUserProfile.inputstorage("goal")
        //  goalCalculatedNutrients.goal = newUserProfile.goal
        // //get data
        // const storedGoal = newUserProfile.getData("goal")
        // //store in the newUserProfile, no need to store in local storage agian, so false
        // newUserProfile.storeValue("goal", storedGoal, false)
        //direct to user -info page
        newUserProfile.goToPage("./user-info.html")
        return
    }

    // //if no goal page data
    // //direct to index page
    newUserProfile.goToPage("./index.html")
}
init()