import logo from './logo.svg';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [ 
  {
    name: 'Monday',
    pv: 7500,
  },
  {
    name: 'Tuesday',
    pv: 1398,
  },
  {
    name: 'Wednesday',
    pv: 4300,
  },
  {
    name: 'Thursday',
    pv: 9800,
  },
  {
    name: 'Friday',
    pv: 3908,
  },
  {
    name: 'Saturday',
    pv: 4800,
  },
  {
    name: 'Sunday',
    pv: 3800,
  }
];

function App() {
  return (
    <ResponsiveContainer width="80%" aspect={3}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
  );
}

export default App;
