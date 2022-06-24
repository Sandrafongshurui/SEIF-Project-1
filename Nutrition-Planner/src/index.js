//this is importing the things inside  main.js
//able to do it cos type is module in the linked html file. no module will hv error
//import "something" can be any name, basically is like a paremeter that will import the default class

//import Test from "./JavaScript Files/main.js";
import newUserLocalStorage from "./JavaScript Files/main.js"
//import userInfo from "./JavaScript Files/main.js"
// class UserInfo {
//     constructor() {
//         this.goal = ""
//     }
//     //store local data function()
//     // storeInLocal(value) {
//     //     console.log("stroe info in local storage")
//     //     window.localStorage.setItem("goal", JSON.stringify(value))
//     //     console.log(localStorage);
//     //     //check if there storage
//     //     if (pages.hasStorage("userInfo")) {
//     //         //load the data   
//     //         pages.loadData("userInfo")        
//     //     }        
//     //     pages.goToPage("./user-info.html")
//     // }
// }


// const pages = {
//     //pageData wiil be the name of the page's storage, goal, userinfo, calories values, suggestions
//     //it will be a key
//     hasStorage: function (pageData) {
//         return window.localStorage.getItem(pageData)
//     },
//     goToPage: function (link) {
//         console.log("go to page")
//         window.location.href = link;
//         // setTimeout(function() {
//         //     window.location.href = link;
//         // }, 10);
//     },
//     loadData: function(pageData){
//         console.log("load data")
//         //window.localStorage.setItem("pageData", JSON.stringify(value))
//     }
// }


console.log("this is the index.js")

function addEventListeners() {
    document.getElementById("goal-weight-loss").addEventListener('click', () => {
        newUserLocalStorage.storeValue( "goal","weight-loss")
        newUserLocalStorage.goToPage("./user-info.html")
    })
    document.getElementById("goal-muscle-gain").addEventListener('click', () => {
        newUserLocalStorage.storeValue( "goal","muscle-gain")
        newUserLocalStorage.goToPage("./user-info.html")
    })
    document.getElementById("goal-tone-up").addEventListener('click', () => {
        newUserLocalStorage.storeValue("goal","tone-up")
        newUserLocalStorage.goToPage("./user-info.html")
    })
}

function init() {
    console.log('init');
    //delete it later
    console.log(localStorage)
    localStorage.clear()
    console.log(localStorage)
    addEventListeners();
}
init()