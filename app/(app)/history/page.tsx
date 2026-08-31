"use client";

import { GameHistory } from "../../components/home/GameHistory";
import { useAppContext } from "../../context/AppContext";

export default function HistoryPage() {
  const { isLoading, isError, gamesList } = useAppContext();

  return (
    <main className="grid gap-4 p-2 text-white">
      <div className="flex justify-center">
        <h2 className="text-[28px] font-bold">Game History</h2>
      </div>

      {isLoading && <p>Loading games...</p>}
      {isError && <p role="alert">Unable to load games.</p>}
      {!isLoading && !isError && gamesList.length === 0 && (
        <p>No games have been recorded yet.</p>
      )}
      {!isLoading && !isError && gamesList.length > 0 && <GameHistory />}
    </main>
  );
}
