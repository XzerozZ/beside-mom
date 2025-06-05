import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

import { FC } from "react";
import { WeightGrowth } from "@/app/interface";
import { ChartProps } from "@/app/interface";

const SdAreaLineChart: FC<ChartProps> = (props) => {
  const { GrowthRecord } = props;

  const RealWeight: WeightGrowth[] = GrowthRecord.map((item) => ({
    month: item.months,
    weight: item.weight,
  }));
 

  // Preprocess the data

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer className="w-[400px] max-xl:w-full" height={500}>
        <ComposedChart
          data={RealWeight}
          margin={{ top: 20, right: 40, left: 30, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="weight"
            label={{
              value: "Weight (kg)",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            label={{ value: "Length (cm)", angle: -90 }}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}
          />
          <Line
            dataKey="length"
            stroke="#dc143c"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SdAreaLineChart;
