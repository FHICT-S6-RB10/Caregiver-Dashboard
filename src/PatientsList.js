import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";

const PatientsList = ({ patients }) => {

    const [stressedPatients, setStressedPatients] = useState([])
    const [number, setNumber] = useState([])

    useEffect(()=>{
        getStressedPatients(24);
        if(stressedPatients.length >=0){
            setNumber(stressedPatients.length)
            console.log(stressedPatients.length)
            console.log(number)
            localStorage.setItem('number', (number.toString()));
        }
        else{
            handleClear();
        }
        
    },[])

    function handleClear(){
        localStorage.removeItem('number')
    }

    
    const getStressedPatients = async(value) => {
        await axios.get("https://localhost:5001/patients/stressed/"+value).then((res) => {
            setStressedPatients([...res.data])
        })
    }
    
    useEffect(() => { 
        
      },[number])

    return (         
        <div className="patients-list">
            {
                stressedPatients && stressedPatients.map((patient) => (
                    <div className="patients-preview attention" key={patient.patientId}>
                        <Link className="links" to={`/patient/${patient.patientId}`}>
                            <h2>Stressed Patient:</h2>
                            <h3>{ patient.firstName } { patient.lastName} - HRV: {patient.heartRateVariability} - Time: {patient.timestamp.substring(11, 16)}</h3>
                        </Link>
                    </div>
                ))
            }

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