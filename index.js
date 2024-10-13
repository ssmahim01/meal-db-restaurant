/* Global Variable */

let fetchUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

/* Get All Foods */

const getAllFoods = async () => {
    const res = await fetch(fetchUrl);
    const data = await res.json();
    const categories = data.categories.slice(1, 7);
    displayAllFoods(categories);
};

/* Display All Foods */

const displayAllFoods = (categories) => {
    const cardsParent = document.getElementById('food-cards');
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
                <p class="text-lg text-gray-500 font-medium mb-5">There are many variations of passages of available, but the majority have suffered</p>

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
  
}

/* Get Items By Search */



/* Show All Cards */

const showAllCards = async () => {
    const response = await fetch(fetchUrl);
    const showData = await response.json();
    displayAllFoods(showData.categories.slice(6));
};

getAllFoods();