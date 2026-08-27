"use client";

import { GameForm } from "./GameForm";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export const HomePage = () => {
  const { isLoading, isError, gamesList } = useAppContext();
  const [isGameFormModalOpen, setIsGameFormModalOpen] = useState(false);

  return (
    <div className="profile-welcome content-wrap text-white" id="top">
      <div className="flex justify-between p-2">
        <h1>Welcome to GL Riichi</h1>
        <div
          onClick={() => setIsGameFormModalOpen(true)}
          className="cursor-pointer"
        >
          New Game Form
        </div>
      </div>

      <main className="grid gap-4 p-2">
        <div className="flex justify-center">
          <h2 className="text-[28px] font-bold">Game History</h2>
        </div>
        {isLoading && <p>Loading games...</p>}
        {isError && <p role="alert">Unable to load games.</p>}
        {!isLoading && !isError && gamesList.length === 0 && (
          <p>No games have been recorded yet.</p>
        )}
        {!isLoading && !isError && gamesList.length > 0 && (
          <div className="grid max-h-[calc(100dvh-11rem)] gap-4 overflow-y-auto overscroll-contain px-1 pb-4 scrollbar-gutter-stable">
            {gamesList.map((game) => (
              <div
                className="border border-mahjong-gold rounded-[10px] p-4 bg-mahjong-red mx-0 sm:mx-8"
                key={game.id}
                data-testid="game-history-list"
              >
                <div className="flex justify-between gap-4 border-b border-white/30 pb-2">
                  <h3>{game.mode} game</h3>
                  <time dateTime={game.date}>
                    {new Date(game.date).toLocaleDateString()}
                  </time>
                </div>
                <div className="grid gap-2 pt-3">
                  {game.players.map((player) => (
                    <div
                      className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-2 sm:gap-3"
                      key={`${game.id}-${player.id}`}
                    >
                      <span className="flex min-w-0 items-center gap-2 truncate">
                        <span
                          aria-hidden="true"
                          className="h-3 w-3 shrink-0 rounded-full"
                          style={{ backgroundColor: player.color }}
                        />
                        {player.name}
                      </span>
                      <span>{player.score.toLocaleString()}</span>
                      <span>#{player.placement}</span>
                      <span>
                        {(player.adjustment ?? 0) > 0 ? "+" : ""}
                        {player.adjustment ?? 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
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
