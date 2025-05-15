import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./api";
import "./App.css";
import RecipeSearch from "./RecipeSearch";
import RandomRecipe from "./RandomRecipe";
import MealCard from "./MealCard";
import type { Meal } from "./types";

function App() {

  // Taulukko resepteille
  const [meals, setMeals] = useState<Meal[]>([]);

  // Poistaa reseptin listalta
  const removeMeal = (id: string) => {
    setMeals((prev) => prev.filter((meal) => meal.idMeal !== id));
  };


  // Hakee reseptit Firestore-tietokannasta. Tätä piti pyörittää copilotin kanssa monta kertaa, koska siitä tuli niin monta tyyppivirhettä.
  const getRecipes = async () => {
    setMeals([]);
    try {
      const snapshot = await getDocs(collection(db, "recipes"));
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          idMeal: doc.id,
          strMeal: docData.strMeal || "Unknown Meal",
          strMealThumb: docData.strMealThumb || "",
          ...(docData as Omit<Meal, "idMeal" | "strMeal" | "strMealThumb">),
        };
      });
      setMeals(data);
    } catch (error) {
      console.error("Virhe reseptien hakemisessa: ", error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">ReseptiVihko</h1>
      <div className="flex flex-col gap-4 mb-6">
        <RecipeSearch onResults={setMeals} />
        <RandomRecipe
          onAddRandom={(meal) => setMeals((prev) => [...prev, meal])}
        />
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
          onClick={getRecipes}
        >
          Hae reseptit tietokannasta
        </button>
        <button
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          onClick={() => setMeals([])}
        >
          Tyhjennä lista
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} removeMeal={removeMeal} />
        ))}
      </div>
    </div>
  );
}

export default App;
