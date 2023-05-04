import React from 'react';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export default function AreaChartComponent() {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart>
        <CartesianGrid />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Area />
      </AreaChart>
    </ResponsiveContainer>
  );
}
