import { useParams } from "react-router-dom";
//import useFetch from "./useFetch";
import Chart from "./Chart";
import { useState, useEffect } from "react";
import axios from "axios";

const Patient = () => {

    const { id } = useParams()

    const [patients, setPatients] = useState([])

    useEffect(()=>{
        getPatients()
    },[])

    const getPatients = async () =>{
        await axios.get("https://localhost:5031/patients").then((res)=>{
           setPatients([...res.data])
         })
    }

    return ( 

        <div className="patient-details">
            {
                patients.filter(patient => patient.id === id)
                .map(patient => 
                    <div className="details" key={patient.id}>
                        <h2>Patient {patient.firstName} {patient.lastName}</h2>
                        <p>Date of Birth: {patient.birthdate.substring(0, 10)}</p>
                    </div>
                )
            }

            
        <Chart patientId={id}/>    
        </div>
        

     );
}
 
export default Patient;