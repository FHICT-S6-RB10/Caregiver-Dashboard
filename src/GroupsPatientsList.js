import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";

const GroupsPatientsList = ({ patients }) => {

    return (         
        <div className="patients-list">
            {patients && patients.map((patient) => (
                <div className="dd-list" key={patient.id}>
                    <Link className="links" to={`/patient/${patient.id}`}>
                    <h3>{ patient.firstName } { patient.lastName}</h3>
                    </Link>
                </div>
            ))}
        </div>
     );
}
 
export default GroupsPatientsList;