import { useAppContext } from "@/app/context/AppContext";

export const GameHistory = () => {
  const { gamesList } = useAppContext();
  return (
    <div className="grid max-h-[calc(100dvh-11rem)] gap-4 overflow-y-auto overscroll-contain px-1 pb-4">
      {gamesList.map((game) => (
        <div
          className="border border-mahjong-gold rounded-[10px] p-4 bg-mahjong-red/70 mx-0 sm:mx-8"
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
                <span className="flex min-w-0 items-center gap-1 truncate text-[18px]">
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: player.color }}
                  />
                  {player.name}
                </span>
                <div className="flex gap-2">
                  <span>#{player.placement}</span>
                  <span>{player.score.toLocaleString()}</span>
                  <span
                    className={`${(player.adjustment ?? 0) > 0 ? "text-green-400" : "text-red-600"}`}
                  >
                    {(player.adjustment ?? 0) > 0 ? "+" : ""}
                    {player.adjustment ?? 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
