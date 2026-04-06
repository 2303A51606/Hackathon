import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { MOCK_SPENDING_TREND, MOCK_CATEGORY_SPEND } from '../constants';

export const SpendingBarChart = () => {
  return (
    <div className="w-full h-24 px-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={MOCK_SPENDING_TREND}>
          <Bar 
            dataKey="amount" 
            radius={[8, 8, 0, 0]}
          >
            {MOCK_SPENDING_TREND.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === MOCK_SPENDING_TREND.length - 1 ? '#006a6a' : index === MOCK_SPENDING_TREND.length - 2 ? '#000666' : '#e0e3e6'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SpendingLineChart = () => {
  return (
    <div className="w-full h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={MOCK_SPENDING_TREND}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6e8eb" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#454652', fontWeight: 600 }}
            dy={10}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
          />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#000666" 
            strokeWidth={4} 
            dot={{ r: 4, fill: '#000666', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, fill: '#006a6a' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CategoryPieChart = () => {
  return (
    <div className="w-32 h-32 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={MOCK_CATEGORY_SPEND}
            innerRadius={35}
            outerRadius={45}
            paddingAngle={5}
            dataKey="value"
          >
            {MOCK_CATEGORY_SPEND.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-headline font-extrabold text-lg text-primary">45%</span>
        <span className="font-sans text-[8px] text-on-surface-variant uppercase font-bold">Ent.</span>
      </div>
    </div>
  );
};
