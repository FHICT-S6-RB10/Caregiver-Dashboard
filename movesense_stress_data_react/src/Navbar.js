import { useState } from "react";
import { Link } from 'react-router-dom';

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

            
            {/* </div> */}
            
        </nav>
    );
}
 
export default Navbar;