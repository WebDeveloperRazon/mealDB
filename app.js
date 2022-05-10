const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    searchField.value = '';

    if(searchText === '') {
        window.alert('please type your favorite  food in the search box')
    }else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
         const res =await fetch(url)
         const data = await res.json();
         displaySearchResults(data.meals)

    }
   
}

const displaySearchResults =(meals)=>{
    const searchResults =document.getElementById('search-results');
    searchResults.textContent ='' ;
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
        <div onclick="loadMealDetail(${meal.idMeal})" class="card" style="width: 18rem;">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">${meal.strInstructions.slice(0,100)}</p>
                
                </div>
              </div>
    
        `
        searchResults.appendChild(div)
    });
}

const loadMealDetail = async mealId => {
    const url = ` https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res= await fetch(url)
    const data = await res.json();
    displayMealDetail(data.meals[0])

    
}

const displayMealDetail = (mealDetail) => {
    console.log(mealDetail);
    const mealInfo =document.getElementById('meal-info');
    mealInfo.textContent = '';
    const div = document.createElement('div');
    div.classList.add('info');
    div.innerHTML = `
    <div class="card mb-3 mx-auto mb-5 mt-5 xl" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${mealDetail.strMealThumb}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${mealDetail.strMeal}</h5>
          <p class="card-text">${mealDetail.strInstructions.slice(0,100)}</p>
        
        </div>
      </div>
    </div>
  </div> 
    `
    mealInfo.appendChild(div);
   
}