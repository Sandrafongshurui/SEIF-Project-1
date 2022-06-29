import newUserProfile from "./JavaScript Files/main.js"
import { goalCalculatedNutrients } from "./JavaScript Files/main.js"


//const goalCalculatedNutrients = new CalculatedNutrients(newUserProfile.goal)
//by default maintenece
//const maintainenceCalculatedNutrients = new CalculatedNutrients("maintainence")
console.log("this is the calories-info.js")



function addEventListeners() {
    const caloriesRequiredOptions = document.getElementById("calories-required")
    let selectedCaloriesId = ""
    document.getElementById("calories-required").addEventListener('click', (event) => {
        if (event.target.type === "button") {
            selectedCaloriesId = event.target.id
            console.log(selectedCaloriesId)
            if (selectedCaloriesId === "btn-goal-calories") {
                console.log("show goal calories info")
                //input the info in the table, 
                goalCalculatedNutrients.inputValuesInTable(newUserProfile.goalNutrientsInfo)
                //store the selecetd btn
                newUserProfile.selectedCaloriesInfo = "goalNutrientsInfo"

            } else {
                console.log("show maintenece calories info")
                //input the info in the table
                goalCalculatedNutrients.inputValuesInTable(newUserProfile.maintainenceNutrientsInfo)
                //store the selecetd btn
                newUserProfile.selectedCaloriesInfo = "maintainenceNutrientsInfo"


            }

            //make buttons "selected looking"
            //remove active from the previous clicked button
            const btns = caloriesRequiredOptions.getElementsByClassName("btn active")
            //check if theres is a current active button
            if (btns.length > 0) {
                btns[0].className = btns[0].className.replace(" active", "");
            }
            //add the active class to current btn so it will highlight
            event.target.className += " active"
        } else {
            console.log("not a button ")
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

}

function init() {

    console.log("init")
    console.log(localStorage)
    //localStorage.clear()
    addEventListeners()
    document.getElementById("calories-required").click()
    //calculateCaloriesAndNutrients()

    //by default selected goal is the the cative button
    const defaultSelected = document.getElementById("btn-goal-calories")
    defaultSelected.className += " active"

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
        goalCalculatedNutrients.goal = newUserProfile.goal
        //     const storedUserInfo = newUserProfile.getData("user-info")
        //     //store in the newUserProfile, no need to store in local storage agian, so false
        //    newUserProfile.storeValue("user-info", storedUserInfo, false)

        //    const storedGoal = newUserProfile.getData("goal")
        //    //store in the newUserProfile, no need to store in local storage agian, so false
        //    newUserProfile.storeValue("goal", storedGoal, false)

        //display the goal nutrients in the table
        console.log(newUserProfile)
        calculateCaloriesAndNutrients()
        //goalCalculatedNutrients.inputValuesInTable(newUserProfile.goalNutrientsInfo)

        //inputStorage()
        return
    }

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
        return
    }

    //if no user-info page data, check if goal localstorage is present
    //if have, get the data
    if (newUserProfile.hasStorage("goal")) {
        console.log("goal page has data")
         newUserProfile.inputstorage("goal")
         goalCalculatedNutrients.goal = newUserProfile.goal
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