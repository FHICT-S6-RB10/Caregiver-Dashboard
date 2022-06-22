import { useState, useEffect } from "react";
import PatientsList from "./PatientsList";
import useFetch from "./useFetch";
import axios from "axios";
import { useMsal } from "@azure/msal-react";
import AlertButton from "./AlertButton";
import { callMsGraph } from "./graph.tsx";


 
const Home = () => {

    var testData = []
    const { instance, accounts } = useMsal()
    // const { data, isPending, error } = useFetch('http://localhost:3030/api/patients');
    const [stressedPatients, setStressedPatients] = useState([])
    // const [number, setNumber] = useState([])
    const [patients, setPatients] = useState([])
    const [NewUniquePatients, setNewUniquePatients] = useState([])

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3030/api"
    const [patientGroups, setPatientGroups] = useState([])

    useEffect(()=>{
        getStressedPatients(24)
        getPatients()
        // fetchPatientGroups()
    },[])

    // useEffect(()=>{ 
    //     getPatientsFromGroups()
    //     console.log(stressedPatients) 
    // },[]) 

    // useEffect(() => {
    //     GetUniquePatients()
    //     console.log(NewUniquePatients)
    // },[])

    // useEffect(()=>{
    //     console.log(getUnique(patients, 'id'))
    //     if(stressedPatients.length > 0){
            
    //         console.log(localStorage.getItem('number')) 
    //     }
    //     else{
    //         handleClear()
    //     }
    // },[])

    const GetUniquePatients = () => {
        setNewUniquePatients(getUnique(patients, 'id'))
    }

    function getUnique(arr, index) {

        const unique = arr
             .map(e => e[index])
      
             // store the keys of the unique objects
             .map((e, i, final) => final.indexOf(e) === i && i)
        
             // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);      
      
         return unique;
      }
 
    // const getPatientsFromGroups = () => {
    //     console.log("Getting patients from groups")
    //     patientGroups.forEach(group => {
    //         instance.acquireTokenSilent(request).then(res => {
    //             getPatientsGroupsPatients(res.accessToken, group.id).then(response => {
    //                 console.log(response.response)
    //                 const FoundPatients = response.response
    //                     FoundPatients.forEach(patient => {
    //                         if(testData.includes(patient)){
    //                             console.log("Patient already added")
    //                         }
    //                         else{
    //                             testData.push(patient)
    //                         }
    //                         console.log(testData)
    //                     })
    //                 })
    //         }).catch((err) => {
    //             console.error('Error occurred while fetching patients', err)
    //         })
    //         .catch((e) => {
    //           instance.acquireTokenPopup(request).then(console.log)})
            
    //         })
    //     setPatients(testData)
    //     console.log(testData)
    // }

    const getPatientsGroupsPatients = (accessToken, id) => {
        return callApi({ token: accessToken, path: "patient-groups/"+id+"/patients", method: 'GET' })
      }

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

    const getPatients = async () =>{
        await axios.get("https://localhost:5031/patients").then((res)=>{
           setPatients([...res.data])
         })
    }
 
    const getStressedPatients = async(value) => {
        await axios.get("https://localhost:5031/patients/stressed/"+value).then((res) => {
            setStressedPatients([...res.data])
        })  
    }    
  
    function handleClear(){
        localStorage.setItem('number', 0)
        setStressedPatients(0)
    } 
 
    return (
        <div className="home">
                <h1>
                    Welcome, { instance.getActiveAccount().name }
                </h1> 
                <button onClick={handleClear} className="clearButton"></button>
                { 
                <PatientsList patients={patients} stressedPatients={stressedPatients} title="All Patients"/>
                }
        </div>
     );
}
 
export default Home;