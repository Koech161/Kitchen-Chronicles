document.addEventListener('DOMContentLoaded', function(){ 
const inputField=document.getElementById('search')
const searchBtn=document.getElementById('submit')
const results=document.getElementById('search-results')
const container=document.getElementById('meals-container')
const randombtn=document.getElementById('random-btn')

searchBtn.addEventListener('submit', findMeals)

function findMeals(e){
    e.preventDefault()
    const item = inputField.value.trim()
   // console.log(item);
    fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${item}`)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data);
        if(item===' '){
            results.innerHTML=`please enter meal name`
        }
        if(!data.meals){
            results.innerHTML=`Ooops ${item} not available`
        }else{
            results.innerHTML=`search results for ${item}`
        }
        container.innerHTML=data.meals.map((meal)=>`<div><img src="${meal.strMealThumb}">
       
        <h3>${meal.strMeal}</h3>
        <h3>${meal.strCategory}</h3>
        <h2 id="area">${meal.strArea}</h2>
        <ul>
        <h2>Ingredients</h2>
           ${generateIngredientsList(meal)}
        </ul>
        <p id="instruction">${meal.strInstructions}</p>
        <a id="link" href="">${meal.strSource}</a></div>`)
 }).catch((error)=>{
    console.error('Error fetching data', error);
 })
 inputField.value=''
 
}
function generateIngredientsList(meal) {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredientsList;
}
randombtn.addEventListener('click', getRandomMeals)

function getRandomMeals(){
fetch('https://themealdb.com/api/json/v1/1/random.php')
.then(res=>res.json())
.then((data)=>{
console.log(data)
const meal=data.meals[0]
results.innerHTML='Random meal'
container.innerHTML=`<div><img src="${meal.strMealThumb}">
       
        <h3>${meal.strMeal}</h3>
        <h3>${meal.strCategory}</h3>
        <h2 id="area">${meal.strArea}</h2>
        <ul>
        <h2>Ingredients</h2>
           ${generateIngredientsList(meal)}
        </ul>
        <p id="instruction">${meal.strInstructions}</p>
        <a id="link" href="">${meal.strSource}</a></div>`
})
}
})