document.getElementById("recipeForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const ingredient = document.getElementById("ingredientInput").value.trim();
  if (!ingredient) {
    alert("Please enter an ingredient!");
    return;
  }

  // Spoonacular API 
  const apiKey = "67e0aedbc41647469d25d9000df28a35";
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=10&apiKey=${apiKey}`;

  document.getElementById("results").innerHTML = "🔎 Searching...";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!data || data.length === 0) {
        document.getElementById("results").innerHTML = "⚠️ No recipes found.";
        return;
      }

      let output = `<div class="parent-div">`;
      data.forEach(meal => {
        output += `
          <div class="recipe-card">
            <h3>${meal.title}</h3>
            <img src="${meal.image}" alt="${meal.title}">
            <a href="https://spoonacular.com/recipes/${meal.title.replace(/\s+/g, "-")}-${meal.id}" target="_blank">
              <button class="btn2">View Recipe</button>
            </a>
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

// dark mode 
const toggleBtn = document.getElementById("darkModeToggle");
const body = document.body;


if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️"; 
}


toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    toggleBtn.textContent = "☀️"; 
    localStorage.setItem("darkMode", "disabled");
    toggleBtn.textContent = "🌙"; 
  }
});

