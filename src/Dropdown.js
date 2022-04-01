import React, { useState } from "react";
import onClickOutside from 'react-onclickoutside';
import useFetch from "./useFetch";
import PatientsList from "./PatientsList";
import { Link } from 'react-router-dom'



function Dropdown({ title, groups = [], patients=[], multiSelect = false}) {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const toggle = () => setOpen(!open);
    Dropdown.handleClickOutside = () => setOpen(false);

    function handleOnCLick(group) {
        if (!selection.some(current => current.id === group.id))
        {
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
                        <span>{group.value}</span>
                        <span>{group.id === 1 && isItemInSelection(group) && patients.slice(0, 3).map(
                           patient => ( 
                               <span key={patient.id}><Link className="links" to={`/patient/${patient.id}`}>{patient.firstName}</Link><br></br></span>
                           )
                        )
                        // <PatientsList clients={data} title="All Clients"/> 
                        }
                        {group.id === 2 && isItemInSelection(group) && patients.slice(3,7).map(
                           patient => ( 
                               <span key={patient.id}><Link className="links" to={`/patient/${patient.id}`}>{patient.firstName}</Link><br></br></span>
                           )
                        )
                        // <PatientsList clients={data} title="All Clients"/> 
                        }
                        {group.id === 3 && isItemInSelection(group) && patients.slice(8,10).map(
                           patient => ( 
                               <span key={patient.id}><Link className="links" to={`/patient/${patient.id}`}>{patient.firstName}</Link><br></br></span>
                           )
                        )
                        // <PatientsList clients={data} title="All Clients"/> 
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