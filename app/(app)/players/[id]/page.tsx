"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppContext } from "../../../context/AppContext";

export default function PlayerPage() {
  const params = useParams<{ id: string }>();
  const { userList, gamesList, isLoading, isError } = useAppContext();

  const player = userList.find((profile) => profile.id === params.id);
  const playerGames = gamesList.filter((game) =>
    game.players.some((playerResult) => playerResult.id === params.id),
  );

  if (isLoading) {
    return <p className="p-2 text-white">Loading player...</p>;
  }

  if (isError) {
    return (
      <p className="p-2 text-white" role="alert">
        Unable to load player.
      </p>
    );
  }

  if (!player) {
    return (
      <main className="p-2 text-white">
        <h2 className="text-[28px] font-bold">Player not found</h2>
        <Link href="/leaderboard" className="mt-4 inline-block underline">
          Back to leaderboard
        </Link>
      </main>
    );
  }

  return (
    <main className="grid gap-4 p-2 text-white">
      <div className="rounded-[10px] border border-mahjong-gold bg-mahjong-red p-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: player.color }}
          />
          <h2 className="text-[28px] font-bold">{player.name}</h2>
        </div>
        <p className="mt-2">Rank: {player.rank}</p>
      </div>

      <div className="flex justify-center">
        <h3 className="text-2xl font-semibold">Recent games</h3>
      </div>

      {playerGames.length === 0 ? (
        <p>No games recorded for this player yet.</p>
      ) : (
        <div className="grid gap-3">
          {playerGames.map((game) => {
            const playerStats = game.players.find(
              (entry) => entry.id === params.id,
            );

            return (
              <div
                key={game.id}
                className="rounded-[10px] border border-mahjong-gold bg-mahjong-red p-4"
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/30 pb-2">
                  <h4>{game.mode} game</h4>
                  <time dateTime={game.date}>
                    {new Date(game.date).toLocaleDateString()}
                  </time>
                </div>
                <div className="pt-3">
                  <p>Score: {playerStats?.score.toLocaleString()}</p>
                  <p>Placement: #{playerStats?.placement ?? "-"}</p>
                  <p>
                    Adjustment: {(playerStats?.adjustment ?? 0) > 0 ? "+" : ""}
                    {playerStats?.adjustment ?? 0}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
