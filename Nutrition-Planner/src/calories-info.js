import newUserLocalStorage from "./JavaScript Files/main.js"
import { CalculatedNutrients } from "./JavaScript Files/main.js"
const newCalculatedNutrients = new CalculatedNutrients()
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
                //input the info in the table
                //display table
            } else {
                console.log("show maintenece calories info")
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
    //click get recipes button
    document.getElementById("btn-get-recipes").addEventListener('click', () => {
        newUserLocalStorage.storeValue("calories-info", getUserInputs(dailyActivity, exerciseFreq))
    })

}

function init() {
    //check if there storage
    console.log("init")
    addEventListeners()
    newCalculatedNutrients.goal = "weight-loss"
    console.log(newCalculatedNutrients.goal)
    newCalculatedNutrients.calculateNutrients()
    const defaultSelected = document.getElementById("btn-goal-calories")
    defaultSelected.className += " active"
    // if (newUserLocalStorage.hasStorage("calories-info")) {
    //     inputValuesInTable()
    //     //fillWithLocal()
    //     return
    // }
    // if (newUserLocalStorage.hasStorage("user-info")) {
    //     console.log("user-info page has data")
    //     //calculate base on user-info data
    //     calculateCalories(newUserLocalStorage.goal)
    //     inputValuesInTable()
    //     return
    // }
    // if (newUserLocalStorage.hasStorage("goal")) {
    //     //direct to user -info page
    //     newUserLocalStorage.goToPage("./user-info.html")
    //     return
    // }
    ////direct to index page
    //newUserLocalStorage.goToPage("./index.html")

}
init()