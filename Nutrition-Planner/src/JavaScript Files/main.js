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
    "exercisefreq": ""
}

// const measureType = {
//     "percentage": "",
//     "cal": "",
//     "grams": ""
// }

const measureType = {
    "carbs": "",
    "protein": "",
    "fats": ""
}
const totalCaloriesInfoTemplate = {
    "calories": "",
    "carbs": {
        "percentage": "",
        "cal": "",
        "grams": ""
    },
    "protein": {
        "percentage": "",
        "cal": "",
        "grams": ""
    },
    "fats": {
        "percentage": "",
        "cal": "",
        "grams": ""
    },
}

class TotalCaloriesInfoTemplate {
    constructor() {
        this.calories = ""
        this.carbs = { ...measureType }
        this.protein = { ...measureType }
        this.fats = { ...measureType }
    }
}

class UserProfile {
    constructor() {
        this.goal = ""
        this.userInfo = { ...userInfoTemplate }
        // this.totalCaloriesInfo = {
        //     "goalNutrientsInfo": {...totalCaloriesInfoTemplate },
        //     "maintainenceNutrientsInfo":{}
        // }
        this.goalNutrientsInfo = { ...totalCaloriesInfoTemplate },
        this.maintainenceNutrientsInfo = { ...totalCaloriesInfoTemplate },
        //by default it will show the goalCalories
        this.selectedCaloriesInfo = "goalNutrientsInfo"
        this.recipes = []
    }
    //store in the this class
    storeValue(pageData, value, storeInLocalStorage) {
        if (storeInLocalStorage) {
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
        if (pageData === "goal-nutrients-info") {
            this.goalNutrientsInfo = value
            return
        }
        if (pageData === "maintainence-nutrients-info") {
            this.maintainenceNutrientsInfo = value
            return
        }
        if (pageData === "selected-calories-info") {
            this.selectedCaloriesInfo = value
            return
        }
        if (pageData === "recipes") {
            this.recipes = value
            return
        }

    }

    calculateMaintainenceCalories() {
        // Formula used to calculate men’s calorie needs is:
        //bmr is basal metabolic rate, how much you burn at rest
       //Result of the equation must be multiplied with your physical activity factor.
        let bmr = 0
        if(this.userInfo.gender === "male"){
            //using Mifflin-St Jeor men formula
            bmr = 10 * this.userInfo.weight + 6.25 * this.userInfo.height - 5 * this.userInfo.age + 5 
    
        }else{
             //using Mifflin-St Jeor women formula
            bmr =10 * this.userInfo.weight + 6.25 * this.userInfo.height - 5 * this.userInfo.age + 161 
        }    

        const tdee =  this.calculateTdee(this.userInfo.exercisefreq)
        const calories = bmr * tdee
        console.log(this.maintainenceNutrientsInfo)
        // this.totalCaloriesInfo.maintainenceCaloriesInfo.calories = 2000
        this.maintainenceNutrientsInfo.calories = calories
        return calories
    }

    //tdee is Total Daily Energy Expenditure , physical activity factor.
    //optionNum would be what activity option the user chose
    calculateTdee(activityOption){
        //these are standards number for the formula, that is base on [low acitivy - high acitivy]
        const activityFactorArray = [1.2, 1.375, 1.75, 1.9]
        //activityOption will be a string "option-1"
        //get the num only for the index
        const optionNum = activityOption.charAt(activityOption.length - 1)
        return activityFactorArray[optionNum-1]
    }

    calculateGoalCalories() {
        //weight loss, use the maintainence calories -500cal (ideal number base on online research)
        //future can be a parameter to change according to  "ideal weight' feature
        if (this.goal === "weight-loss") {
            this.goalNutrientsInfo.calories = this.maintainenceNutrientsInfo.calories - 500
            return this.goalNutrientsInfo.calories
        }
        //muscle-gain, use the maintainence calories +500cal 
        if (this.goal === "muscle-gain") {
            this.goalNutrientsInfo.calories = this.maintainenceNutrientsInfo.calories + 500
            return this.goalNutrientsInfo.calories
        }
        //tone-up, 

    }
    inputstorage(keyName) {
        //get data
        const storeInfo = this.getData(keyName)
        //store in the newUserProfile, no need to store in local storage agian, so false
       this.storeValue(keyName, storeInfo, false)
    
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
        this.goal = goal,
            // this.totalCaloriesInfo.calories = ""
            // this.carbsInCal = ""
            // this.protInCal = ""
            // this.fatsInCal = ""
            // this.carbInGrams = ""
            // this.protInGrams = ""
            // this.fatsInGrams = ""
            this.goalNutrientsInfo = {
                calories: "",
                cal: {
                    ...measureType
                },
                grams: {
                    ...measureType
                }
            }
        this.maintainenceNutrientsInfo = {
            calories: "",
            cal: {
                ...measureType
            },
            grams: {
                ...measureType
            }
        }
        //can this be static or private?
        this.nutrientsEquationNums = { ...nutrientsEquationNums }
        // this.nutrientsEquationNums = {}
    }

    calculateGoalNutrients() {
        //get the nutrients of the specific goal from nutrients info
        //calculate the given percentage of the total calories for each nutrient in calories
        const goalNutrientsInfoCal = this.goalNutrientsInfo.cal
        goalNutrientsInfoCal.carbs = this.percentage(this.goalNutrientsInfo.calories, this.nutrientsEquationNums[this.goal].carbs)
        goalNutrientsInfoCal.protein = this.percentage(this.goalNutrientsInfo.calories, this.nutrientsEquationNums[this.goal].protein)
        goalNutrientsInfoCal.fats = this.percentage(this.goalNutrientsInfo.calories, this.nutrientsEquationNums[this.goal].fats)

        //calculate the given percentage of the total calories for each nutrient in grams, 
        //one calorie is equal to 0.129598 grams
        const goalNutrientsInfoGrams = this.goalNutrientsInfo.grams
        goalNutrientsInfoGrams.carbs = this.convertCalToGram(goalNutrientsInfoCal.carbs)
        goalNutrientsInfoGrams.protein = this.convertCalToGram(goalNutrientsInfoCal.protein)
        goalNutrientsInfoGrams.fats = this.convertCalToGram(goalNutrientsInfoCal.fats)

        //display in table
        this.inputValuesInTable(this.goalNutrientsInfo)
    }
    calculateMaintainenceNutrients() {
        //get the nutrients of the specific goal from nutrients info
        //calculate the given percentage of the total calories for each nutrient in calories
        const maintainenceNutrientsInfoCal = this.maintainenceNutrientsInfo.cal
        maintainenceNutrientsInfoCal.carbs = this.percentage(this.maintainenceNutrientsInfo.calories, this.nutrientsEquationNums[this.goal].carbs)
        maintainenceNutrientsInfoCal.protein = this.percentage(this.maintainenceNutrientsInfo.calories, this.nutrientsEquationNums[this.goal].protein)
        maintainenceNutrientsInfoCal.fats = this.percentage(this.maintainenceNutrientsInfo.calories, this.nutrientsEquationNums[this.goal].fats)

        //calculate the given percentage of the total calories for each nutrient in grams, 
        //one calorie is equal to 0.129598 grams
        const maintainenceNutrientsInfoGrams = this.maintainenceNutrientsInfo.grams
        maintainenceNutrientsInfoGrams.carbs = this.convertCalToGram(maintainenceNutrientsInfoCal.carbs)
        maintainenceNutrientsInfoGrams.protein = this.convertCalToGram(maintainenceNutrientsInfoCal.protein)
        maintainenceNutrientsInfoGrams.fats = this.convertCalToGram(maintainenceNutrientsInfoCal.fats)
    }
    percentage(num, per) {
        return (num / 100) * per;
    }
    convertCalToGram(cal) {
        return Math.round((cal * 0.129598) * 10) / 10
    }
    inputValuesInTable(nutritionInfo) {
        console.log("input value into table")
        //input the values into the table
        //can i put in this a for loop?
        const nutrientsEquationNums = this.nutrientsEquationNums[this.goal]
        document.getElementById("calories-num").innerText = nutritionInfo.calories
        document.getElementById("carbs-in-per").innerText = `${nutrientsEquationNums.carbs} %`
        document.getElementById("prot-in-per").innerText = `${nutrientsEquationNums.protein} %`
        document.getElementById("fats-in-per").innerText = `${nutrientsEquationNums.fats} %`
        document.getElementById("carbs-in-cal").innerText = `${nutritionInfo.cal.carbs} cal`
        document.getElementById("prot-in-cal").innerText = `${nutritionInfo.cal.protein} cal`
        document.getElementById("fats-in-cal").innerText = `${nutritionInfo.cal.fats} cal`
        document.getElementById("carbs-in-gram").innerText = `${nutritionInfo.grams.carbs} g`
        document.getElementById("prot-in-gram").innerText = `${nutritionInfo.grams.fats} g`
        document.getElementById("fats-in-gram").innerText = `${nutritionInfo.grams.protein} g`
    }

}

//create newUserProfile which will contain information that is needed fo the other JS files
const newUserProfile = new UserProfile()
const goalCalculatedNutrients = new CalculatedNutrients()

//exports pages objects as the default meaning, while importing this main.js we can use any name 
export { newUserProfile as default }

export { goalCalculatedNutrients }