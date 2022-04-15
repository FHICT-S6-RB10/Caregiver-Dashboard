import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Dropdown from "./Dropdown";
import AlertButton from "./AlertButton";
import axios from "axios";
import Select from 'react-select';
import { useHistory } from 'react-router-dom';

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
  var testData = [];
  const [patients, setPatients] = useState([])
  const [data,setData] = useState([])
  const history = useHistory();

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
            id: patient.id.toString(),
            label: patient.firstName.toString(),
            value: patient.lastName.toString()
          }
          testData.push(datapoint);
        });
        setData(testData)
        console.log(testData)
      }
    },[patients])

    function handleChangeName(id) {

      console.log(id);
      //history.push('patient/'+id);
      // <Link to={'/patient/'+id}>
      //   Profile
      // </Link>
      
      
    }

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
            <div className="searchBar">
              {console.log(data)}
              <Select options={data} onChange={opt => window.location.href='/patient/'+opt.id}/>
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