"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type PriceHistoryEntry = {
  date: string;
  price: number;
};

type Props = {
  history: PriceHistoryEntry[];
};

export const PriceChart = ({ history }: Props) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="font-bold text-sm mb-2">価格推移グラフ</h2>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
