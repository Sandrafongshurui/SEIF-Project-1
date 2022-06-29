
 const object = {
    "key1": 1,
    "key2": 2
 }
class Cat {
    constructor(name) {
        this.name = name;
        this.legs = this.legs
        this.calories = ""
        this.object = {...object}
    }
    filCalories(num) {
        this.calories = num;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }

    run() {
        this.legs = 2
        console.log(this.legs)
    }
}

class Lion extends Cat {

}

const puma = new Cat("puma")
const tiger = new Cat("tiger")

puma.object.key1 = 10
console.log(puma.object)
console.log(tiger.object)

// let c = new Cat("kitty")
// let l = new Cat('Fuzzy');
// c.filCalories(500)
// console.log(c.calories)
// console.log(l.calories)
// //  const object = {
//     "key1": 1,
//     "key2": 2
//  }

//  const object2 = {...object}
//  object2.key1 = 3
//  console.log(object.key1)
//  console.log(object2.key1)