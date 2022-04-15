import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Dropdown from "./Dropdown";
import AlertButton from "./AlertButton";
import axios from "axios";
import Select from 'react-select';

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

  const aquaticCreatures = [
    { label: 'Shark', value: 'Shark' },
    { label: 'Dolphin', value: 'Dolphin' },
    { label: 'Whale', value: 'Whale' },
    { label: 'Octopus', value: 'Octopus' },
    { label: 'Crab', value: 'Crab' },
    { label: 'Lobster', value: 'Lobster' },
  ];

const Navbar = () => {
  var testData = [];
  const [patients, setPatients] = useState([])
  const [data,setData] = useState([])

    useEffect(()=>{
        getPatients()
    },[])

    const getPatients = async () =>{
      await axios.get("https://localhost:44350/patients").then((res)=>{
         setPatients([...res.data])
       })
  }

    useEffect(()=>{
      if(patients.length> 0){
        patients.forEach(patient =>{      
          
          var datapoint = {
            label: patient.firstName.toString(),
            value: patient.lastName.toString()
          }
          testData.push(datapoint);
        });
        setData(testData)
        console.log(testData)
      }
    },[patients])

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
              {console.log(data)}
              <Select options={data}/>
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