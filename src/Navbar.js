import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Dropdown from "./Dropdown";
import AlertButton from "./AlertButton";
import axios from "axios";
import Select from 'react-select';
import { useMsal } from "@azure/msal-react";

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

  

const Navbar = ({notificationsCounter}) => {
  
  const { instance, accounts } = useMsal();
  function handleLogout(){
    instance.logoutRedirect().catch(
      console.error
    );
  }
  

  var testData = [];
  const [patients, setPatients] = useState([])
  const [data,setData] = useState([])

    useEffect(()=>{
        getPatients()
    },[])

    const getPatients = async () =>{
      await axios.get("https://localhost:5001/patients").then((res)=>{
         setPatients([...res.data])
       })
  }

    useEffect(()=>{
      if(patients.length> 0){
        patients.forEach(patient =>{      
          
          var datapoint = {
            id: patient.id.toString(),
            label: patient.firstName.toString(),
            value: patient.lastName.toString()
          }
          testData.push(datapoint);
        });
        setData(testData)
      }
    },[patients])

    return (

        <nav className="navbar">
            <Link to="/">
            <h1>
                SWSP
            </h1>
            </Link>
            <div className="links">
                {/* <Link to="/logout">Logout</Link> */}
            </div>
            <button onClick={handleLogout}>
                Logout
            </button>
            <div className="searchBar">
              <Select options={data} onChange={opt => window.location.href='/patient/'+opt.id}/>
            </div>
            
            <div className="container">
                <Dropdown title="Select group" groups={groups} patients={patients}/>
                <Link to="/">
                <AlertButton counter={notificationsCounter}/>
                </Link>
            </div>


            
            {/* </div> */}
            
        </nav>
    );
}
 
export default Navbar;