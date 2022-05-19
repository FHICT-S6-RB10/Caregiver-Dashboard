import { useEffect, useMemo } from "react";

const AlertButton = ({counter}) => {

    useEffect(() => {
        localStorage.setItem('counter', counter);
    }, [counter])

    const constCounter = useMemo(() => {
        return counter 
    }, [counter]); 

    return ( 
        <div className="alertButton">
            
            <span className="badge">{localStorage.getItem('counter')}</span>
        </div>
     );
}
 
export default AlertButton;