"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppContext } from "../../../context/AppContext";
import { GameGraph } from "@/app/components/players/GameGraph";

export default function PlayerPage() {
  const params = useParams<{ id: string }>();
  const { userList, gamesList, isLoading, isError } = useAppContext();

  const player = userList.find((profile) => profile.id === params.id);
  const playerGames = gamesList.filter((game) =>
    game.players.some((playerResult) => playerResult.id === params.id),
  );

  const getPlayerStatsForGame = (game: (typeof playerGames)[number]) =>
    game.players.find((entry) => entry.id === params.id);

  const getBestScore = (stats: ReturnType<typeof getPlayerStatsForGame>[]) =>
    stats.length ? Math.max(...stats.map((entry) => entry?.score ?? 0)) : 0;

  const getAverageScore = (
    stats: ReturnType<typeof getPlayerStatsForGame>[],
  ) =>
    stats.length
      ? stats.reduce((sum, entry) => sum + (entry?.score ?? 0), 0) /
        stats.length
      : 0;

  const getAveragePlacement = (
    stats: ReturnType<typeof getPlayerStatsForGame>[],
  ) => {
    const placements = stats
      .filter((entry) => typeof entry?.placement === "number")
      .map((entry) => entry!.placement as number);

    return placements.length
      ? placements.reduce((sum, placement) => sum + placement, 0) /
          placements.length
      : 0;
  };

  const playerStatsList = playerGames
    .map((game) => getPlayerStatsForGame(game))
    .filter((entry): entry is NonNullable<typeof entry> => entry !== undefined);

  const bestScore = getBestScore(playerStatsList);
  const averageScore = getAverageScore(playerStatsList);
  const averagePlacement = getAveragePlacement(playerStatsList);

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
      <div className="flex justify-center items-center">
        <h2 className="text-[28px] font-bold">Player Overview</h2>{" "}
        <span className="text-[10px] translate-x-2">beta</span>
      </div>
      <div className="rounded-[10px] border border-mahjong-gold bg-mahjong-red/70 pt-4">
        <div className="flex items-center gap-3 pb-4 pl-4">
          <span
            aria-hidden="true"
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: player.color }}
          />
          <h2 className="text-[28px] font-bold">{player.name}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-mahjong-gold divide-mahjong-gold divide-x divide-y md:divide-y-0 divide-border">
          <div className="px-4 md:px-5 py-3">
            <h3>Matches</h3>
            <p>{playerGames.length}</p>
          </div>
          <div className="px-4 md:px-5 py-3">
            <h3>Best Score</h3>
            <p>{bestScore.toLocaleString()}</p>
          </div>
          <div className="px-4 md:px-5 py-3">
            <h3>Avg score</h3>
            <p>
              {averageScore.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className="px-4 md:px-5 py-3">
            <h3>Avg placement</h3>
            <p>
              {averagePlacement.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <h3 className="text-2xl font-semibold">Recent games</h3>
      </div>

      {playerGames.length === 0 ? (
        <p>No games recorded for this player yet.</p>
      ) : (
        <div className="grid gap-3">
          {playerGames.map((game) => {
            const playerStats = getPlayerStatsForGame(game);

            return (
              <div
                key={game.id}
                className="rounded-[10px] border border-mahjong-gold bg-mahjong-red/70 p-4"
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
          <div>
            <GameGraph playerData={playerGames} />
          </div>
        </div>
      )}
    </main>
  );
}
