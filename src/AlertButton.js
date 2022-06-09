import { useState, useEffect, useMemo } from "react";

const AlertButton = () => {
      
    const [count, setCount] = useState([])

    useEffect(()=>{
        console.log(localStorage.getItem('number'))
        setCount(localStorage.getItem('number'))
        console.log(count)
    },[localStorage.getItem('number')])

    return ( 
        <div className="alertButton">
            <span className="badge">{count}</span> 
        </div>
     );
} 

export default AlertButton;