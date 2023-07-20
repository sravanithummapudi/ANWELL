import { Button } from '@material-tailwind/react'
import React from 'react'
import { useState,useRef,useEffect } from 'react';

function AnimalDetails() {
  const[t,setT] = useState(false);

  var token = "Bearer "+localStorage.getItem("token");
  const[data,setData] = useState([]);

  async function CallApi2(){
    const response = await fetch(process.env.REACT_APP_BASE_URL+"caretaker/getAnimal", {
      method: "POST",
      headers: { 
        "Authorization": token,
        "Content-Type": "application/json" },
        body: JSON.stringify({id: localStorage.getItem("id")})
    });
    const content = await response.json();
    setData(content.animal);
  }

  const[animal,setAnimal] = useState([]);
  async function CallApi(a){
    const response = await fetch(process.env.REACT_APP_BASE_URL+"caretaker/getAnimalById", {
      method: "POST",
      headers: { 
        "Authorization": token,
        "Content-Type": "application/json" },
        body: JSON.stringify({id: a})
    });
    const content = await response.json();
    setAnimal(current=>[...current,content.animal]);
  }

  const handleChange = (e) => {
    setT(true);
    CallApi(e.target.value);
  }

  const dataFetchedRef=useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    CallApi2();
  })
  

  return (
    <>
    <div className="relative w-full lg:max-w-sm p-1.5 my-6 mx-96">
            <select onChange={(e) => handleChange(e)} className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
            <option disabled selected value> -- select an option -- </option>
            {data.map((c) => {
              return(<option value={c._id}>{c.id}</option>)
            })}
            </select>
        </div>
       {t &&  


        <> <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-7 px-6">
                Animal ID
              </th>
              <th scope="col" className="py-7 px-6">
                Past Medications
              </th>
              <th scope="col" className="py-7 px-6">
                Weight
              </th>
              <th scope="col" className="py-7 px-6">
                Past surgeries
              </th>
            </tr>
          </thead> 
          
          {animal.map((c,index) =>{
            return (
              <tbody >
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <th
                  scope="row"
                  className="p-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {c.id}
                </th>
                <td className="px-10 py-36">{c.pastMedicalHistory}</td>
                <td className="px-10 py-36">{c.weight}</td>
                <td className="px-10 py-36">{c.pastSurgeries}</td>
              </tr>
              
            </tbody>
            )
          })}
          
        </table>
        
      </div>
      


  </>
        
      }
    </>
  )
}

export default AnimalDetails