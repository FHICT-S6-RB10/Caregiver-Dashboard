import React, { useEffect, useState } from "react";
import onClickOutside from 'react-onclickoutside';
import useFetch from "./useFetch";
import PatientsList from "./PatientsList";
import { Link } from 'react-router-dom'
import { useMsal } from "@azure/msal-react";
import Home from "./Home";




function Dropdown({ title, groups = [], patients=[], multiSelect = false}) {
    
    const { instance, accounts } = useMsal();
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const toggle = () => setOpen(!open);
    const [patientGroupsPatients, setPatientGroupsPatients] = useState([])
    const [groupId, setGroupId] = useState([])
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3030/api";

    Dropdown.handleClickOutside = () => setOpen(false);

    useEffect(() => {
        ;
    },[groups])

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

    const getPatientsGroupsPatients = (accessToken) => {
        return callApi({ token: accessToken, path: "patient-groups/"+groupId+"/patients", method: 'GET' })
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

    function handleOnCLick(group) {
        if (!selection.some(current => current.id === group.id))
        {
            console.log(group.id);
            setGroupId(group.id);
            console.log(patients.id);
            if(group.id){
                fetchPatientsGroupsPatients()
            }
            if(!multiSelect){
                setSelection([group]);
            }
            else if (multiSelect){
                setSelection([...selection, group]);
            }
        }
        else {
            let selectionAfterRemoval = selection;
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.id !== group.id
            );
            setSelection([...selectionAfterRemoval]);
        }
    }

    function isItemInSelection(group) {
        if(selection.find(current => current.id === group.id)) {
            return true;
        }
        return false;
    }

    return (
        <div className="dd-wrapper">
            <div 
            tabIndex={0} 
            className="dd-header" 
            role="button" 
            onKeyPress={() => toggle(!open)} 
            onClick={() => toggle(!open)}>
                <div className="dd-header_title">
                    <p className="dd-header_title--bold">
                        {title}
                    </p>
                </div>
                <div className="dd-header_action">
                    <p>{open ? 'Close ' : 'Open'}</p>
                </div>
            </div>
            {open && (
                <ul className="dd-list">
                
                {groups.map(group => (
                <li className="dd-list-item" key={group.id}>
                    <button type="button" onClick={() => handleOnCLick(group)}>
                        <span>{group.groupName}</span>
                        <span>{group.id && isItemInSelection(group) && patientGroupsPatients.slice(0, 10).map(
                           patient => ( 
                               <span key={patient.id}><Link className="links" to={`/patient/${patient.id}`}>{patient.firstName}</Link><br></br></span>
                                )
                            )
                        }
                        
                        </span>
                    </button>
                </li>
                ))}
                </ul>
            )}
        </div>
    );
}

const clickOutsideConfig = {
    handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);