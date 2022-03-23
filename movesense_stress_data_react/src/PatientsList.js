import { Link } from "react-router-dom";

const PatientsList = ({ clients }) => {
    //We can also write (props) and its going to work the same way, but giving all props 
    //
    

    return ( 

        <div className="patients-list">

            {console.log(clients)}
            {clients.map((client) => (
                <div className="patients-preview" key={client.id}>
                    <Link to={`/patient/${client.id}`}>
                    <h2>New Patient Has Been Added: { client.firstName } { client.lastName} | Group: {client.group}</h2>
                    </Link>
                </div>
            ))}

        </div>

     );
}
 
export default PatientsList;