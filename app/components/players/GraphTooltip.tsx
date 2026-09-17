import { TooltipContentProps } from "recharts";

export const GraphTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps) => {
  if (!active || !payload?.[0]) return null;

  const game = payload[0].payload as {
    placement: number;
    score: number;
  };

  return (
    <div className="p-4 bg-mahjong-red border border-zinc-500 flex flex-col gap-4 rounded-md">
      <p>Placement - #{game.placement}</p>
      <p>Score - {game.score.toLocaleString()}</p>
    </div>
  );
};
