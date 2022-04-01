import { useState } from "react";
import { Link } from 'react-router-dom';
import Dropdown from "./Dropdown";
import AlertButton from "./AlertButton";

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

const Navbar = ({patients}) => {

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
            <div className="search">
                    <input 
                        className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                        type = "search" 
                        placeholder = "Search People and Groups" 
                    />
                    <button>Search</button>
            </div>
            <div className="container">
                <Dropdown title="Select group" groups={groups} patients={patients}/>
                <AlertButton />
            </div>


            
            {/* </div> */}
            
        </nav>
    );
}
 
export default Navbar;