
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
const data = [
  { month: 0, '-3SD': 2.0, '-2SD': 2.4, '0SD': 3.2, '+2SD': 4.2, '+3SD': 4.7 },
  { month: 1, '-3SD': 2.7, '-2SD': 3.2, '0SD': 4.2, '+2SD': 5.4, '+3SD': 6.1 },
  { month: 2, '-3SD': 3.5, '-2SD': 4.0, '0SD': 5.1, '+2SD': 6.4, '+3SD': 7.2 },
  { month: 3, '-3SD': 4.1, '-2SD': 4.7, '0SD': 5.8, '+2SD': 7.2, '+3SD': 8.0 },
  { month: 4, '-3SD': 4.5, '-2SD': 5.1, '0SD': 6.3, '+2SD': 7.7, '+3SD': 8.6 },
  { month: 5, '-3SD': 4.9, '-2SD': 5.5, '0SD': 6.7, '+2SD': 8.2, '+3SD': 9.1 },
  { month: 6, '-3SD': 5.2, '-2SD': 5.8, '0SD': 7.3, '+2SD': 8.8, '+3SD': 9.7 },
  { month: 7, '-3SD': 5.5, '-2SD': 6.1, '0SD': 7.6, '+2SD': 9.2, '+3SD': 10.1 },
  { month: 8, '-3SD': 5.7, '-2SD': 6.3, '0SD': 7.9, '+2SD': 9.5, '+3SD': 10.4 },
  { month: 9, '-3SD': 5.9, '-2SD': 6.5, '0SD': 8.2, '+2SD': 9.8, '+3SD': 10.7 },
  { month: 10, '-3SD': 6.1, '-2SD': 6.7, '0SD': 8.4, '+2SD': 10.0, '+3SD': 11.0 },
  { month: 11, '-3SD': 6.3, '-2SD': 6.9, '0SD': 8.6, '+2SD': 10.3, '+3SD': 11.2 },
  { month: 12, '-3SD': 6.4, '-2SD': 7.0, '0SD': 8.9, '+2SD': 10.5, '+3SD': 11.4 },
  { month: 13, '-3SD': 6.6, '-2SD': 7.2, '0SD': 9.1, '+2SD': 10.7, '+3SD': 11.6 },
  { month: 14, '-3SD': 6.7, '-2SD': 7.3, '0SD': 9.3, '+2SD': 10.9, '+3SD': 11.8 },
  { month: 15, '-3SD': 6.9, '-2SD': 7.5, '0SD': 9.5, '+2SD': 11.1, '+3SD': 12.0 },
  { month: 16, '-3SD': 7.0, '-2SD': 7.6, '0SD': 9.6, '+2SD': 11.3, '+3SD': 12.2 },
  { month: 17, '-3SD': 7.1, '-2SD': 7.7, '0SD': 9.8, '+2SD': 11.5, '+3SD': 12.4 },
  { month: 18, '-3SD': 7.3, '-2SD': 7.9, '0SD': 10.0, '+2SD': 11.7, '+3SD': 12.6 },
  { month: 19, '-3SD': 7.4, '-2SD': 8.0, '0SD': 10.2, '+2SD': 11.9, '+3SD': 12.8 },
  { month: 20, '-3SD': 7.5, '-2SD': 8.1, '0SD': 10.3, '+2SD': 12.0, '+3SD': 13.0 },
  { month: 21, '-3SD': 7.6, '-2SD': 8.2, '0SD': 10.5, '+2SD': 12.2, '+3SD': 13.2 },
  { month: 22, '-3SD': 7.7, '-2SD': 8.3, '0SD': 10.6, '+2SD': 12.4, '+3SD': 13.3 },
  { month: 23, '-3SD': 7.8, '-2SD': 8.4, '0SD': 10.8, '+2SD': 12.5, '+3SD': 13.5 },
  { month: 24, '-3SD': 7.9, '-2SD': 8.5, '0SD': 11.0, '+2SD': 12.7, '+3SD': 13.7 }
];

// Create bands between SD lines
const processedData = data.map((d) => ({
  month: d.month,
  band1:  d['-3SD'],
  band2: d['-2SD'] - d['-3SD'],
  band3: d['+2SD'] - d['-2SD'],
  band4: d['+3SD'] - d['+2SD'],
  
}));

export default function SdAreaLineChart() {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <AreaChart data={processedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: 'Weight (kg)', angle: -90 }} ticks={[0,2,4,6,8,10,12,14]}/>
        <Tooltip />
        <Legend />

        {/* Gradient bands */}
        <Area type="monotone" dataKey="band1" stackId="1" stroke="none" fill="#8884d8" />
        <Area type="monotone" dataKey="band2" stackId="1" stroke="none" fill="#82ca9d" />
        <Area type="monotone" dataKey="band3" stackId="1" stroke="none" fill="#000000" />
        <Area type="monotone" dataKey="band4" stackId="1" stroke="none" fill="#ffc658" />

        {/* SD Lines on top */}
        <Line type="monotone" dataKey="-3SD" stroke="red" dot={false} />
        <Line type="monotone" dataKey="-2SD" stroke="#82ca9d" dot={false} />
        <Line type="monotone" dataKey="0SD" stroke="#Ff0000" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="+2SD" stroke="#ffc658" dot={false} />
        <Line type="monotone" dataKey="+3SD" stroke="#ff7300" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
