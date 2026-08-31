"use client";

import { useAppContext } from "../../context/AppContext";

export default function LeaderboardPage() {
  const { userList, isLoading, isError } = useAppContext();

  const sortedPlayers = [...userList].sort(
    (a, b) => b.rank - a.rank || a.name.localeCompare(b.name),
  );

  return (
    <main className="grid gap-4 p-2 text-white">
      <div className="flex justify-center">
        <h2 className="text-[28px] font-bold">Leaderboard</h2>
      </div>

      {isLoading && <p>Loading leaderboard...</p>}
      {isError && <p role="alert">Unable to load leaderboard.</p>}
      {!isLoading && !isError && sortedPlayers.length === 0 && (
        <p>No players have been added yet.</p>
      )}
      {!isLoading && !isError && sortedPlayers.length > 0 && (
        <div className="grid gap-3">
          {sortedPlayers.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between rounded-[10px] border border-mahjong-gold bg-mahjong-red p-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold">#{index + 1}</span>
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: player.color }}
                  aria-hidden="true"
                />
                <span>{player.name}</span>
              </div>
              <span>{player.rank}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
