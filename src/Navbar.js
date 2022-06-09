import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Dropdown from "./Dropdown";
import axios from "axios";
import Select from 'react-select';
import { useMsal } from "@azure/msal-react";

const Navbar = () => {
  const { instance, accounts } = useMsal();
  function handleLogout(){
    instance.logoutRedirect().catch(
      console.error
    );
  }



  var testData = [];
  const [patients, setPatients] = useState([])
  const [data,setData] = useState([])
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3030/api";
  const [patientGroups, setPatientGroups] = useState([])  

    useEffect(()=>{
        getPatients()
        fetchPatientGroups()
    },[])

    const callApi = async ({ token, apiUrl, path, method, body } ) => {
      const url = `${apiUrl ? apiUrl : API_URL}/${path}`
  
      const fetchOptions = {
          method,
          headers: { 
              "Content-type": "application/json",
              "Authorization": "Bearer " + token
          }
      }
  
      if (body) fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body)
  
      console.log(body)
  
      try {
          const response = await fetch(url, fetchOptions);
          if (!response.ok)
              throw Error(`${response.status}|${response.statusText}`);
          const response_1 = await response.text();
          return ({
              error: false,
              response: response_1 && response_1.length > 0 ? JSON.parse(response_1) : {}
          });
      } catch (e) {
          return {
              error: true,
              response: e
          };
      }
  }
  

  const getPatientsGroups = (accessToken) => {
      return callApi({ token: accessToken, path: 'patient-groups', method: 'GET' })
  }

  const request = {
      scopes: ["api://5720ed34-04b7-4397-9239-9eb8581ce2b7/access_as_caregiver", "User.Read"],
      account: accounts[0]
  };

  const fetchPatientGroups = () => {
      instance.acquireTokenSilent(request).then(res => {
          getPatientsGroups(res.accessToken).then(response => {
              console.log(response.response)
              const foundPatientGroups = response.response
              setPatientGroups([...foundPatientGroups])
          })
      }).catch((err) => {
          console.error('Error occurred while fetching patients', err)
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then(console.log)})
  }

  

  // const getPatients = async() => {
  //     await axios.get("http://localhost:3030/api/patients").then((res) => {
  //         setPatients([...res.data])
  //     })
  // }

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
            <button className="logoutButton" onClick={handleLogout}></button>            <div className="searchBar">
              <Select options={data} onChange={opt => window.location.href='/patient/'+opt.id}/>
            </div>
            
            <div className="container">
                <Dropdown title="Select group" groups={patientGroups}/>
            </div>


            
            {/* </div> */}
            
        </nav>
    );
}
 
export default Navbar;