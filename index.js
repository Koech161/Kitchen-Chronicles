// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
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
        container.innerHTML = data.meals.map((meal) => `
    <div class='card text-center row' style='width: 700px;'>
        <img class='img-fluid card-img-top' src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class='card-body'>
            <h3>${meal.strMeal}</h3>
            <h4>${meal.strCategory}</h4>
            <h5>${meal.strArea}</h5>
            <ul class='list-unstyled'>
                <h2>Ingredients</h2>
                <li>${generateIngredientsList(meal)}</li>
            </ul>
            <div class='card'>
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
            </div>
            <a href="${meal.strSource}" class="btn btn-primary">Source</a>
        </div>
    </div>
`)}) .catch((error)=>{
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
container.innerHTML=` <div class='card text-center row' style='width: 700px;'>
        <img class='img-fluid card-img-top' src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class='card-body'>
            <h3>${meal.strMeal}</h3>
            <h4>${meal.strCategory}</h4>
            <h5>${meal.strArea}</h5>
            <ul class='list-unstyled'>
                <h2>Ingredients</h2>
                <li>${generateIngredientsList(meal)}</li>
            </ul>
            <div class='card'>
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
            </div>
            <a href="${meal.strSource}" class="btn btn-primary">Source</a>
        </div>
    </div>`
})
}
})