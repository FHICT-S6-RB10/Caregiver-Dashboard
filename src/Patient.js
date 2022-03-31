import { useParams } from "react-router-dom";

const Patient = ({clients}) => {

    const { id } = useParams()
    
    
    

    return ( 

        <div className="patient-details">
            {
                clients.filter(client=> client.id === id)
                .map(client => 
                    <div className="details" key={client.id}>
                        <h2>Patient details: {client.firstName}</h2>
                        <p>First name: {client.firstName}</p>
                        {/* <p>Last name Prefix: {client.lastNamePrefix}</p> */}
                        <p>Last name: {client.lastName}</p>
                        <p>Date of Birth: {client.birthdate}</p>
                        <p>Email: {client.emailAddress}</p>
                    </div>
                    )
            }
            
        </div>

     );
}
 
export default Patient;