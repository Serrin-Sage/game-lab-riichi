import { TooltipContentProps } from "recharts";

export const GraphTooltip = ({ active, payload }: TooltipContentProps) => {
  if (!active || !payload?.[0]) return null;

  const game = payload[0].payload as {
    placement: number;
    score: number;
  };

  return (
    <div className="bg-mahjong-red/90 border border-zinc-500 flex flex-col px-3 py-1 rounded-md text-[14px] font-semibold">
      <p className="text-white flex gap-4">
        <span className="text-zinc-300">Placement</span>
        <span>{game.placement}</span>
      </p>
      <p className="text-white flex gap-4">
        <span className="text-zinc-300">Score</span>
        <span>{game.score.toLocaleString()}</span>
      </p>
    </div>
  );
};
