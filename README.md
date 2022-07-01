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

1)Usage of local storage, so users do not need to re-fill their information

2)User is able to get personalised calories counts based on thier inputs

3)Filter selection of recommended recipes.


---------------------
Challenges
1) Using local storage properly, if user does not follow the intended flow, how will the information show?

-It was challeneging because of the nature of this application, each page needs the previous pages informaation and not every page works the same.
-Index-page, user-info page, on click goes to the next page and stores in local at the same time.
-Calories-page only can happen because of the user's input in the user-info page. So the storing of this page, needs to be done either on entering,or done before leaving the previous page. 
-This caused some challenges for me as i did'nt understand why some information were empty as i toggled between the pages randomly. 
-As i checked only through the key, if the storage is present, hence it was always present, but the value might be empty.

2) Using the spreader wrongly
-I used a template for different objects, whenever I changed one objects values, all the other objects values
changed as well.
-I spend a long time rectifying it as i thought my function was not working correctly, but after seeking help, realised that the spreader only works on one level.

3) Getting the buttons to toggle correctly

-The button had a text inside it, and the text was using the <strong> element. I had to troubleshoot to only realised that clicking on the text with the <strong> element is in fact not cliking the target element (button) at all.
-Solving the part if user enters a page, and local storage is present load the storage. Means having to activate the button by focusing, and if user leaves the page without any changes, it means technically the button has not been clicked, so the option is not registered.

4)Working with the API results

-As i needed calories for one meal, the results that return were not consistent, some recipes yield more than 1 servings, some more than 10 servings.
-This was making my filtering very narrow for the user, as the this app internally filters out the calories beyond the estimated one meal, so many results were not being displayed
-I added any extra function to check the yield and divide the portions aso i can maximise the results

5)Time management

-Spent alot of time thinking about how and the best way to do it, as many instances I have done a certain function, only to realised i could hv done it in a faster way. Hence i spent more time thinking stuff through.


---------------------
Techniques/Framework

1) Used bootstrap and bootstrap.bundle for dropdown filter

2) Used local storage to store the user's information

3) Included some abstraction and encapsulation

---------------------
Future Features

1)Able to have user login account

2)Feature to track their goals and calorie intake

3)Feature to input their ideal weight, calcukatione can be personalised

3)More filter selection on recipes (lunch,breakfast,dinner)

4)Feature to change their goal on at different pages, instead of going back to the main

4)Incorporate a more balanced wellness, such as some work out sets they can link to, curated to their goals and needs
