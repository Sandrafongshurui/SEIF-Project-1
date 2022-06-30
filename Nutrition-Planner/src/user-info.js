
import newUserProfile from "./JavaScript Files/main.js"
//console.log("this is the user-info.js")

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

    const exerciseFreqOptions = document.getElementById("exercise-freq")
    //returns an array of buttons in the dail-activity div
    const btns = exerciseFreqOptions.getElementsByClassName("btn")
    for (const child of btns) {
        if (child.id === userInfo.exercisefreq) {
            child.focus()
            // invoke teh click so that it mimic user clikcing it, so that it gets stored 
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
    //console.log('init');
    addEventListeners();
    //newUserProfile.goal
    //check if user-info local storage is present
    //if have, get the data
    if (newUserProfile.hasStorage("user-info")) {
        newUserProfile.inputstorage("user-info")
        newUserProfile.inputstorage("goal")
        // const storedUserInfo = newUserProfile.getData("user-info")
        // //store in the newUserProfile, no need to store in local storage agian, so false
        // newUserProfile.storeValue("user-info", storedUserInfo, false)

        //update the header to the goal
        updateHeaderDom(newUserProfile.goal)
        //update the inputs to the stored userinfo
        updateDom(newUserProfile.userInfo)
        return
    }

    //check if goal local storage is present
    //if have, get the data
    if (newUserProfile.hasStorage("goal")) {
        newUserProfile.inputstorage("goal")
        // const storedGoal= newUserProfile.getData("goal")
        // console.log(localStorage)
        // //store in the newUserProfile, no need to store in local storage agian, so false
        // newUserProfile.storeValue("goal", storedGoal, false)
        // console.log(newUserProfile.goal)
        //update the header with local storage
        updateHeaderDom(newUserProfile.goal)
        return
    }

    //if no goal page data
    //direct to user -info page
    newUserProfile.goToPage("./index.html")

}
init()