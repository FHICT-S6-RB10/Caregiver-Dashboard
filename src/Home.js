import { useState, useEffect } from "react";
import PatientsList from "./PatientsList";
import useFetch from "./useFetch";


const Home = () => {

    const { data, isPending, error } = useFetch('https://localhost:44350/patients');

    return (
        <div className="home">
                <h1>
                    Welcome, Dr Strange!
                </h1>
                { error && <div>{error}</div>}
                { isPending &&<div>Loading...</div>}
                {!isPending &&
                <PatientsList patients={data} title="All Patients"/>
                }
        </div>
     );
}
 
export default Home;