import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Patient = ({clients, stressData}) => {

    const { id } = useParams()



    return ( 

        <div className="patient-details">
            {
                clients.filter(client=> client.id === id)
                .map(client => 
                    <div className="details" key={client.id}>
                        <h2>Patient details: {client.firstName}</h2>
                        <p>First name: {client.firstName}</p>
                        <p>Last name: {client.lastName}</p>
                        <p>Date of Birth: {client.birthdate}</p>
                        <p>Email: {client.emailAddress}</p>
                    </div>
                    )
            }
            
            {
                stressData.slice(0, 1)
                .map(stress => 
                    <div className="details" key={stress.id}>
                        <h2>Stress Value: {stress.stressValue}</h2>
                        <p>Timestamp: {stress.timeStamp}</p>
                    </div>
                    )
            }
            
        </div>

     );
}
 
export default Patient;