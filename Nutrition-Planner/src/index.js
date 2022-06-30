//able to do it becausecos type is module in the linked html file. no module, it will have error
import newUserProfile from "./JavaScript Files/main.js"

function addEventListeners() {
    document.getElementById("goal-weight-loss").addEventListener('click', () => {
        newUserProfile.storeValue("goal", "weight-loss", true)
        newUserProfile.goToPage("./user-info.html")
    })
    document.getElementById("goal-muscle-gain").addEventListener('click', () => {
        newUserProfile.storeValue("goal", "muscle-gain", true)
        newUserProfile.goToPage("./user-info.html")
    })
    document.getElementById("goal-tone-up").addEventListener('click', () => {
        newUserProfile.storeValue("goal", "tone-up", true)
        newUserProfile.goToPage("./user-info.html")
    })
}
function updateDom(goal) {
    //make goal option active,
    //const goalOptions = document.getElementById("indicated-goal")
    //returns an array of buttons in the indicated-goal
    const option = document.getElementsByClassName("btn")
    for (const child of option) {
        if (child.id === `goal-${goal}`) {
            //child.className += " active"
            child.focus();
            break
        }
    }
}

function init() {
    console.log('init');
    addEventListeners()
    console.log(localStorage)
    //everything it goes index page again, it restarts
    
    console.log(localStorage)
    //check if goal local storage is present
    //if have, get the data
    if (newUserProfile.hasStorage("goal")) {
        newUserProfile.inputstorage("goal")
        // const storedGoal = newUserProfile.getData("goal")
        // //store in the newUserProfile, no need to store in local storage agian, so false
        // newUserProfile.storeValue("goal", storedGoal, false)
        updateDom(newUserProfile.goal)
        return
    }
    localStorage.clear()
  
}
init()