import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import AlertButton from "./AlertButton";

const PatientsList = ({ patients, stressedPatients }) => {

    const [stressedNotifications, setStressedNotifications] = useState([])
    var newNumber = 0

    useEffect(()=>{ 
        setStressedNotifications(stressedPatients)
        console.log(stressedPatients)  
        localStorage.setItem('number', stressedPatients.length.toString()) 
        console.log(localStorage.getItem('number'))
    },[])

    const handleDelete = (id) =>{
    setStressedNotifications(stressedNotifications.filter((patient) => patient.patientId !== id))
    newNumber = parseInt(localStorage.getItem('number'), 10) - 1
    console.log(newNumber)
    localStorage.setItem('number', newNumber.toString())
    }
    
 
    return (         
        <div className="notifications">
            {console.log(stressedNotifications)}
            {
                stressedNotifications && stressedNotifications.map((patient) => (
                    <div className="notifications attention" key={patient.patientId}> 
                        <button className="deleteButton" onClick={() => handleDelete(patient.patientId)}></button>
                        <Link className="links" to={`/patient/${patient.patientId}`}>
                            <h2>Stressed Patient:</h2>
                            <h3>{ patient.firstName } { patient.lastName} - HRV: {patient.heartRateVariability} - Time: {patient.timestamp.substring(11, 16)}</h3>
                        </Link>
                    </div>
                ))
            }

            {patients && patients.map((patient) => (
                <div className="notifications normal" key={patient.id}> 
                    <Link className="links" to={`/patient/${patient.id}`}>
                    <h2>New Patient Has Been Added:</h2>
                    <h3>{ patient.firstName } { patient.lastName}</h3>
                    </Link>
                </div>
            ))}
        <AlertButton/>
        </div>

     );
}
 
export default PatientsList;