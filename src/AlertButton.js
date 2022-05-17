import { useMemo } from "react";

const AlertButton = ({counter}) => {

    const constCounter = useMemo(() => {
        return counter 
    }, [counter]);

    return ( 
        <div className="alertButton">
            
            <span className="badge">{constCounter}</span>
        </div>
     );
}
 
export default AlertButton;