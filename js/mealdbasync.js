const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';

    const searchNull = document.getElementById('search-null');
    if (searchText == '') {
        searchNull.style.display = 'block';
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

        // load data
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.meals);

        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => displaySearchResult(data.meals));

        searchNull.style.display = 'none';

    }
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // console.log(meals.length);

    if (meals?.length) {
        meals.forEach(meal => {
            // console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}.sli</p>
                </div>
            </div>
        `;
            searchResult.appendChild(div);
        })

    }

    // error handling search input result is not fount
    else {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<h5 class="text-center pt-3">No results found.</h5>`;
        searchResult.appendChild(div);
    }

}

const loadMealDetail = async meaId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meaId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal => {
    // console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `;
    mealDetails.appendChild(div);
}