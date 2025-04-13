import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter
  } from 'recharts';
  
  export default function LengthForWeightChart({ height, weight }: { height: number, weight: number }) {
    const lwData = [
      { weight: 2, median: 45, sd1: 46.5, sd2: 48, sd_1: 43.5, sd_2: 42 },
      { weight: 3, median: 49, sd1: 50.5, sd2: 52, sd_1: 47.5, sd_2: 46 },
      { weight: 4, median: 52, sd1: 53.5, sd2: 55, sd_1: 50.5, sd_2: 49 },
      { weight: 5, median: 55, sd1: 56.5, sd2: 58, sd_1: 53.5, sd_2: 52 },
      { weight: 6, median: 58, sd1: 59.5, sd2: 61, sd_1: 56.5, sd_2: 55 },
      { weight: 7, median: 61, sd1: 62.5, sd2: 64, sd_1: 59.5, sd_2: 58 },
      { weight: 8, median: 64, sd1: 65.5, sd2: 67, sd_1: 62.5, sd_2: 61 },
      { weight: 9, median: 67, sd1: 68.5, sd2: 70, sd_1: 65.5, sd_2: 64 },
      { weight: 10, median: 70, sd1: 71.5, sd2: 73, sd_1: 68.5, sd_2: 67 },
      { weight: 11, median: 73, sd1: 74.5, sd2: 76, sd_1: 71.5, sd_2: 70 },
      { weight: 12, median: 75, sd1: 76.5, sd2: 78, sd_1: 73.5, sd_2: 72 },
    ];
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lwData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="weight" label={{ value: 'น้ำหนัก (กก.)', position: 'insideBottomRight', offset: -5 }} />
          <YAxis domain={[40, 90]} ticks={[40, 50, 60, 70, 80, 90]} label={{ value: 'ความยาว (ซม.)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sd2" stroke="#8884d8" dot={false} name="+2 SD" />
          <Line type="monotone" dataKey="sd1" stroke="#82ca9d" dot={false} name="+1.5 SD" />
          <Line type="monotone" dataKey="median" stroke="#000" dot={false} name="ค่ากลาง (Median)" />
          <Line type="monotone" dataKey="sd_1" stroke="#82ca9d" dot={false} name="-1.5 SD" />
          <Line type="monotone" dataKey="sd_2" stroke="#8884d8" dot={false} name="-2 SD" />
          <Scatter 
            data={[{ x: weight, y: height }]}
            dataKey="y"
            fill="#ff0000"
            name="ค่าที่กรอก"
            shape="circle"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  