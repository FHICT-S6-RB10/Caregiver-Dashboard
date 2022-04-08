import './App.scss';
import useFetch from './useFetch';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { format } from 'date-fns-tz';


const App = ({patientId}) => {

  const { data:patientStressData } = useFetch("https://localhost:44350/stressmeasurements/patient/"+patientId);

  var testData = [];
  patientStressData.forEach(stressData =>{
      var date = new Date(stressData.timeStamp.substring(0, 19));
      var day = date.getDay();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();

      var datapoint = {
        stressValue: stressData.stressValue,
        timeStamp: hours.toString()+":"+minutes.toString()
      }

      testData.push(datapoint);
  });
  console.log(testData);
  
  
  return (

    <div className="responsiveContainerDiv">
    <ResponsiveContainer width="85%" aspect={3}>
      
        <LineChart
          width={500}
          height={300}
          data={testData}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeStamp">
                  <Label value="Time" offset={0} position="insideBottom"/>
              </XAxis>
              <YAxis label={{ value: 'Stress Level', angle: -90, position: 'insideLeft' }}/>
              <Tooltip />
              <Line type="monotone" dataKey="stressValue" stroke="#8884d8" fill="#8884d8" fillOpacity={1} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      </div>
  );
}

export default App;
