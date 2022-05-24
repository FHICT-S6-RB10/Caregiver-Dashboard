import { useState, useEffect } from "react";
import PatientsList from "./PatientsList";
import useFetch from "./useFetch";
import axios from "axios";
import { useMsal } from "@azure/msal-react";
import AlertButton from "./AlertButton";



const Home = () => {

    const { instance } = useMsal()
    const { data, isPending, error } = useFetch('https://localhost:3030/api/patients');
    const [stressedPatients, setStressedPatients] = useState([])
    const [number, setNumber] = useState([])

    useEffect(()=>{
        getStressedPatients(24); 
    },[])

    useEffect(()=>{
        if(stressedPatients.length > 0){
            setNumber(stressedPatients.length)
            console.log(stressedPatients.length)
            console.log(number)
            localStorage.setItem('number', (number.toString()));
            AlertButton();
        }
        else{
            handleClear()
        }
        
    },[number])

    const getStressedPatients = async(value) => {
        await axios.get("https://localhost:5001/patients/stressed/"+value).then((res) => {
            setStressedPatients([...res.data])
        })
    }

    function handleClear(){
        localStorage.removeItem('number')
        setStressedPatients(0);
        // window.location.reload(true);
    }

    return (
        <div className="home">
                <h1>
                    Welcome, { instance.getActiveAccount().name }
                </h1>
                <button onClick={handleClear} className="clearButton"></button>
                { error && <div>{error}</div>}
                { isPending &&<div>Loading...</div>}
                {!isPending &&
                <PatientsList patients={data} stressedPatients={stressedPatients} title="All Patients"/>
                }
        </div>
     );
}
 
export default Home;