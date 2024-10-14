/* Global Variable */

let fetchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b';

/* Get All Foods */

const getAllFoods = async () => {
    const res = await fetch(fetchUrl);
    const data = await res.json();
    const meals = data.meals.slice(0, 8);
    displayAllFoods(meals);
};

/* Display All Foods */

const displayAllFoods = (meals) => {
    const cardsParent = document.getElementById('food-cards');
    cardsParent.innerHTML = "";
    const loader = document.querySelector('#loading-ring');
    loader.classList.remove('hidden');

    setTimeout(() => {
      loader.classList.add('hidden');
      meals.forEach(meal => {
        // console.log(meal);
        const newElement = document.createElement('div');
        newElement.innerHTML = `
        <div class="flex sm:flex-row flex-col border rounded-lg items-center gap-10">
              <div class="sm:w-2/5 w-full h-80">
                <img class="w-full h-full rounded-2xl" src='${meal.strMealThumb}'/>
              </div>
              <div class="sm:w-1/2 w-11/12 py-4">
                <h3 class="text-2xl text-gray-700 font-bold mb-5">${meal.strCategory}</h3>
                <p class="text-lg text-gray-500 font-medium mb-5">${meal.strInstructions.slice(0, 100)}...</p>

                <a><button onclick="getDetails('${meal.idMeal}')" class="text-lg font-semibold text-sharedBtn bg-transparent underline">View Details</button></a>
              </div>
            </div>
        `
        cardsParent.appendChild(newElement);
    });
    }, 3000);
};

/* Get Details */

const getDetails = async (id) => {
  console.log(id);
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  displayDetails(data.meals);
};

/* Display Details */

const displayDetails = (meals) => {
  const modalContainer = document.getElementById('modal-details');
  modalContainer.innerHTML = "";
    meals.forEach((meal) => {
      const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex justify-between items-center">
      <h2 class="text-3xl text-gray-700 font-bold">${meal.strMeal}</h2>
      <div class="modal-action mb-5">
        <form method="dialog">
          <button>
            <img class="cursor-pointer" src="assets/Frame.png"/>
          </button>
        </form>
      </div>
    </div>
      <hr class="mb-7">
      <div class="w-full h-80">
        <img class="w-full h-full rounded-lg" src='${meal.strMealThumb}'/>
      </div>
      <div class="py-6 space-y-4">
        <p class="text-xl"><span class="text-gray-700 font-bold">Category:</span> <span class="text-gray-500 font-medium">${meal.strCategory}</span></p>

        <p class="text-xl"><span class="text-gray-700 font-bold">Area:</span> <span class="text-gray-500 font-medium">${meal.strArea}</span></p>

        <p class="text-xl"><span class="text-gray-700 font-bold">Instructions:</span> <span class="text-gray-500 font-medium">${meal.strInstructions}</span></p>

        <p class="text-xl"><span class="text-gray-700 font-bold">You Tube:</span> <span class="text-gray-500 font-medium"><a href=${meal?.strYoutube || 'N/A'} target="_blank">'${meal?.strYoutube || 'N/A'}'</a></span></p>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-error px-6 text-white font-bold">Close</button>
        </form>
      </div>
    `
    modalContainer.appendChild(div);
    });
  
    document.getElementById('mealModal').showModal();
};

/* Show All Cards */

const showAllCards = async () => {
    const response = await fetch(fetchUrl);
    const showData = await response.json();
    displayAllFoods(showData.meals);
};

/* Get foods by Search */

const getSearchFoodsByName = async (search) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
  const data = await res.json();
  console.log(data.meals);
  displayAllFoods(data.meals);
};

const getSearchFoodsByFirstLetter = async (search) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
  const data = await res.json();
  console.log(data.meals);
  displayAllFoods(data.meals);
};

const searchBtn1 = document.getElementById('btn-search');
searchBtn1.addEventListener('click', () => {
  const inputField = document.getElementById('searchInput');
getSearchFoodsByName(inputField.value);
});

const searchBtn2 = document.getElementById('searchInput');
searchBtn2.addEventListener('keyup', (event) => {
  getSearchFoodsByFirstLetter(event.target.value);
});

getAllFoods();