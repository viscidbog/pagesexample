import type { Meal } from './types';

interface Props {
  onAddRandom: (meal: Meal) => void;
}

// Satunnainen resepti -komponentti. API antaa tuota urlia varten satunnaisen reseptin.
export default function RandomRecipe({ onAddRandom }: Props) {
  const fetchRandom = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        onAddRandom(data.meals[0]);
      }
    } catch (e) {
      alert('Satunnaisreseptiä ei saatu haettua: ' + e);
    }
  };

  return (
    <button
      onClick={fetchRandom}
      className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
    >
      Hae satunnainen resepti
    </button>
  );
}
