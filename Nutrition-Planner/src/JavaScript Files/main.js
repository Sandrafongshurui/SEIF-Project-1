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
    "height": "",
    "weight": "",
    "dailyactivity": "",
    "exercisefreq": ""
}
const measureType = {
    "percentage": "",
    "cal": "",
    "grams": ""
}
const totalCaloriesInfoTemplate = {
    "hasCalculated": false,
    "calories": "",
    "carbs": { ...measureType },
    "protein": { ...measureType },
    "fats": { ...measureType },
}

class UserProfile {
    constructor() {
        this.goal = "weight-loss"
        this.userInfo = { ...userInfoTemplate }
        this.totalCaloriesInfo = {
            "goalCaloriesInfo": { ...totalCaloriesInfoTemplate },
            "maintainenceCaloriesInfo": { ...totalCaloriesInfoTemplate }
        }
        this.selectedCaloriesInfo =  "goalCaloriesInfo"
    }
    //store in the this class
    storeValue(pageData, value, storeInLocalStorage) {
        if(storeInLocalStorage){
            this.storeInLocal(pageData, value)
        }
        if (pageData === "goal") {
            this.goal = value
            return
        }
        if (pageData === "user-info") {
            this.userInfo = value
            return
        }
        if (pageData === "calories-info") {
            this.totalCaloriesInfo = value
            return
        }
        
    }

    calculateMaintainenceCalories() {
        // Formula used to calculate men’s calorie needs is:
        // 66.5 + 13.8 x(body weight in kilograms) + 5 x(body height in cm) divided by 6.8 x age.
        //women = 655.1 + 9.6 x(body weight in kilograms) + 1.9 x(body height in cm) divided by 4.7 x age.
        //Result of the equation must be multiplied with your physical activity factor.
        //low physical activity, then multiply by 1.2,average physical activity then multiply by 1.3,  heavy physical activities, multiply by 1.4.
        console.log(this.totalCaloriesInfo)
        this.totalCaloriesInfo.maintainenceCaloriesInfo.calories = 2000
        return 2000
        
        //this.totalCaloriesInfo.calories = 2500
    }
    calculateGoalCalories() {
        //weight loss, use the maintainence calories -500cal (ideal number base on online research)
        //future can be a parameter to change according to  "ideal weight' feature
        if (this.goal === "weight-loss") {
            this.totalCaloriesInfo.goalCaloriesInfo.calories = this.totalCaloriesInfo.maintainenceCaloriesInfo.calories - 500
            return this.totalCaloriesInfo.goalCaloriesInfo.calories
        }
        //muscle-gain, use the maintainence calories +500cal 
        if (this.goal === "muscle-gain") {
            this.totalCaloriesInfo.goalCaloriesInfo.calories = this.totalCaloriesInfo.maintainenceCaloriesInfo.calories + 500
            return this.totalCaloriesInfo.goalCaloriesInfo.calories 
        }
        //tone-up, 

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
const nutrientsEquationNums = {

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
    "maintainence": {
        "carbs": 40,
        "protein": 30,
        "fats": 30
    }
}

class CalculatedNutrients {
    constructor(goal) {
        this.goal = goal
        // this.totalCaloriesInfo.calories = ""
        // this.carbsInCal = ""
        // this.protInCal = ""
        // this.fatsInCal = ""
        // this.carbInGrams = ""
        // this.protInGrams = ""
        // this.fatsInGrams = ""
        this.totalCaloriesInfo = { ...totalCaloriesInfoTemplate },
        this.nutrientsEquationNums = { ...nutrientsEquationNums }
        // this.nutrientsEquationNums = {}
    }

    calculateNutrients() {
        //get the nutrients of the specific goal from nutrients info
        console.log(this.goal,   this.totalCaloriesInfo.calories)
        //calculate the given percentage of the total calories for each nutrient in calories
        // this.carbsInCal = this.percentage(this.totalCaloriesInfo.calories, this.nutrientsEquationNums[this.goal].carbs)
        // this.protInCal = this.percentage(this.totalCaloriesInfo.calories, this.nutrientsEquationNums[this.goal].protein)
        // this.fatsInCal = this.percentage(this.totalCaloriesInfo.calories, this.nutrientsEquationNums[this.goal].fats)
        //store here also, so that easier to store in local storage later
        this.totalCaloriesInfo.carbs.cal = this.percentage(this.totalCaloriesInfo.calories, this.nutrientsEquationNums[this.goal].carbs)
        this.totalCaloriesInfo.protein.cal = this.percentage(this.totalCaloriesInfo.calories, this.nutrientsEquationNums[this.goal].protein)
        this.totalCaloriesInfo.fats.cal = this.percentage(this.totalCaloriesInfo.calories, this.nutrientsEquationNums[this.goal].fats)
        //calculate the given percentage of the total calories for each nutrient in grams, 
        //one calorie is equal to 0.129598 grams
        

        this.inputValuesInTable()
    }
    percentage(num, per) {
        return (num / 100) * per;
    }
    inputValuesInTable() {
        console.log("input value into table")
        console.log(this.totalCaloriesInfo.carbs.cal)
        //input the values into the table
        //can i put in this a for loop?
        const nutrientsEquationNums = this.nutrientsEquationNums[this.goal]
        document.getElementById("calories-num").innerText = this.totalCaloriesInfo.calories
        document.getElementById("carbs-in-per").innerText = nutrientsEquationNums.carbs
        document.getElementById("prot-in-per").innerText = nutrientsEquationNums.protein
        document.getElementById("fats-in-per").innerText = nutrientsEquationNums.fats
        document.getElementById("carbs-in-cal").innerText =  this.totalCaloriesInfo.carbs.cal
        document.getElementById("prot-in-cal").innerText = this.totalCaloriesInfo.protein.cal
        document.getElementById("fats-in-cal").innerText = this.totalCaloriesInfo.fats.cal 
        // document.getElementById("carbs-in-gram").innerText =  carbInGram
        // document.getElementById("prot-in-gram").innerText =  protInGram
        // document.getElementById("fats-in-gram").innerText =  fatsInGram
    }

}

//create newUserProfile which will contain information that is needed fo the other JS files
const newUserProfile = new UserProfile()

//exports pages objects as the default meaning, while importing this main.js we can use any name 
export { newUserProfile as default }
export { CalculatedNutrients }