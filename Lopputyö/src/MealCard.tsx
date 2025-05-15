import { useState } from "react";
import type { Meal } from "./types";
import { saveRecipe } from "./api";

// Tyypitetään MealCard-komponentin propsit
type MealCardProps = {
  meal: Meal;
  removeMeal: (id: string) => void;
};

export default function MealCard({ meal, removeMeal }: MealCardProps) {

  // State minimoi / suurennus -toimintoa varten
  const [collapsed, setCollapsed] = useState(true);

  // Hakee ainesosat reseptistä
  const getIngredients = (meal: Meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${ingredient} ${measure || ""}`.trim());
      }
    }
    return ingredients;
  };

  return (
    <div className="relative border rounded p-4 shadow bg-white transition-all duration-300">
      {/* Minimoi / Suurenna */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-2 left-2 bg-blue-500 text-sm px-2 py-1 rounded hover:bg-gray-300 z-10"
      >
        {collapsed ? "+" : "-"}
      </button>

      {/* Tallenna */}
      <button
        onClick={() => saveRecipe(meal)}
        className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-sm px-2 py-1 rounded hover:bg-gray-300 z-10"
      >
        Tallenna
      </button>

      {/* Poista */}
      <button
        onClick={() => removeMeal(meal.idMeal)}
        className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded hover:bg-red-700 z-10"
      >
        X
      </button>

      {/* Reseptin nimi */}
      <h2 className="text-xl font-semibold mb-2 text-black mt-10">
        {meal.strMeal}
      </h2>

      {/* Reseptin kuva */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className={`mx-auto rounded mb-3 transition-all duration-300 ${
          collapsed ? "max-w-[150px]" : "w-full"
        }`}
      />

      {/* Laajennettu sisältö */}
      {!collapsed && (
        <div className="mt-3">
          <h3 className="font-semibold mb-1">Ainekset:</h3>
          <ul className="list-disc list-inside text-sm mb-3 text-black">
            {getIngredients(meal).map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>

          <h3 className="font-semibold mb-1">Ohjeet:</h3>
          <p className="text-sm whitespace-pre-line mb-4 text-black">
            {meal.strInstructions || "Ei ohjeita saatavilla."}
          </p>
        </div>
      )}
    </div>
  );
}
