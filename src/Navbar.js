import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Dropdown from "./Dropdown";
import AlertButton from "./AlertButton";
import axios from "axios";
import SearchBar from "./SearchBar";

const groups = [
    {
      id: 1,
      value: 'Group 1',
    },
    {
      id: 2,
      value: 'Group 2',
    },
    {
      id: 3,
      value: 'Group 3',
    },
  
  ];

const Navbar = () => {

  const [patients, setPatients] = useState([])

    useEffect(()=>{
        getPatients()
        console.log(patients)
    },[])

    const getPatients = async () =>{
        await axios.get("https://localhost:44350/patients").then((res)=>{
           setPatients([...res.data])
         })
    }

    return (

        <nav className="navbar">
            <Link to="/">
            <h1>
                MoveSense
            </h1>
            </Link>
            <div className="links">
                {/* <Link to="/logout">Logout</Link> */}
            </div>
            <div className="searchBar">
              <SearchBar />
            </div>
            <div className="container">
                <Dropdown title="Select group" groups={groups} patients={patients}/>
                <Link to="/">
                <AlertButton />
                </Link>
            </div>


            
            {/* </div> */}
            
        </nav>
    );
}
 
export default Navbar;