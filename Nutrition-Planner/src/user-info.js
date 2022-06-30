
import newUserProfile from "./JavaScript Files/main.js"

function addEventListeners() {
    let exerciseFreq = ""
    const exerciseFreqOptions = document.getElementById("exercise-freq")
    document.getElementById("exercise-freq").addEventListener('click', (event) => {
        //make buttons "selected looking"
        //remove active form the previous clicked button
        const btns = exerciseFreqOptions.getElementsByClassName("btn active")
        if (btns.length > 0) {
            btns[0].className = btns[0].className.replace(" active", "")
        }
        if (event.target.type === "button") {
            exerciseFreq = event.target.id
            event.target.className += " active"
        }
        else if (event.target.parentElement.type === "button") {
            exerciseFreq = event.target.parentElement.id
            event.target.parentElement.className += " active"
        }
    })

    document.getElementById("myform").addEventListener('submit', (event) => {
        //prevent the default on submit function
        event.preventDefault()
        newUserProfile.storeValue("user-info", getUserInputs(exerciseFreq), true)
        newUserProfile.goToPage("./calories-info.html")
    })
}

function getUserInputs(exerciseFreqOption) {
    //see which gender is checked
    if (document.getElementById("male-value").checked) {
        newUserProfile.userInfo.gender = "male"
    } else {
        newUserProfile.userInfo.gender = "female"
    }
    newUserProfile.userInfo.age = document.getElementById("age-value").value
    newUserProfile.userInfo.height = document.getElementById("height-value").value
    newUserProfile.userInfo.weight = document.getElementById("weight-value").value
    newUserProfile.userInfo.exercisefreq = exerciseFreqOption
    return newUserProfile.userInfo
}

function updateUserInfoDom(userInfo) {
    //checked the gender
    if (newUserProfile.userInfo.gender = "male") {
        document.getElementById("male-value").checked = true
    } else {
        document.getElementById("female-value").checked = true
    }
    //input the stored values
    document.getElementById("age-value").value = userInfo.age
    document.getElementById("weight-value").value = userInfo.weight
    document.getElementById("height-value").value = userInfo.height

    //Focus and activate the option that was previously picked by user
    const exerciseFreqOptions = document.getElementById("exercise-freq")
    const btns = exerciseFreqOptions.getElementsByClassName("btn")
    for (const child of btns) {
        if (child.id === userInfo.exercisefreq) {
            child.focus()
            // invoke the click so that it mimic user clicking it, so that it gets stored 
            child.click()
            break
        }
    }
}

function updateHeaderDom(storedGoal) {
    document.getElementById("indicated-goal-header").innerText = storedGoal.toUpperCase()
}

function init() {
    console.log(localStorage)
    addEventListeners();

    //check if user-info-page local storage is present
    if (newUserProfile.hasStorage("user-info")) {
        newUserProfile.inputStorage("user-info")
        newUserProfile.inputStorage("goal")
        //update the header to the goal
        updateHeaderDom(newUserProfile.goal)
        //update the inputs to the stored userinfo
        updateUserInfoDom(newUserProfile.userInfo)
        return
    }

    //check if goal-page local storage is present
    if (newUserProfile.hasStorage("goal")) {
        newUserProfile.inputStorage("goal")
        updateHeaderDom(newUserProfile.goal)
        return
    }

    //direct to goal-page page
    newUserProfile.goToPage("./index.html")
}

init()