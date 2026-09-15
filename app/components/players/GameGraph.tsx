import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { Game } from "@/app/lib/types";

interface GameGraphProps {
  playerData: Game[];
}

export const GameGraph = ({ playerData }: GameGraphProps) => {
  console.log(playerData);
  return (
    <LineChart
      style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
      responsive
      data={playerData}
    >
      <CartesianGrid />
      <Line dataKey="Placement Trend" />
      <XAxis dataKey="date" />
      <YAxis dataKey="placement" />
      <Legend />
    </LineChart>
  );
};
