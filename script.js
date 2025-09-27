document.getElementById("recipeForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const ingredient = document.getElementById("ingredientInput").value.trim();
  if (!ingredient) {
    alert("Please enter an ingredient!");
    return;
  }

  // Free API 
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  document.getElementById("results").innerHTML = "🔎 Searching...";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!data.meals) {
        document.getElementById("results").innerHTML = "⚠️ No recipes found.";
        return;
      }

      let output = `<div class="parent-div">`;
      data.meals.forEach(meal => {
        output += `

              <div class="recipe-card">
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank"><button class="btn2">View Recipe</button></a>
              </div>
          
        `;
      });
      
      output += `</div>`;

      document.getElementById("results").innerHTML = output;
      document.getElementById("recipeForm").reset();
      
    })
    .catch(error => {
      document.getElementById("results").innerHTML = "⚠️ Error fetching recipes.";
      console.error(error);
    });
});

