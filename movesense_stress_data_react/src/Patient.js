import { useParams } from "react-router-dom";

const Patient = () => {

    const { id } = useParams()
    

    return ( 

        <div className="patient-details">
            <h2>Patient details - {id}</h2>
        
        </div>

     );
}
 
export default Patient;