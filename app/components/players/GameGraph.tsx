import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface GameGraphProps {
  playerData: {
    date: string;
    placement: number;
    score: number;
  }[];
}

export const GameGraph = ({ playerData }: GameGraphProps) => {
  return (
    <LineChart
      style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
      responsive
      data={playerData}
    >
      <CartesianGrid />
      <Line dataKey="placement" name="Placement" type="monotone" />
      <XAxis dataKey="date" />
      <YAxis
        dataKey="placement"
        domain={[1, 4]}
        reversed
        allowDecimals={false}
      />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};
