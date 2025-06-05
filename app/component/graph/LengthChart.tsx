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
import { ChartProps, LengthGrowth } from '@/app/interface';

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
  height: number | null;
}



const SdAreaLineChart: FC<ChartProps> = (props) => {
  const { gender,GrowthRecord } = props;
  const RealHeight:LengthGrowth[] = GrowthRecord.map(item => ({
    month: item.months,
    length: item.length
    
  }));
  

  const BoyData = [
    { month: 0, '-3SD': 44.2, '-2SD': 46.1, '0SD': 49.1, '+2SD': 52.2, '+3SD': 54.0 , full: 95 },
    { month: 1, '-3SD': 47.8, '-2SD': 49.8, '0SD': 53.7, '+2SD': 57.6, '+3SD': 59.5 , full: 95 },
    { month: 2, '-3SD': 50.3, '-2SD': 52.4, '0SD': 56.4, '+2SD': 60.6, '+3SD': 62.6 , full: 95 },
    { month: 3, '-3SD': 52.2, '-2SD': 54.4, '0SD': 58.4, '+2SD': 62.7, '+3SD': 64.7 , full: 95 },
    { month: 4, '-3SD': 53.7, '-2SD': 56.0, '0SD': 60.0, '+2SD': 64.4, '+3SD': 66.4 , full: 95 },
    { month: 5, '-3SD': 55.0, '-2SD': 57.3, '0SD': 61.4, '+2SD': 65.9, '+3SD': 67.9 , full: 95 },
    { month: 6, '-3SD': 56.1, '-2SD': 58.4, '0SD': 62.6, '+2SD': 67.3, '+3SD': 69.3 , full: 95 },
    { month: 7, '-3SD': 57.1, '-2SD': 59.4, '0SD': 63.7, '+2SD': 68.5, '+3SD': 70.6, full: 95 },
    { month: 8, '-3SD': 58.0, '-2SD': 60.3, '0SD': 64.7, '+2SD': 69.6, '+3SD': 71.7, full: 95 },
    { month: 9, '-3SD': 58.9, '-2SD': 61.2, '0SD': 65.6, '+2SD': 70.6, '+3SD': 72.8 , full: 95 },
    { month: 10, '-3SD': 59.6, '-2SD': 62.0, '0SD': 66.5, '+2SD': 71.6, '+3SD': 73.8 , full: 95 },
    { month: 11, '-3SD': 60.3, '-2SD': 62.7, '0SD': 67.3, '+2SD': 72.5, '+3SD': 74.7 , full: 95 },
    { month: 12, '-3SD': 60.9, '-2SD': 63.3, '0SD': 68.0, '+2SD': 73.3, '+3SD': 75.6 , full: 95 },
    { month: 13, '-3SD': 61.5, '-2SD': 63.9, '0SD': 68.7, '+2SD': 74.0, '+3SD': 76.4 , full: 95 },
    { month: 14, '-3SD': 62.0, '-2SD': 64.5, '0SD': 69.3, '+2SD': 74.7, '+3SD': 77.1 , full: 95 },
    { month: 15, '-3SD': 62.5, '-2SD': 65.0, '0SD': 69.9, '+2SD': 75.4, '+3SD': 77.8 , full: 95 },
    { month: 16, '-3SD': 63.0, '-2SD': 65.5, '0SD': 70.5, '+2SD': 76.0, '+3SD': 78.5 , full: 95 },
    { month: 17, '-3SD': 63.4, '-2SD': 66.0, '0SD': 71.0, '+2SD': 76.6, '+3SD': 79.1 , full: 95 },
    { month: 18, '-3SD': 63.9, '-2SD': 66.4, '0SD': 71.6, '+2SD': 77.2, '+3SD': 79.7 , full: 95 },
    { month: 19, '-3SD': 64.3, '-2SD': 66.9, '0SD': 72.1, '+2SD': 77.8, '+3SD': 80.3 , full: 95 },
    { month: 20, '-3SD': 64.7, '-2SD': 67.3, '0SD': 72.6, '+2SD': 78.3, '+3SD': 80.9 , full: 95 },
    { month: 21, '-3SD': 65.1, '-2SD': 67.7, '0SD': 73.1, '+2SD': 78.9, '+3SD': 81.4 , full: 95 },
    { month: 22, '-3SD': 65.5, '-2SD': 68.1, '0SD': 73.6, '+2SD': 79.4, '+3SD': 82.0 , full: 95 },
    { month: 23, '-3SD': 65.9, '-2SD': 68.5, '0SD': 74.0, '+2SD': 79.9, '+3SD': 82.5 , full: 95 },
    { month: 24, '-3SD': 66.3, '-2SD': 68.9, '0SD': 74.5, '+2SD': 80.4, '+3SD': 83.0 , full: 95 },
  ];
  const GirlData = [
    { month: 0, '-3SD': 44.2, '-2SD': 46.1, '0SD': 49.1, '+2SD': 52.2, '+3SD': 54.0 , full: 95 },
    { month: 1, '-3SD': 47.8, '-2SD': 49.8, '0SD': 53.7, '+2SD': 57.6, '+3SD': 59.5 , full: 95 },
    { month: 2, '-3SD': 50.3, '-2SD': 52.4, '0SD': 56.4, '+2SD': 60.6, '+3SD': 62.6 , full: 95 },
    { month: 3, '-3SD': 52.2, '-2SD': 54.4, '0SD': 58.4, '+2SD': 62.7, '+3SD': 64.7 , full: 95 },
    { month: 4, '-3SD': 53.7, '-2SD': 56.0, '0SD': 60.0, '+2SD': 64.4, '+3SD': 66.4 , full: 95 },
    { month: 5, '-3SD': 55.0, '-2SD': 57.3, '0SD': 61.4, '+2SD': 65.9, '+3SD': 67.9 , full: 95 },
    { month: 6, '-3SD': 56.1, '-2SD': 58.4, '0SD': 62.6, '+2SD': 67.3, '+3SD': 69.3 , full: 95 },
    { month: 7, '-3SD': 57.1, '-2SD': 59.4, '0SD': 63.7, '+2SD': 68.5, '+3SD': 70.6 , full: 95 },
    { month: 8, '-3SD': 58.0, '-2SD': 60.3, '0SD': 64.7, '+2SD': 69.6, '+3SD': 71.7 , full: 95 },
    { month: 9, '-3SD': 58.9, '-2SD': 61.2, '0SD': 65.6, '+2SD': 70.6, '+3SD': 72.8 , full: 95 },
    { month: 10, '-3SD': 59.6, '-2SD': 62.0, '0SD': 66.5, '+2SD': 71.6, '+3SD': 73.8 , full: 95 },
    { month: 11, '-3SD': 60.3, '-2SD': 62.7, '0SD': 67.3, '+2SD': 72.5, '+3SD': 74.7 , full: 95 },
    { month: 12, '-3SD': 60.9, '-2SD': 63.3, '0SD': 68.0, '+2SD': 73.3, '+3SD': 75.6 , full: 95 },
    { month: 13, '-3SD': 61.5, '-2SD': 63.9, '0SD': 68.7, '+2SD': 74.0, '+3SD': 76.4 , full: 95 },
    { month: 14, '-3SD': 62.0, '-2SD': 64.5, '0SD': 69.3, '+2SD': 74.7, '+3SD': 77.1 , full: 95 },
    { month: 15, '-3SD': 62.5, '-2SD': 65.0, '0SD': 69.9, '+2SD': 75.4, '+3SD': 77.8 , full: 95 },
    { month: 16, '-3SD': 63.0, '-2SD': 65.5, '0SD': 70.5, '+2SD': 76.0, '+3SD': 78.5 , full: 95 },
    { month: 17, '-3SD': 63.4, '-2SD': 66.0, '0SD': 71.0, '+2SD': 76.6, '+3SD': 79.1 , full: 95 },
    { month: 18, '-3SD': 63.9, '-2SD': 66.4, '0SD': 71.6, '+2SD': 77.2, '+3SD': 79.7 , full: 95 },
    { month: 19, '-3SD': 64.3, '-2SD': 66.9, '0SD': 72.1, '+2SD': 77.8, '+3SD': 80.3 , full: 95 },
    { month: 20, '-3SD': 64.7, '-2SD': 67.3, '0SD': 72.6, '+2SD': 78.3, '+3SD': 80.9 , full: 95 },
    { month: 21, '-3SD': 65.1, '-2SD': 67.7, '0SD': 73.1, '+2SD': 78.9, '+3SD': 81.4 , full: 95 },
    { month: 22, '-3SD': 65.5, '-2SD': 68.1, '0SD': 73.6, '+2SD': 79.4, '+3SD': 82.0 , full: 95 },
    { month: 23, '-3SD': 65.9, '-2SD': 68.5, '0SD': 74.0, '+2SD': 79.9, '+3SD': 82.5  ,full: 95 },
    { month: 24, '-3SD': 66.3, '-2SD': 68.9, '0SD': 74.5, '+2SD': 80.4, '+3SD': 83.0 , full: 95 },
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
      height: RealHeight.find((r) => r.month === d.month)?.length ?? null,
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
      height: RealHeight.find((r) => r.month === d.month)?.length ?? null,
    }));
  }

 
  



  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer className="w-[400px] max-xl:w-full" height={500}>
        <ComposedChart data={processedData} margin={{ top: 20, right: 30, left: 30, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
          <YAxis ticks={[0, 5,10,15,20,25,30,35,40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]} domain={[40,95 ]} allowDataOverflow />

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
          <Line dataKey="height" stroke="#dc143c" strokeWidth={2} dot={{ r: 2 }} />

           
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SdAreaLineChart;
