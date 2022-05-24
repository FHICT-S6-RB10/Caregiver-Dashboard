import { useEffect, useMemo } from "react";

const AlertButton = () => {

    return ( 
        <div className="alertButton">
            <span className="badge">{localStorage.getItem('number')}</span>
        </div>
     );
} 

export default AlertButton;