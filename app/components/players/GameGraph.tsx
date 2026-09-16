import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GraphTooltip } from "./GraphTooltip";

interface GameGraphProps {
  playerData: {
    date: string;
    placement: number;
    score: number;
  }[];
}

export const GameGraph = ({ playerData }: GameGraphProps) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });

  const formatPlacement = (placement: number) => {
    const suffix =
      placement === 1
        ? "st"
        : placement === 2
          ? "nd"
          : placement === 3
            ? "rd"
            : "th";

    return `${placement}${suffix}`;
  };

  return (
    <LineChart
      style={{
        width: "100%",
        aspectRatio: 1.618,
        maxWidth: 600,
        padding: "3px",
      }}
      responsive
      data={playerData}
    >
      <CartesianGrid />
      <Line dataKey="placement" name="Placement" stroke="#7d0914" />
      <XAxis dataKey="date" tickFormatter={formatDate} />
      <YAxis
        dataKey="placement"
        domain={[1, 4]}
        reversed
        allowDecimals={false}
        ticks={[1, 2, 3, 4]}
        tickFormatter={formatPlacement}
      />
      <Tooltip content={GraphTooltip} />
    </LineChart>
  );
};
