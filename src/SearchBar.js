// import React, { Component } from 'react';
// import { useState, useEffect } from "react";
// import TypeChecker from 'typeco';
// import SearchField from "react-search-field";
// import axios from 'axios';

 
// const SearchBar = () => {

    
//     // constructor(() => {
//     //     this.state = {
//     //       basicExampleList: [...patients],
//     //     };
//     //     this.onBasicExampleChange = this.onBasicExampleChange.bind(this);
//     //   })

//       const [patients, setPatients] = useState([])

//       const PatientsList = (patients) => (
//         <div className="list-example">
//           <div className="list-body">
//             {
//               patients.map((patient) => (
//                 <ul key={patient.id}>
//                   <li> {patient.firstName} </li>
//                   <li> {patient.LastName} </li>
//                 </ul>))
//             }
//           </div>
//         </div>
//       );

//       useEffect(()=>{
//         getPatients()
//         console.log(patients)
//         },[])

//         const getPatients = async () =>{
//             await axios.get("https://localhost:5001/patients").then((res)=>{
//                setPatients([...res.data])
//              })
//         }

//         const getMatchedList = (searchText) => {
//             if (TypeChecker.isEmpty(searchText)) return patients;
//             return patients.filter((patient) => patient.firstName.toLowerCase().includes(searchText.toLowerCase()));
//           };

//           // TODO
//           // Should turn into a function setting the 
//           //state of patients to a new list
//         function onBasicExampleChange(patients) {
//             setPatients([...getMatchedList(patients)])
            
//         }
    
//     return ( 

//         <div className="react-search-field-demo container">
//             <div>
//             <SearchField
//                 placeholder="Search item"
//                 onChange={() => onBasicExampleChange(patients)}
//             />
//             <PatientsList
                
//             />
//             </div>
//         </div>

//         );
//     }
 
// export default SearchBar;