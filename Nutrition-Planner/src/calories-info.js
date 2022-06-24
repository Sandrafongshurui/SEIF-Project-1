import newUserLocalStorage from "./JavaScript Files/main.js"
console.log("this is the calories-info.js")
const calorieStandardPercentage = {

    "weight-loss": {
        "carbs": 40,
        "protein": 30,
        "fats": 30
    },
    

    "muscle-gain": {
        "carbs": 40,
        "protein": 40,
        "fats": 20
    },
    

    "tone-up": {
        "carbs": 25,
        "protein": 50,
        "fats": 25
    }

}

function addEventListeners() {
    const caloriesRequiredOptions = document.getElementById("calories-required")
    let selectedCalories = ""
    document.getElementById("calories-required").addEventListener('click', (event) => {
        if (event.target.type === "button") {
            selectedCaloriesId = event.target.id
            console.log(selectedCalories)
            if (selectedCaloriesId === "goal-calories") {
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
function calculateNutrients(goal, caloriesNum) {
    //get the value of the "key" , whihc is the strng of goal
    console.log(calorieStandardPercentage[goal])

}


function inputValuesInTable() {
    console.log("input value into table")
}

function init() {
    //check if there storage
    console.log("init")
    addEventListeners()
    calculateNutrients("weight-loss", 2500)
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