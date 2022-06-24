// export default class Test {
//     constructor() {
//         // 
//     }
//     render() {
//         return 'abc'
//     }
// }

const userInfoTemplate = {
    "gender": "",
    "age": "",
    "weight": "",
    "dailyactivity": "",
    "exercisefreq": ""
}
const measureType = {
    "percentage" : "",
    "cal" : "",
    "grams" : ""
}
const caloriesInfoTemplate = {
    "hasCalculated": false,
    "calories": "",
    "carbs": {...measureType},
    "protein": {...measureType},
    "fats": {...measureType},
}


class UserLocalStorage {
    constructor() {
        this.goal = ""
        this.userInfo = { ...userInfoTemplate }
        this.caloriesInfo = { ...caloriesInfoTemplate }
    }
    //store in the this class
    storeValue(pageData, value) {
        console.log(value)
        this.storeInLocal(pageData, value)
        if (pageData === "goal") {
            this.goal = value
            return
        }
        if (pageData === "user-info") {
            this.userInfo = value
            return
        }
        if (pageData === "calories-info") {
            this.caloriesInfo = value
            return
        }
    }
    //store in local storage
    storeInLocal(pageData, value) {
        console.log("stroe info in local storage")
        window.localStorage.setItem(pageData, JSON.stringify(value))
        console.log(localStorage);
        // //check if there storage
        // if (this.hasStorage(pageData)) {
        //     //load the data   
        //     this.loadData(pageData)
        // }
        // this.goToPage("./user-info.html")
    }
    //page data(goal, user-info, calorie-info, suggestions) is the key in the object
    hasStorage(pageData) {
        return window.localStorage.getItem(pageData) !== null ? true : false
    }
    goToPage(link) {
        console.log("go to page")
        window.location.href = link;
        // setTimeout(function() {
        //     window.location.href = link;
        // }, 10);
    }
    getData(pageData) {
        //return the value of the key
        return JSON.parse(localStorage.getItem(pageData));
    }
    loadData(pageData) {
        console.log("load data")
        window.localStorage.getItem(pageData)

    }
}

const newUserLocalStorage = new UserLocalStorage()
// function storeValue(value) {
//     console.log(value)
//     newUserInfo.goal = value
//     newUserInfo.storeInLocal(newUserInfo.goal)
// }

//exports pages objects as the default meaning, while importing this main.js we can use any name 
export { newUserLocalStorage as default }
