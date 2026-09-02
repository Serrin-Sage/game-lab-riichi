"use client";

import { useAppContext } from "../../context/AppContext";

export default function LeaderboardPage() {
  const { userList, gamesList, isLoading, isError } = useAppContext();

  const leaderboardRows = [...userList]
    .map((player) => {
      const playerGames = gamesList.filter((game) =>
        game.players.some((entry) => entry.id === player.id),
      );

      const totalScore = playerGames.reduce((sum, game) => {
        const playerResult = game.players.find(
          (entry) => entry.id === player.id,
        );
        return sum + (playerResult?.adjustment ?? 0);
      }, 0);

      const gamesPlayed = playerGames.length;
      const averageScore = gamesPlayed > 0 ? totalScore / gamesPlayed : 0;

      return {
        ...player,
        totalScore,
        gamesPlayed,
        averageScore,
      };
    })
    .sort(
      (a, b) => b.averageScore - a.averageScore || a.name.localeCompare(b.name),
    );

  const formatAdjustment = (value: number) => {
    const formatted =
      Math.abs(value) % 1 === 0 ? value.toString() : value.toFixed(1);
    return `${formatted}`;
  };

  return (
    <main className="grid gap-4 p-2 text-white">
      <div className="flex justify-center">
        <h2 className="text-[28px] font-bold">Leaderboard</h2>
      </div>

      {isLoading && <p>Loading leaderboard...</p>}
      {isError && <p role="alert">Unable to load leaderboard.</p>}
      {!isLoading && !isError && leaderboardRows.length === 0 && (
        <p>No players have been added yet.</p>
      )}
      {!isLoading && !isError && leaderboardRows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2 text-left text-sm sm:text-base">
            <thead className="">
              <tr className="text-mahjong-gold  bg-mahjong-red">
                <th className="px-3 py-2 font-semibold">Rank</th>
                <th className="px-3 py-2 font-semibold">Name</th>
                <th className="px-3 py-2 font-semibold text-right">
                  Total Score
                </th>
                <th className="px-3 py-2 font-semibold text-right">
                  # of Games
                </th>
                <th className="px-3 py-2 font-semibold text-right">
                  Average Score
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboardRows.map((player, index) => (
                <tr key={player.id} className="">
                  <td className="rounded-l-[10px] pl-6 py-3 font-semibold">
                    {index + 1}
                  </td>
                  <td className=" px-3 py-3">
                    <div className="flex items-center gap-3">
                      <span>{player.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {formatAdjustment(player.totalScore)}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {player.gamesPlayed}
                  </td>
                  <td className="rounded-r-[10px] px-3 py-3 text-right tabular-nums">
                    {formatAdjustment(player.averageScore)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
