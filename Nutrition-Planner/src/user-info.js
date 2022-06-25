
import newUserProfile from "./JavaScript Files/main.js"
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
        newUserProfile.storeValue("user-info", getUserInputs(dailyActivity, exerciseFreq), true)
        newUserProfile.goToPage("./calories-info.html")
    })


}
function getUserInputs(selectedDailyActivity, selectedExerciseFreq) {
    //see which gender is checked
    if (document.getElementById("male-value").checked) {
        newUserProfile.userInfo.gender = "male"
    } else {
        newUserProfile.userInfo.gender = "female"
    }
    newUserProfile.userInfo.age = document.getElementById("age-value").value
    newUserProfile.userInfo.height = document.getElementById("height-value").value
    newUserProfile.userInfo.weight = document.getElementById("weight-value").value
    newUserProfile.userInfo.dailyactivity = selectedDailyActivity
    newUserProfile.userInfo.exercisefreq = selectedExerciseFreq
    return newUserProfile.userInfo
}
function updateDom(userInfo) {
    //get and load the data   
    console.log("this page has data")
    //const userInfo = newUserProfile.getData("user-info")
    console.log(userInfo)
    //checked the gender
    if (newUserProfile.userInfo.gender = "male") {
        document.getElementById("male-value").checked = true
    } else {
        document.getElementById("female-value").checked = true
    }
    document.getElementById("age-value").value = userInfo.age
    document.getElementById("weight-value").value = userInfo.weight
    document.getElementById("height-value").value = userInfo.height
    //make the daily-activity option active,
    const dailyActivityOptions = document.getElementById("daily-activity")
    //returns an array of buttons in the dail-activity div
    const option = dailyActivityOptions.getElementsByClassName("btn")
    for (const child of option) {
        if (child.id === userInfo.dailyactivity) {
            child.className += " active"
            break
        }
    }
    //make the exercise-freq option active,
    const exerciseFreqOptions = document.getElementById("exercise-freq")
    //returns an array of buttons in the dail-activity div
    const btns = exerciseFreqOptions.getElementsByClassName("btn")
    for (const child of btns) {
        if (child.id === userInfo.exercisefreq) {
            child.className += " active"
            break
        }
    }


}

function updateHeaderDom(storedGoal){
    document.getElementById("indicated-goal-header").innerText = storedGoal
}

function init() {
    //console.log(localStorage)
    //console.log('init');
    addEventListeners();

    //check if user-info local storage is present
    //if have, get the data
    if (newUserProfile.hasStorage("user-info")) {
        const storedUserInfo = newUserProfile.getData("user-info")
        //store in the newUserProfile, no need to store in local storage agian, so false
        newUserProfile.storeValue("user-info", storedUserInfo, false)
        //update the header to the goal
        updateHeaderDom(newUserProfile.goal)
        //update the inputs to the stored userinfo
        updateDom(storedUserInfo)
        return
    }

    //check if goal local storage is present
    //if have, get the data
    if (newUserProfile.hasStorage("goal")) {
        const storedGoal= newUserProfile.getData("goal")
        console.log(localStorage)
        //store in the newUserProfile, no need to store in local storage agian, so false
        newUserProfile.storeValue("goal", storedGoal, false)
        console.log(newUserProfile.goal)
        //update the header with local storage
        updateHeaderDom(storedGoal)       
        return
    }

    //if no goal page data
    //direct to user -info page
    newUserProfile.goToPage("./user-info.html")

}
init()