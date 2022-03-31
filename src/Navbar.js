import { useState } from "react";
import { Link } from 'react-router-dom';
import Dropdown from "./Dropdown";

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

const patients = [
    {
        firstName: "Dimitar", 
        lastName: "Lalev", 
        stressed: "stressed", 
        group: 1, 
        id: 1,
    },
    {
        firstName: "Edita", 
        lastName: "Lalev", 
        stressed: "stressed", 
        group: 2, 
        id: 2,
    },
    {
        firstName: "Bas", 
        lastName: "Lalev", 
        stressed: "stressed", 
        group: 3, 
        id: 3,
    },
    {
        firstName: "Jorick", 
        lastName: "Lalev", 
        stressed: "stressed", 
        group: 1, 
        id: 1,
    },
    {
        firstName: "Nick", 
        lastName: "Lalev", 
        stressed: "stressed", 
        group: 1, 
        id: 1,
    },
]

const Navbar = () => {

    // const [searchField, setSearchField] = useState('');

    // const handleChange = e => {
    //     setSearchField(e.target.value);
    //   };

    return (

        <nav className="navbar">
            <h1>
                MoveSense
            </h1>
            <div className="links">
                {/* <Link to="/logout">Logout</Link> */}
            </div>
            <div className="search">
                    <input 
                        className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                        type = "search" 
                        placeholder = "Search People" 
                    />
                    <button>Search</button>
            </div>
            <div className="container">
                <Dropdown title="Select group" groups={groups} patients={patients}/>
                {console.log(patients)}
            </div>

            
            {/* </div> */}
            
        </nav>
    );
}
 
export default Navbar;