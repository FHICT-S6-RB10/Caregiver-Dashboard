import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PatientsList from "./PatientsList";
import useFetch from "./useFetch";
import axios from "axios";
import { useMsal } from "@azure/msal-react";
import AlertButton from "./AlertButton";
import { callMsGraph } from "./graph.tsx";
import GroupsPatientsList from "./GroupsPatientsList";



const GroupsPatients = ({}) => {


    const { id } = useParams()

    const { instance, accounts } = useMsal()
    const [stressedPatients, setStressedPatients] = useState([])
    const [number, setNumber] = useState([])
    const [patients, setPatients] = useState([])
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050/api";
    const [groupId, setGroupId] = useState([])
    const [patientGroupsPatients, setPatientGroupsPatients] = useState([])

    useEffect(()=>{
        fetchPatientsGroupsPatients()
    }, [id])

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

    const getPatientsGroupsPatients = (accessToken) => {
        return callApi({ token: accessToken, path: "patient-groups/"+id+"/patients", method: 'GET' })
      }
    
      const fetchPatientsGroupsPatients = () => {
        instance.acquireTokenSilent(request).then(res => {
          getPatientsGroupsPatients(res.accessToken).then(response => {
                console.log(response.response)
                const foundPatientGroupsPatients = response.response
                setPatientGroupsPatients([...foundPatientGroupsPatients])
            })
        }).catch((err) => {
            console.error('Error occurred while fetching patients', err)
        })
        .catch((e) => {
          instance.acquireTokenPopup(request).then(console.log)})
    }
    
    const request = {
          scopes: ["api://5720ed34-04b7-4397-9239-9eb8581ce2b7/access_as_caregiver", "User.Read"],
          account: accounts[0]
    };


    return (
        <div className="home">
                <h1>
                    Welcome, { instance.getActiveAccount().name }
                </h1>
                {
                <GroupsPatientsList patients={patientGroupsPatients} title="All Patients"/>
                }
                {console.log(patientGroupsPatients)}
        </div>
     );
}
 
export default GroupsPatients;