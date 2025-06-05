import {
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';

import { FC } from 'react';
import { WeightGrowth } from '@/app/interface';
import { ChartProps } from '@/app/interface';

// Type for each data point in the standard deviation chart
interface ChartDataPoint {
  month: number;
  '-3SD': number;
  '-2SD': number;
  '0SD': number;
  '+2SD': number;
  '+3SD': number;
  full: number;
  band1: number;
  band2: number;
  band3: number;
  band4: number;
  weight: number | null;
}





const SdAreaLineChart: FC<ChartProps> = (props) => {
  const { gender,GrowthRecord } = props;

  const RealWeight: WeightGrowth[] = GrowthRecord.map(item => ({
    month: item.months,
    weight: item.weight
  }));


  const BoyData = [
    { month: 0, '-3SD': 2.0, '-2SD': 2.4, '0SD': 3.2, '+2SD': 4.2, '+3SD': 4.7, full: 16.0 },
    { month: 1, '-3SD': 2.7, '-2SD': 3.2, '0SD': 4.2, '+2SD': 5.4, '+3SD': 6.1, full: 16.0 },
    { month: 2, '-3SD': 3.5, '-2SD': 4.0, '0SD': 5.1, '+2SD': 6.4, '+3SD': 7.2, full: 16.0 },
    { month: 3, '-3SD': 4.1, '-2SD': 4.7, '0SD': 5.8, '+2SD': 7.2, '+3SD': 8.0, full: 16.0 },
    { month: 4, '-3SD': 4.5, '-2SD': 5.1, '0SD': 6.3, '+2SD': 7.7, '+3SD': 8.6, full: 16.0 },
    { month: 5, '-3SD': 4.9, '-2SD': 5.5, '0SD': 6.7, '+2SD': 8.2, '+3SD': 9.1, full: 16.0 },
    { month: 6, '-3SD': 5.2, '-2SD': 5.8, '0SD': 7.3, '+2SD': 8.8, '+3SD': 9.7, full: 16.0 },
    { month: 7, '-3SD': 5.5, '-2SD': 6.1, '0SD': 7.6, '+2SD': 9.2, '+3SD': 10.1, full: 16.0 },
    { month: 8, '-3SD': 5.7, '-2SD': 6.3, '0SD': 7.9, '+2SD': 9.5, '+3SD': 10.4, full: 16.0 },
    { month: 9, '-3SD': 5.9, '-2SD': 6.5, '0SD': 8.2, '+2SD': 9.8, '+3SD': 10.7, full: 16.0 },
    { month: 10, '-3SD': 6.1, '-2SD': 6.7, '0SD': 8.4, '+2SD': 10.0, '+3SD': 11.0, full: 16.0 },
    { month: 11, '-3SD': 6.3, '-2SD': 6.9, '0SD': 8.6, '+2SD': 10.3, '+3SD': 11.2, full: 16.0 },
    { month: 12, '-3SD': 6.4, '-2SD': 7.0, '0SD': 8.9, '+2SD': 10.5, '+3SD': 11.4, full: 16.0 },
    { month: 13, '-3SD': 6.6, '-2SD': 7.2, '0SD': 9.1, '+2SD': 10.7, '+3SD': 11.6, full: 16.0 },
    { month: 14, '-3SD': 6.7, '-2SD': 7.3, '0SD': 9.3, '+2SD': 10.9, '+3SD': 11.8, full: 16.0 },
    { month: 15, '-3SD': 6.9, '-2SD': 7.5, '0SD': 9.5, '+2SD': 11.1, '+3SD': 12.0, full: 16.0 },
    { month: 16, '-3SD': 7.0, '-2SD': 7.6, '0SD': 9.6, '+2SD': 11.3, '+3SD': 12.2, full: 16.0 },
    { month: 17, '-3SD': 7.1, '-2SD': 7.7, '0SD': 9.8, '+2SD': 11.5, '+3SD': 12.4, full: 16.0 },
    { month: 18, '-3SD': 7.3, '-2SD': 7.9, '0SD': 10.0, '+2SD': 11.7, '+3SD': 12.6, full: 16.0 },
    { month: 19, '-3SD': 7.4, '-2SD': 8.0, '0SD': 10.2, '+2SD': 11.9, '+3SD': 12.8, full: 16.0 },
    { month: 20, '-3SD': 7.5, '-2SD': 8.1, '0SD': 10.3, '+2SD': 12.0, '+3SD': 13.0, full: 16.0 },
    { month: 21, '-3SD': 7.6, '-2SD': 8.2, '0SD': 10.5, '+2SD': 12.2, '+3SD': 13.2, full: 16.0 },
    { month: 22, '-3SD': 7.7, '-2SD': 8.3, '0SD': 10.6, '+2SD': 12.4, '+3SD': 13.3, full: 16.0 },
    { month: 23, '-3SD': 7.8, '-2SD': 8.4, '0SD': 10.8, '+2SD': 12.5, '+3SD': 13.5, full: 16.0 },
    { month: 24, '-3SD': 7.9, '-2SD': 8.5, '0SD': 11.0, '+2SD': 12.7, '+3SD': 13.7, full: 16.0 },
  ];
  const GirlData = [
    { month: 0, '-3SD': 2.0, '-2SD': 2.4, '0SD': 3.2, '+2SD': 4.2, '+3SD': 4.7, full: 16.0 },
    { month: 1, '-3SD': 2.7, '-2SD': 3.2, '0SD': 4.2, '+2SD': 5.4, '+3SD': 6.1, full: 16.0 },
    { month: 2, '-3SD': 3.5, '-2SD': 4.0, '0SD': 5.1, '+2SD': 6.4, '+3SD': 7.2, full: 16.0 },
    { month: 3, '-3SD': 4.1, '-2SD': 4.7, '0SD': 5.8, '+2SD': 7.2, '+3SD': 8.0, full: 16.0 },
    { month: 4, '-3SD': 4.5, '-2SD': 5.1, '0SD': 6.3, '+2SD': 7.7, '+3SD': 8.6, full: 16.0 },
    { month: 5, '-3SD': 4.9, '-2SD': 5.5, '0SD': 6.7, '+2SD': 8.2, '+3SD': 9.1, full: 16.0 },
    { month: 6, '-3SD': 5.2, '-2SD': 5.8, '0SD': 7.3, '+2SD': 8.8, '+3SD': 9.7, full: 16.0 },
    { month: 7, '-3SD': 5.5, '-2SD': 6.1, '0SD': 7.6, '+2SD': 9.2, '+3SD': 10.1, full: 16.0 },
    { month: 8, '-3SD': 5.7, '-2SD': 6.3, '0SD': 7.9, '+2SD': 9.5, '+3SD': 10.4, full: 16.0 },
    { month: 9, '-3SD': 5.9, '-2SD': 6.5, '0SD': 8.2, '+2SD': 9.8, '+3SD': 10.7, full: 16.0 },
    { month: 10, '-3SD': 6.1, '-2SD': 6.7, '0SD': 8.4, '+2SD': 10.0, '+3SD': 11.0, full: 16.0 },
    { month: 11, '-3SD': 6.3, '-2SD': 6.9, '0SD': 8.6, '+2SD': 10.3, '+3SD': 11.2, full: 16.0 },
    { month: 12, '-3SD': 6.4, '-2SD': 7.0, '0SD': 8.9, '+2SD': 10.5, '+3SD': 11.4, full: 16.0 },
    { month: 13, '-3SD': 6.6, '-2SD': 7.2, '0SD': 9.1, '+2SD': 10.7, '+3SD': 11.6, full: 16.0 },
    { month: 14, '-3SD': 6.7, '-2SD': 7.3, '0SD': 9.3, '+2SD': 10.9, '+3SD': 11.8, full: 16.0 },
    { month: 15, '-3SD': 6.9, '-2SD': 7.5, '0SD': 9.5, '+2SD': 11.1, '+3SD': 12.0, full: 16.0 },
    { month: 16, '-3SD': 7.0, '-2SD': 7.6, '0SD': 9.6, '+2SD': 11.3, '+3SD': 12.2, full: 16.0 },
    { month: 17, '-3SD': 7.1, '-2SD': 7.7, '0SD': 9.8, '+2SD': 11.5, '+3SD': 12.4, full: 16.0 },
    { month: 18, '-3SD': 7.3, '-2SD': 7.9, '0SD': 10.0, '+2SD': 11.7, '+3SD': 12.6, full: 16.0 },
    { month: 19, '-3SD': 7.4, '-2SD': 8.0, '0SD': 10.2, '+2SD': 11.9, '+3SD': 12.8, full: 16.0 },
    { month: 20, '-3SD': 7.5, '-2SD': 8.1, '0SD': 10.3, '+2SD': 12.0, '+3SD': 13.0, full: 16.0 },
    { month: 21, '-3SD': 7.6, '-2SD': 8.2, '0SD': 10.5, '+2SD': 12.2, '+3SD': 13.2, full: 16.0 },
    { month: 22, '-3SD': 7.7, '-2SD': 8.3, '0SD': 10.6, '+2SD': 12.4, '+3SD': 13.3, full: 16.0 },
    { month: 23, '-3SD': 7.8, '-2SD': 8.4, '0SD': 10.8, '+2SD': 12.5, '+3SD': 13.5, full: 16.0 },
    { month: 24, '-3SD': 7.9, '-2SD': 8.5, '0SD': 11.0, '+2SD': 12.7, '+3SD': 13.7, full: 16.0 },
  ];
  // Preprocess the data
  let processedData: ChartDataPoint[] = [];

  if (gender === 'ชาย') {
    processedData = BoyData.map((d) => ({
      month: d.month,
      '-3SD': d['-3SD'],
      '-2SD': d['-2SD'],
      '0SD': d['0SD'],
      '+2SD': d['+2SD'],
      '+3SD': d['+3SD'],
      full: d.full - d['+3SD'],
      band1: d['-3SD'],
      band2: d['-2SD'] - d['-3SD'],
      band3: d['+2SD'] - d['-2SD'],
      band4: d['+3SD'] - d['+2SD'],
      weight: RealWeight.find((r) => r.month === d.month)?.weight ?? null,
    }));
  } else if (gender === 'หญิง') {
    processedData = GirlData.map((d) => ({
      month: d.month,
      '-3SD': d['-3SD'],
      '-2SD': d['-2SD'],
      '0SD': d['0SD'],
      '+2SD': d['+2SD'],
      '+3SD': d['+3SD'],
      full: d.full - d['+3SD'],
      band1: d['-3SD'],
      band2: d['-2SD'] - d['-3SD'],
      band3: d['+2SD'] - d['-2SD'],
      band4: d['+3SD'] - d['+2SD'],
      weight: RealWeight.find((r) => r.month === d.month)?.weight ?? null,
    }));
  }

 
  



  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer className="w-[400px] max-xl:w-full" height={550}>
        <ComposedChart data={processedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Weight (kg)', angle: -90 }} ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16]} />
        

          <Area dataKey="band1" stackId="1" stroke="none" fill="#FE8014"  />
          <Area dataKey="band2" stackId="1" stroke="none" fill="#9AD595"  />
          <Area dataKey="band3" stackId="1" stroke="none" fill="#66BD6D"  />
          <Area dataKey="band4" stackId="1" stroke="none" fill="#1B9850"  />
          <Area dataKey="full" stackId="1" stroke="none" fill="#fff"  />

          {/* <Line dataKey="-3SD" stroke="#6a5acd" dot={false} />
          <Line dataKey="-2SD" stroke="#3cb371" dot={false} />
          <Line dataKey="0SD" stroke="#696969" strokeWidth={2} dot={false} />
          <Line dataKey="+2SD" stroke="#ffa500" dot={false} />
          <Line dataKey="+3SD" stroke="#ff4500" dot={false} /> */}
          <Line dataKey="weight" stroke="#dc143c" strokeWidth={2} dot={{ r: 2 }} />

           
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SdAreaLineChart;
