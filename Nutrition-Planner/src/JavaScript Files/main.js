
const userInfoTemplate = {
    "gender": "",
    "age": "",
    "height": "",
    "weight": "",
    "exercisefreq": ""
}

const measureType = {
    "carbs": "",
    "protein": "",
    "fats": ""
}

const nutrientsEquationNums = {
    "weight-loss": {
        "carbs": 50,
        "protein": 20,
        "fats": 30,
    },
    "muscle-gain": {
        "carbs": 50,
        "protein": 30,
        "fats": 20,
    },
    "tone-up": {
        "carbs": 40,
        "protein": 30,
        "fats": 30,
    },
    "maintainence": {
        "carbs": 50,
        "protein": 20,
        "fats": 30,
    }
}

class UserProfile {
    constructor() {
        this.goal = ""
        this.userInfo = { ...userInfoTemplate }
        this.goalNutrientsInfo = {}
        this.maintainenceNutrientsInfo = {}
        this.selectedCaloriesInfo = "goalNutrientsInfo"
        this.recipes = []
        this.shownRecipes=[]
        this.estOneMeal = {
            
        }
    }

    calculateMaintainenceCalories() {
        // Formula used to calculate men’s calorie needs is:
        //bmr is basal metabolic rate, how much you burn at rest
        //Result of the equation must be multiplied with your physical activity factor.
        let bmr = 0
        if (this.userInfo.gender === "male") {
            //using Mifflin-St Jeor men formula
            bmr = 10 * this.userInfo.weight + 6.25 * this.userInfo.height - 5 * this.userInfo.age + 5

        } else {
            //using Mifflin-St Jeor women formula
            bmr = 10 * this.userInfo.weight + 6.25 * this.userInfo.height - 5 * this.userInfo.age + 161
        }

        const tdee = this.calculateTdee(this.userInfo.exercisefreq)
        const calories = bmr * tdee
        this.maintainenceNutrientsInfo.calories = calories
        return Math.round(calories / 100) * 100
    }

    //tdee is Total Daily Energy Expenditure , physical activity factor.
    //optionNum would be what activity option the user chose
    calculateTdee(activityOption) {
        //these are standards number for the formula, that is base on [low acitivy - high acitivy]
        const activityFactorArray = [1.2, 1.375, 1.75, 1.9]
        //activityOption will be a string "option-1"
        //get the num only for the index
        const optionNum = activityOption.charAt(activityOption.length - 1)
        return activityFactorArray[optionNum - 1]
    }

    calculateGoalCalories() {
        //weight loss, use the maintainence calories -500cal (ideal number base on online research)
        //future can be a parameter to change according to  "ideal weight' feature
        if (this.goal === "weight-loss") {
            this.goalNutrientsInfo.calories = this.maintainenceNutrientsInfo.calories - 500
            return Math.round(this.goalNutrientsInfo.calories / 100) * 100
        }
        //muscle-gain, use the maintainence calories +500cal 
        if (this.goal === "muscle-gain") {
            this.goalNutrientsInfo.calories = this.maintainenceNutrientsInfo.calories + 500
            return Math.round(this.goalNutrientsInfo.calories / 100) * 100
        }
        //tone-up, 
        if (this.goal === "tone-up") {
            this.goalNutrientsInfo.calories = this.maintainenceNutrientsInfo.calories - 300
            return Math.round(this.goalNutrientsInfo.calories / 100) * 100 
        }
    }

    inputStorage(keyName) {
        const storeInfo = this.getData(keyName)
        //store in the UserProfile, no need to store in local storage agian, so false
        this.storeValue(keyName, storeInfo, false)
    }

    //store in the this class and local storage 
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
        if (pageData === "estOneMeal") {
            this.estOneMeal = value
            return
        }
        if (pageData === "shownRecipes") {
            this.shownRecipes = value
            return
        }
    }

    storeInLocal(pageData, value) {
        window.localStorage.setItem(pageData, JSON.stringify(value))
    }

    hasStorage(pageData) {
        return window.localStorage.getItem(pageData) !== null ? true : false
    }

    goToPage(link) {
        window.location.href = link
    }

    getData(pageData) {
        //return the value of the pagedata key
        return JSON.parse(localStorage.getItem(pageData))
    }

    loadData(pageData) {
        console.log("load data")
        window.localStorage.getItem(pageData)
    }
}


class CalculatedNutrients {
    constructor(goal) {
        this.goal = goal
        this.goalNutrientsInfo = {
            "calories": "",
            "per": { ...measureType },
            "cal": { ...measureType },
            "grams": { ...measureType }
        }
        this.maintainenceNutrientsInfo = {
            "calories": "",
            "per": { ...measureType },
            "cal": { ...measureType },
            "grams": { ...measureType }
        }
        this.nutrientsEquationNums = nutrientsEquationNums
    }

    calculateGoalNutrients() {
        //get goal percentaeg 
        const goalNutrientsInfoPercentage = this.goalNutrientsInfo.per
        goalNutrientsInfoPercentage.carbs = this.nutrientsEquationNums[this.goal].carbs
        goalNutrientsInfoPercentage.protein = this.nutrientsEquationNums[this.goal].protein
        goalNutrientsInfoPercentage.fats = this.nutrientsEquationNums[this.goal].fats

        //get the nutrients of the specific goal from nutrients info
        //calculate the given percentage of the total calories for each nutrient in calories
        const goalNutrientsInfoCal = this.goalNutrientsInfo.cal
        goalNutrientsInfoCal.carbs = Math.round(this.percentage(this.goalNutrientsInfo.calories, this.nutrientsEquationNums[this.goal].carbs))
        goalNutrientsInfoCal.protein = Math.round(this.percentage(this.goalNutrientsInfo.calories, this.nutrientsEquationNums[this.goal].protein))
        goalNutrientsInfoCal.fats = Math.round(this.percentage(this.goalNutrientsInfo.calories, this.nutrientsEquationNums[this.goal].fats))

        //calculate the given percentage of the total calories for each nutrient in grams, 
        //one calorie is equal to 0.129598 grams
        const goalNutrientsInfoGrams = this.goalNutrientsInfo.grams
        goalNutrientsInfoGrams.carbs = this.convertCalToGram(goalNutrientsInfoCal.carbs)
        goalNutrientsInfoGrams.protein = this.convertCalToGram(goalNutrientsInfoCal.protein)
        goalNutrientsInfoGrams.fats = this.convertCalToGram(goalNutrientsInfoCal.fats)
    }

    calculateMaintainenceNutrients() {
        //get maintainence percentaeg 
        const maintainenceNutrientsInfoPercentage = this.maintainenceNutrientsInfo.per
        maintainenceNutrientsInfoPercentage.carbs = this.nutrientsEquationNums.maintainence.carbs
        maintainenceNutrientsInfoPercentage.protein = this.nutrientsEquationNums.maintainence.protein
        maintainenceNutrientsInfoPercentage.fats = this.nutrientsEquationNums.maintainence.fats

        //get the nutrients of the specific goal from nutrients info
        //calculate the given percentage of the total calories for each nutrient in calories
        const maintainenceNutrientsInfoCal = this.maintainenceNutrientsInfo.cal
        maintainenceNutrientsInfoCal.carbs = Math.round(this.percentage(this.maintainenceNutrientsInfo.calories, this.nutrientsEquationNums.maintainence.carbs))
        maintainenceNutrientsInfoCal.protein = Math.round(this.percentage(this.maintainenceNutrientsInfo.calories, this.nutrientsEquationNums.maintainence.protein))
        maintainenceNutrientsInfoCal.fats = Math.round(this.percentage(this.maintainenceNutrientsInfo.calories, this.nutrientsEquationNums.maintainence.fats))

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
        return Math.round((cal * 0.129598))
    }

    inputValuesInTable(nutritionInfo) {
        document.getElementById("calories-num").innerText = nutritionInfo.calories
        document.getElementById("carbs-in-per").innerText = `${nutritionInfo.per.carbs} %`
        document.getElementById("prot-in-per").innerText = `${nutritionInfo.per.protein} %`
        document.getElementById("fats-in-per").innerText = `${nutritionInfo.per.fats} %`
        document.getElementById("carbs-in-cal").innerText = `${nutritionInfo.cal.carbs} cal`
        document.getElementById("prot-in-cal").innerText = `${nutritionInfo.cal.protein} cal`
        document.getElementById("fats-in-cal").innerText = `${nutritionInfo.cal.fats} cal`
        document.getElementById("carbs-in-gram").innerText = `${nutritionInfo.grams.carbs} g`
        document.getElementById("prot-in-gram").innerText = `${nutritionInfo.grams.protein} g`
        document.getElementById("fats-in-gram").innerText = `${nutritionInfo.grams.fats} g`
    }

}

const newUserProfile = new UserProfile()
const goalCalculatedNutrients = new CalculatedNutrients()
export { newUserProfile as default }
export { goalCalculatedNutrients }

