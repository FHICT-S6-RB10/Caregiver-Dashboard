import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import AlertButton from "./AlertButton";
import Navbar from "./Navbar";

const PatientsList = ({ patients }) => {
    //We can also write (props) and its going to work the same way, but giving all props 
    //
    var testData = [];
    var testStressedPatient = [];
    var normalizedStressPatientList = [];
    var testPatientsIds =[];
    const [patientsIds, setPatientsIds] = useState([])
    const [allStressedPatients, setAllStressedPatients] = useState([])
    const [stressdataPerPatient, setStressdataPerPatient] = useState([])
    const [patientStressData, setPatientStressData] = useState([])
    useEffect(()=>{
        patients.forEach(patient =>{ 
            var patientId = patient.id
            testPatientsIds.push(patientId)
        });
        setPatientsIds(testPatientsIds)
        console.log("setting Patient Ids")
        console.log(testPatientsIds)
        },[])
    
    useEffect(()=>{
        console.log(patientsIds)
        console.log("patients Ids checking")
        if(patientsIds.length > 0){
            patientsIds.forEach(id => {
                //attach id to a new variable
            getPatientStressData(id)
            // for each again to get the HRV and timestamp
        });
        console.log(stressdataPerPatient);
        if(stressdataPerPatient.length > 0){
            console.log("Successfully")
            stressdataPerPatient.forEach(patient => {
                if (patient.stressValue > 88) {
                    console.log(patient.stressValue + "- stress" + patient.patientId + "- id ")
                    var stressedPatient = {
                        id: patient.patientId,
                        stressValue: patient.stressValue,
                        timeStamp: patient.timeStamp
                }
                testStressedPatient.push(stressedPatient)
            }
        })
        console.log(testStressedPatient)
        normalizedStressPatientList = getUnique(testStressedPatient, 'id')
        setAllStressedPatients(normalizedStressPatientList) 
        } 
        console.log(stressdataPerPatient)
        }
        },[])

        function getUnique(arr, index) {

            const unique = arr
                 .map(e => e[index])
          
                 // store the keys of the unique objects
                 .map((e, i, final) => final.indexOf(e) === i && i)
          
                 // eliminate the dead keys & store unique objects
                .filter(e => arr[e]).map(e => arr[e]);      
          
             return unique;
          }

    const getPatientStressData = async (id) => {
        await axios.get("https://localhost:44350/heartratevariabilitymeasurements/patient/"+id).then((res)=>{
           setPatientStressData([...res.data])
           patientStressData.forEach(patientStressData => {
            var datapoint = {
                patientId: id,
                stressValue: patientStressData.heartRateVariability,
                timeStamp: patientStressData.timeStamp 
            }
            testData.push(datapoint)
         })
         console.log("Logging testData")
         console.log(testData)
         setStressdataPerPatient(testData) 
         })
       }

    return ( 

        <div className="patients-list">
            <Navbar notificationsCounter={allStressedPatients.length}/> 
            {
                console.log(allStressedPatients)
            }
            {allStressedPatients && allStressedPatients.map((stressedPatient) => (
                <div className="patients-preview attention" >
                    
                    {
                        patients && patients.filter(patient => patient.id === stressedPatient.id).map((patient) => (
                            <Link className="links" to={`/patient/${stressedPatient.id}`}>
                                <h2>High Stress Alert</h2>
                                <Link className="links" to={`/patient/${patient.id}`}>
                                    <h3>{patient.firstName} { patient.lastName } { stressedPatient.stressValue}</h3>
                                </Link>
                            </Link>  
                        ))
                    }
                    
                </div>
            ))}

            {patients && patients.slice(0, 2).map((patient) => (
                <div className="patients-preview normal" key={patient.id}>
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