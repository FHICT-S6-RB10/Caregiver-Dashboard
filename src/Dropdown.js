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
   
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5050/api";

    Dropdown.handleClickOutside = () => setOpen(false);


    

    function handleOnCLick(group) {
        if (!selection.some(current => current.id === group.id))
        {
            if(group.id){
                setSelection([group])
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
                    <Link to={`/groupPatients/${group.id}`}>
                    <button type="button" onClick={() => handleOnCLick(group)}>
                        <div>{group.groupName}</div>
                        <div className="right-arrow"> </div>
                    </button>
                    </Link>
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