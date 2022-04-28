import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";

const PatientsList = ({ patients }) => {
    //We can also write (props) and its going to work the same way, but giving all props 
    //
    var testData = [];
    var testPatientsIds =[];
    const [patientId,setPatientId] = useState([])
    const [patientsIds,setPatientsIds] = useState([])
    const [data, setData] = useState([])
    const [idData, setIdData] = useState([])
    const [patientStressData, setPatientStressData] = useState([])
    useEffect(()=>{
        patients.forEach(patient =>{ 
            var patientId = patient.id
            setPatientsIds(patientId)
            testPatientsIds.push(patientId)
        });
        setPatientsIds(testPatientsIds)
        },[patients])
    
    useEffect(()=>{
        if(patientsIds.length > 0){
            patientsIds.forEach(id => {
                //attach id to a new variable
            getPatientStressData(id)
            // for each again to get the HRV and timestamp
        });
        console.log(patientsIds)  
            }
        },[patientsIds])

    const getPatientStressData = async (id) => {
        await axios.get("https://localhost:44350/heartratevariabilitymeasurements/patient/"+id).then((res)=>{
           setPatientStressData([...res.data])
           patientStressData.forEach(patientStressData => {
            var datapoint = {
                patientId: id, 
                stressValue: patientStressData.heartRateVariability,
                timeStamp: patientStressData.timeStamp,
            }
            console.log(datapoint)
         })
         })
       }
       
       useEffect(()=>{
        if(patientStressData.length> 0){
          // console.log(patientStressData)
            if (patientStressData.heartRateVariability > 60) {

           // console.log(patientStressData.heartRateVariability.toString())
            // create a pop up with patient name and default msg?
            // Patient name<id> is very stressed and requires attention!
            }
        }
      },[patientStressData])

    return ( 

        <div className="patients-list">
            
            {/* {
                1. get patient stress lvl - map patient id to their stress lvl
                2. check if stress lvl is above ~78
                3. generate a pop up if true
                4. change background color of alert btn
            } */}

            {patients && patients.slice(0, 8).map((patient) => (
                <div className="patients-preview" key={patient.id}>
                    <Link className="links" to={`/patient/${patient.id}`}>
                    <h2>New Patient Has Been Added:</h2>
                    <h3>{ patient.firstName } { patient.lastName}</h3>
                    
                    </Link>
                </div>
            ))}

        </div>

     );
}
 
export default PatientsList;