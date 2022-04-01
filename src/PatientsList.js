import { Link } from "react-router-dom";

const PatientsList = ({ clients }) => {
    //We can also write (props) and its going to work the same way, but giving all props 
    //
    

    return ( 

        <div className="patients-list">
            
            {clients && clients.slice(0, 10).map((client) => (
                <div className="patients-preview" key={client.id}>
                    <Link className="links" to={`/patient/${client.id}`}>
                    <h2>New Patient Has Been Added: 
                        <span>{ client.firstName } { client.lastName}</span>
                    </h2>
                    </Link>
                </div>
            ))}

        </div>

     );
}
 
export default PatientsList;