"use client";

import { GameForm } from "../games/GameForm";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { GameHistory } from "./GameHistory";

export const HomePage = () => {
  const { isLoading, isError, gamesList } = useAppContext();
  const [isGameFormModalOpen, setIsGameFormModalOpen] = useState(false);

  return (
    <div className="profile-welcome content-wrap text-white" id="top">
      <main className="grid gap-4 p-2">
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

      {isGameFormModalOpen && (
        <GameForm
          isModalOpen={isGameFormModalOpen}
          setIsModalOpen={setIsGameFormModalOpen}
        />
      )}
    </div>
  );
};
