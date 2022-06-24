
import newUserLocalStorage from "./JavaScript Files/main.js"
//console.log("this is the user-info.js")

function addEventListeners() {
    // const selectedDailyActivity = {
    //     "option" : "",
    //     "isChosen" : false
    // }
    let dailyActivity = ""
    let exerciseFreq = ""
    const dailyActivityOptions = document.getElementById("daily-activity")
    const exerciseFreqOptions = document.getElementById("exercise-freq")
    document.getElementById("daily-activity").addEventListener('click', (event) => {
        if (event.target.type === "button") {
            dailyActivity = event.target.id
            console.log(dailyActivity)
            //set the chosen daily activity
            // selectedDailyActivity.option = event.target.id
            // selectedDailyActivity.isChosen = true

            //make buttons "selected looking"
            //remove active from the previous clicked button
            const btns = dailyActivityOptions.getElementsByClassName("btn active")
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
    document.getElementById("exercise-freq").addEventListener('click', (event) => {
        if (event.target.type === "button") {
            exerciseFreq = event.target.id
            console.log(exerciseFreq)
            //make buttons "selected looking"
            //remove active form the previous clicked button

            const btns = exerciseFreqOptions.getElementsByClassName("btn active")
            if (btns.length > 0) {
                btns[0].className = btns[0].className.replace(" active", "")
            }

            //add the active class to it so it will highlight
            event.target.className += " active"
        }
    })

    document.getElementById("btn-calculate").addEventListener('click', () => {
        //validate()       
        newUserLocalStorage.storeValue("user-info", getUserInputs(dailyActivity, exerciseFreq))
    })


}
function getUserInputs(selectedDailyActivity, selectedExerciseFreq) {
    //see which gender is checked
    if (document.getElementById("male-value").checked) {
        newUserLocalStorage.userInfo.gender = "male"
    } else {
        newUserLocalStorage.userInfo.gender = "female"
    }
    newUserLocalStorage.userInfo.age = document.getElementById("age-value").value
    newUserLocalStorage.userInfo.weight = document.getElementById("weight-value").value
    newUserLocalStorage.userInfo.dailyactivity = selectedDailyActivity
    newUserLocalStorage.userInfo.exercisefreq = selectedExerciseFreq
    return newUserLocalStorage.userInfo
}
function fillWithLocal() {
    //get and load the data   
    console.log("this page has data")
    const userInfoData = newUserLocalStorage.getData("user-info")
    console.log(userInfoData)
    //checked the gender
    if (newUserLocalStorage.userInfo.gender = "male") {
        document.getElementById("male-value").checked = true
    } else {
        document.getElementById("female-value").checked = true
    }
    document.getElementById("age-value").value = userInfoData.age
    document.getElementById("weight-value").value = userInfoData.weight

    //make the daily-activity option active,
    const dailyActivityOptions = document.getElementById("daily-activity")
    //returns an array of buttons in the dail-activity div
    const option = dailyActivityOptions.getElementsByClassName("btn")
    for (const child of option) {
        if (child.id === userInfoData.dailyactivity) {
            child.className += " active"
            break
        }
    }
    //make the exercise-freq option active,
    const exerciseFreqOptions = document.getElementById("exercise-freq")
    //returns an array of buttons in the dail-activity div
    const btns = exerciseFreqOptions.getElementsByClassName("btn")
    for (const child of btns) {
        if (child.id === userInfoData.exercisefreq) {
            child.className += " active"
            bresk
        }
    }
}

function init() {
    //console.log(localStorage)
    //console.log('init');

    addEventListeners();
    //check if there storage
    if (newUserLocalStorage.hasStorage("user-info")) {
        fillWithLocal()
    }
    else {
        console.log("this page has no data")
    }
}
init()