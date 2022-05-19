import { useEffect, useMemo } from "react";

const AlertButton = () => {
    //console.log(localStorage.getItem('number'))

    // useEffect(() => {
    //     sessionStorage.setItem('counter', JSON.stringify(counter));
    //     if(counter) {
    //         sessionStorage.setItem('counter', counter);
    //       }
    // }, [counter])

    // console.log(counter);

    // const constCounter = useMemo(() => {
    //     return counter 
    // }, [counter]); 

    return ( 
        <div className="alertButton">
            <span className="badge">{localStorage.getItem('number')}</span>
        </div>
     );
}
 
export default AlertButton;