import newUserProfile from "./JavaScript Files/main.js"
import { CalculatedNutrients } from "./JavaScript Files/main.js"
const goalCalculatedNutrients = new CalculatedNutrients(newUserProfile.goal)
//by default maintenece
const maintainenceCalculatedNutrients = new CalculatedNutrients("maintainence")
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
                //input the info in the table,  since its been calculate at init(), no need caculateNutrients
                goalCalculatedNutrients.inputValuesInTable()
                //store the selecetd btn
                newUserProfile.selectedCaloriesInfo = "goalCaloriesInfo"

            } else {
                console.log("show maintenece calories info")
                //input the info in the table
                maintainenceCalculatedNutrients.inputValuesInTable()
                console.log(maintainenceCalculatedNutrients.totalCaloriesInfo)
                //store the selecetd btn
                newUserProfile.selectedCaloriesInfo = "maintainenceCaloriesInfo"


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
        newUserProfile.storeValue("calories-info", getCaloriesInfo(), true)
        //get the selected buttton, recepies recommedation base on that
        newUserProfile.goToPage("./recipes.html")

    })

}

function getCaloriesInfo() {
    const combineCaloriesInfo = {}
    //add a goald and maintenence as key/value pair, same format as userprofile totalCaloriesInfo
    combineCaloriesInfo.goalCaloriesInfo = goalCalculatedNutrients.totalCaloriesInfo
    combineCaloriesInfo.maintainenceCaloriesInfo = maintainenceCalculatedNutrients.totalCaloriesInfo
    return combineCaloriesInfo
}

function inputStorage() {

    console.log("this page has data")

    const calorieInfoData = newUserProfile.getData("calories-info")
    //input the storage's data into the  calculated nutrients
    maintainenceCalculatedNutrients.totalCaloriesInfo = calorieInfoData.maintainenceCaloriesInfo
    goalCalculatedNutrients.totalCaloriesInfo = calorieInfoData.goalCaloriesInfo
    //display goal value only, because by default only shows goal on awake
    goalCalculatedNutrients.inputValuesInTable()
    // need to set the innnertext again, because the inputValuesInTable() is invoked if theres no storage, so calculations is done on awake
    // with storage, no need for calculation, certain values in inputValuesInTable() has not been calculated
    //so need to input the storage's data instead
    // document.getElementById("calories-num").innerText = calorieInfoData.goalCaloriesInfo.calories
    // document.getElementById("carbs-in-cal").innerText = calorieInfoData.goalCaloriesInfo.carbs.cal
    // document.getElementById("prot-in-cal").innerText = calorieInfoData.goalCaloriesInfo.protein.cal
    // document.getElementById("fats-in-cal").innerText = calorieInfoData.goalCaloriesInfo.fats.cal
    //same for the mainteneceCaloriesINfo, it has not been calculated


    // // document.getElementById("carbs-in-gram").innerText =  carbInGram
    // // document.getElementById("prot-in-gram").innerText =  protInGram
    // // document.getElementById("fats-in-gram").innerText =  fatsInGram
}

function calculateCaloriesAndNutrients() {

    //get the calories number base for goal and maintenence 
    //medthod to stalled is in userprofile beacuse the user-info from there is needed to calculate it
    maintainenceCalculatedNutrients.totalCaloriesInfo.calories = newUserProfile.calculateMaintainenceCalories()
    goalCalculatedNutrients.totalCaloriesInfo.calories = newUserProfile.calculateGoalCalories()
    //calculate the breakdown of the claories and input into nutrients table,  inputValuesInTable()
    maintainenceCalculatedNutrients.calculateNutrients()
    goalCalculatedNutrients.calculateNutrients()

}
function init() {

    console.log("init")
    console.log(localStorage)
    addEventListeners()
    
    //by default selected goal is the the cative button
    const defaultSelected = document.getElementById("btn-goal-calories")
    defaultSelected.className += " active"

    //check if theres calories-info storage 
    //if have ,means calories and nutrients has been calculated already, just need to input to table
    if (newUserProfile.hasStorage("calories-info")) {
        console.log("calories-info page has data")
        //display the goal nutrients in the table
        inputStorage()
        return
    }

    //if no calories-info page data, check if got user-info page data
    //if have , get the data
    //use it to calculate for this page, and also store it in the newUserProfile
    if (newUserProfile.hasStorage("user-info")) {
        console.log("user-info page has data")
        const storedUserInfo = newUserProfile.getData("user-info")
        //no need to store in local storage agian, so false
        newUserProfile.storeValue("user-info", storedUserInfo, false)
        //calculate base on storedUserInfo
        calculateCaloriesAndNutrients()
        return
    }

    //check if goal local storage is present
    //if have, get the data
    if (newUserProfile.hasStorage("goal")) {
        const storedGoal = newUserProfile.getData("goal")
        console.log(localStorage)
        //store in the newUserProfile, no need to store in local storage agian, so false
        newUserProfile.storeValue("goal", storedGoal, false)
        console.log(newUserProfile.goal)
        //direct to user -info page
        newUserProfile.goToPage("./user-info.html")
        return
    }

    //if no goal page data
    //direct to index page
    newUserProfile.goToPage("./index.html")
}
init()