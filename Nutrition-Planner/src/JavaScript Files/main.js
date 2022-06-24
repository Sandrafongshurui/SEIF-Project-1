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
const nutrientsInfo = {

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
    },
    "maintenece": {
        "carbs": 40,
        "protein": 30,
        "fats": 30
    }
}

class CalculatedNutrients {
    constructor() {
        this.goal = ""
        this.caloriesNum = ""
        this.carbsInCal = ""
        this.protInCal = ""
        this.fatsInCal = ""
        this.carbInGrams = ""
        this.protInGrams = ""
        this.fatsInGrams = ""
        this.nutrientsInfo = {...nutrientsInfo}
        this.goalNutrientsInfo = {}
    }
    calculateCalories(){
        this.caloriesNum = 2500
    }
    calculateNutrients() {
        //get the nutrients of the specific goal from nutrients info
        console.log(this.nutrientsInfo[this.goal])
        this.goalNutrientsInfo= this.nutrientsInfo[this.goal]
        //calculate the given percentage of the total calories for each nutrient in calories
        this.carbsInCal = this.percentage(this.caloriesNum, this.goalNutrientsInfo.carbs)
        this.protInCal = this.percentage(this.caloriesNum, this.goalNutrientsInfo.protein)
        this.fatsInCal = this.percentage(this.caloriesNum, this.goalNutrientsInfo.fats)
        //calculate the given percentage of the total calories for each nutrient in grams, 
        //one calorie is equal to 0.129598 grams
        this.inputValuesInTable()
    }
    percentage(num, per) {
        return (num / 100) * per;
    }
    inputValuesInTable() {
        console.log("input value into table")
        //input the values into the table
        //can i put in this a for loop?
        document.getElementById("calories-num").innerText = this.caloriesNum
        document.getElementById("carbs-in-per").innerText = this.goalNutrientsInfo.carbs
        document.getElementById("prot-in-per").innerText = this.goalNutrientsInfo.protein
        document.getElementById("fats-in-per").innerText = this.goalNutrientsInfo.fats
        document.getElementById("carbs-in-cal").innerText = this.carbsInCal
        document.getElementById("prot-in-cal").innerText = this.protInCal
        document.getElementById("fats-in-cal").innerText = this.fatsInCal
        // document.getElementById("carbs-in-gram").innerText =  carbInGram
        // document.getElementById("prot-in-gram").innerText =  protInGram
        // document.getElementById("fats-in-gram").innerText =  fatsInGram
    }

}

const newUserLocalStorage = new UserLocalStorage()
//const newCalculatedNutrients = new CalculatedNutrients()
// function storeValue(value) {
//     console.log(value)
//     newUserInfo.goal = value
//     newUserInfo.storeInLocal(newUserInfo.goal)
// }

//exports pages objects as the default meaning, while importing this main.js we can use any name 
export { newUserLocalStorage as default }
export {CalculatedNutrients}