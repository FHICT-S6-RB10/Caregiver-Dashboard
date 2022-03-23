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
                <Link to="/">Home</Link>
                <Link to="/logout">Logout</Link>

            </div>
            {/* <section className="garamond">
                <div className="navy georgia ma0 grow">
                     <h2 className="f2">Search patients</h2>
                </div>
                <div className="pa2">
                    <input 
                        className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                        type = "search" 
                        placeholder = "Search People" 
                        onChange = {handleChange}
                    />
                </div>
            </section>
            <button>Search</button> */}
        </nav>
    );
}
 
export default Navbar;