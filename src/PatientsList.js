import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";

const PatientsList = ({ patients, stressedPatients }) => {

    const [stressedNotifications, setStressedNotifications] = useState([])

    useEffect(()=>{
        setStressedNotifications(stressedPatients);
        console.log(stressedPatients) 
    },[])

    const handleDelete = (id) =>{
    setStressedNotifications(stressedNotifications.filter((patient) => patient.patientId !== id))
};
    

    return (         
        <div className="notifications">
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

        </div>

     );
}
 
export default PatientsList;