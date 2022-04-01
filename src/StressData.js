import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const StressData = ({stressData}) => {

    const { id } = useParams()



    return ( 

        <div className="patient-details">
            {
                stressData.slice(0,5)
                .map(stress => 
                    <div className="details">
                        {console.log({stress})}
                        <h2>Stress Value: {stress.id}</h2>
                        <p>Timestamp: {stress.timeStamp}</p>
                        {console.log(stress.id)}
                    </div>
                    )
            }
            
        </div>

     );
}
 
export default StressData;