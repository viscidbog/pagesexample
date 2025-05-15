import { useState } from "react";
import type { Meal } from "./types";

interface Props {
  onResults: (meals: Meal[]) => void;
}

export default function RecipeSearch({ onResults }: Props) {
  // Statet reseptin hakua ja erroria varten
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  // Hakee reseptit API:sta
  const searchMeals = async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setError("Kirjoita hakusana.");
      return;
    }

    setError("");

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${trimmed}`
      );
      const data = await res.json();
      if (data.meals) {
        onResults(data.meals);
      } else {
        setError("Ei löytynyt mitään.");
        onResults([]);
      }
    } catch (e) {
      setError("Haku epäonnistui: " + e);
      onResults([]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={query}
        placeholder="Hae resepti..."
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <button
        onClick={searchMeals}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Hae
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
