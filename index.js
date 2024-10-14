/* Global Variable */

let fetchUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

/* Get All Foods */

const getAllFoods = async () => {
    const res = await fetch(fetchUrl);
    const data = await res.json();
    const categories = data.categories.slice(0, 6);
    displayAllFoods(categories);
};

/* Display All Foods */

const displayAllFoods = (categories) => {
    const cardsParent = document.getElementById('food-cards');
    cardsParent.innerHTML = "";
    const loader = document.querySelector('#loading-ring');
    loader.classList.remove('hidden');

    setTimeout(() => {
      loader.classList.add('hidden');
      categories.forEach(category => {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
        <div class="flex sm:flex-row flex-col border rounded-lg items-center gap-10">
              <div class="sm:w-2/5 w-full h-80">
                <img class="w-full h-full rounded-2xl" src='${category.strCategoryThumb}'/>
              </div>
              <div class="sm:w-1/2 w-11/12 py-4">
                <h3 class="text-2xl text-gray-700 font-bold mb-5">${category.strCategory}</h3>
                <p class="text-lg text-gray-500 font-medium mb-5">${category.strCategoryDescription.slice(0, 100)}...</p>

                <a><button onclick="getDetails('${category.idCategory}')" class="text-lg font-semibold text-sharedBtn bg-transparent underline">View Details</button></a>
              </div>
            </div>
        `
        cardsParent.appendChild(newElement);
    });
    }, 3000);
};

/* Get Details */

const getDetails = async (id) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=5277${id}`);
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
          <button class="btn">
            <img class="cursor-pointer" src="assets/Frame.png"/>
          </button>
        </form>
      </div>
    </div>
      <hr class="mb-7">
      <div class="w-full h-80">
        <img class="w-full h-full rounded-lg" src='${meal.strMealThumb}'/>
      </div>
      <div class="py-8 space-y-4">
        <p class="text-xl"><span class="text-gray-700 font-bold">Category:</span> <span class="text-gray-500 font-medium">${meal.strCategory}</span></p>

        <p class="text-xl"><span class="text-gray-700 font-bold">Area:</span> <span class="text-gray-500 font-medium">${meal.strArea}</span></p>

        <p class="text-xl"><span class="text-gray-700 font-bold">Instructions:</span> <span class="text-gray-500 font-medium">${meal.strInstructions.slice(0, 200)}...</span></p>

        <p class="text-xl"><span class="text-gray-700 font-bold">You Tube:</span> <span class="text-gray-500 font-medium"><a href="${meal.strYoutube}" target="_blank">${meal.strYoutube}</a></span></p>
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
    displayAllFoods(showData.categories);
};

/* Get foods by Search */

const searchField = document.getElementById('searchInput');
searchField.addEventListener('keyup', (event) => {
  getAllFoods(event.target.value);
});

getAllFoods();