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
    //returns an array of buttons in the indicated-goal
    const option = document.getElementsByClassName("btn")
    for (const child of option) {
        if (child.id === `goal-${goal}`) {
            child.focus();
            break
        }
    }
}

function init() {
    console.log(localStorage)
    addEventListeners()

    //check if goal local storage is present
    if (newUserProfile.hasStorage("goal")) {
        newUserProfile.inputStorage("goal")
        updateDom(newUserProfile.goal)
    }
}

init()