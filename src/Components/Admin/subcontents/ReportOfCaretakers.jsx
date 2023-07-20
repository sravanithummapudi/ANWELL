import { Button } from '@material-tailwind/react'
import React from 'react'
import { useState,useEffect,useRef } from 'react';

function ReportOfCaretakers() {
  const[t,setT] = useState(false);
 
  var token = "Bearer "+localStorage.getItem("token");

  const handleChange = (e) => {
    setT(true);
    console.log(e.target.value);
    CallApi2(e.target.value);
    
  }
  

  const[data,setData] = useState([]);
  async function CallApi2(a){
    const response = await fetch(process.env.REACT_APP_BASE_URL+"caretaker/getAnimal", {
      method: "POST",
      headers: { 
        "Authorization": token,
        "Content-Type": "application/json" },
        body: JSON.stringify({id: a})
    });
    const content = await response.json();
    console.log(content);
    setData(content.animal);
  }

  const[contacts,setContacts] = useState([]);
  async function CallApi(){
    const response = await fetch(process.env.REACT_APP_BASE_URL+"admin/getAllCareTaker", {
      method: "GET",
      headers: { 
        "Authorization": token,
        "Content-Type": "application/json" }
    });
    const content = await response.json();
    setContacts(content.careTakers);
  }

  const dataFetchedRef=useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    CallApi();
  }, [])
  

  return (
    <>
    <div className="relative w-full lg:max-w-sm p-1.5 my-6 mx-96">
            <select onChange={(e) => handleChange(e)} className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
            <option disabled selected value=""> -- select an option -- </option>
            {contacts.map((cop) => {
             return(<option value={cop._id}>{cop.id} - {cop.name}</option>)
          })}
            </select>
        </div>
       {t &&  


        <> <div className="overflow-x-auto relative">
        <table className="ml-80 text-sm text-left text-gray-700 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                Animal ID
              </th>
              <th scope="col" className="p-4">
                Past Medications
              </th>
              <th scope="col" className="p-4">
                Weight
              </th>
              <th scope="col" className="p-4">
                Past surgeries
              </th>
              <th scope="col" className="p-4">
                Abuse History
              </th>
            </tr>
          </thead>
         {data.map((cum) => {return( 
         <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {cum.id}
              </th>
              <td className="p-4 ">{cum.pastMedicalHistory}</td>
              <td className="p-4">{cum.weight}</td>
              <td className="p-4">{cum.pastSurgeries}</td>
            </tr>
            
          </tbody>)})}
        </table>
        
      </div>
      


  </>
        
      }
    </>
  )
}

export default ReportOfCaretakers