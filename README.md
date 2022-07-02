CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Features
 * Challenges
 * Techniques/Frameworks
 * Future Features

---------------------
 Introduction:
 This is a web application called "Health Up" which helps the user achieve their health goal, by calculating the calories they need and recommending recipes for them.

 Application Usage
 
 1) Index-page
 -User indicates goal (weight loss, muscle gain, tone up)
 -Brings them to user-info page

 2) User-Info-Page
 -User fills up the form (gender, age, height, weight, physical activity)
 -Click calculate, brings them to calories-info-page.

 3) Calories-info-page
 -2 options to choose from, user's selected goal or maintainence
 -Each option will render their specific percentage, calories, grams of each nutrient (carbs, protein, fats) in the disaplyed table
 -Calculations are done base on the provided information in the user-info-page
 
 4) Recipe-Page
 -Fetches from API and get back a list of recipes
 -Display those recepies that meets the needs of the user's calories and nutrients
 -A table that shows your estimated calories per meal along with the nutrients breakdown.
 -A filter with several options base on selected dietary, which will then display the recipes of teh selected filter

---------------------
Features

1) Usage of local storage, so users do not need to re-fill their information

2) User is able to get personalised calories counts based on thier inputs

3) Filter selection of recommended recipes.

4) Mobile resposive


---------------------
Challenges
1) Using local storage properly, if user does not follow the intended flow, how will the information show?

2) Getting the buttons to toggle correctly

3) Working with the API results

4) Time management

5) Local storage problem to retrivinng recipes, 403 forbidden error occurs randomly.

---------------------
Techniques/Framework

1) Used bootstrap and bootstrap.bundle for dropdown filter

2) Used local storage to store the user's information

3) Included some abstraction and encapsulation

4) Javascript, CSS, HTML

---------------------
Future Features

1) Able to have user login account

2) Feature to track their goals and calorie intake

3) Feature to input their ideal weight, calcukatione can be personalised

4) More filter selection on recipes (lunch,breakfast,dinner)

5) Feature to change their goal on at different pages, instead of going back to the main

