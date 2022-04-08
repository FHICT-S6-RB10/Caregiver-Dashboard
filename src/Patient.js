import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Chart from "./Chart";

const Patient = ({clients, stressData}) => {

    const { id } = useParams()

    return ( 

        <div className="patient-details">
            {
                clients.filter(client=> client.id === id)
                .map(client =>  
                    <div className="details" key={client.id}>
                        <h2>Patient {client.firstName} {client.lastName}</h2>
                        <p>Date of Birth: {client.birthdate.substring(0, 10)}</p>
                        <p>Email: {client.emailAddress}</p>
                    </div>
                    )
            }

            
        <Chart patientId={id}/>    
        </div>
        

     );
}
 
export default Patient;