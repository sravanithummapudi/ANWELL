import React, { useState,useRef,useEffect } from 'react'


let token = "Bearer "+localStorage.getItem("token");

function immediateActions() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const[t,setT]=useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const[id,setId] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const[m,setM]=useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const[msg,setMsg] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const[a,setA]=useState([]);

  const handleChange= (e)=>{
    setT(true);
    setId(e.target.value);
  }

  const Submit = async() => {
    const response = await fetch(process.env.REACT_APP_BASE_URL+"admin/createMessages", {
      method: "POST",
      headers: {
        "Authorization" : token,
        "Content-Type": "application/json" },
        body: JSON.stringify({message: msg,careTakerId: id})
    });
    const content = await response.json();
    
    console.log(content);
    setT(false);
    setA(content.message);
    setTimeout(function(){
      setA("");
    },5000);
    setT(true);
  }

  async function CallApi(){
    
    const response = await fetch(process.env.REACT_APP_BASE_URL+"admin/getAllCareTaker", {
      method: "GET",
      headers: {
        "Authorization" : token,
        "Content-Type": "application/json" }
    });
    const content = await response.json();
    
    console.log(content.message);
    setM(content.careTakers);
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dataFetchedRef=useRef(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    CallApi();
  }, [])
 
  
  
  return (
    <>
    <br></br>
    
    {
            t && <>
            <label
              htmlFor="message"
              className="  mx-80 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Enter message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-6/12 mx-80 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter message..."
              defaultValue={""}
              value={msg} 
              onChange={(e) => setMsg(e.target.value)}
            />
            <button type="button" class="mx-80 my-2 text-white bg-lime-600 hover:bg-lime-600 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => Submit()}>Submit</button>

          </>
          
          }
          {a && <div className='flex justify-center items-center'>{a}</div>}
<div className="ml-24 my-24">
    
    <table class="class=state-fixed  border-2 border-lime-600 text-center" >
  <thead>
    <tr>
      <th class="border border-slate-300 p-6 text-lg border-2 border-lime-600 text-center">Caretaker Name</th>
      <th class="border border-slate-300 p-6 text-lg border-2 border-lime-600 text-center ">Contact</th>
      <th class="border border-slate-300 p-6 text-lg border-2 border-lime-600 text-center">E-mail</th>
      <th class="border border-slate-300 p-6 text-lg border-2  border-lime-600 text-center " >No.of animals assigned</th>
      <th class="border border-slate-300 p-6 text-lg border-2 border-lime-600 text-center" >Specialist</th>
      
      <th class="border border-slate-300 p-6 text-lg border-2 border-lime-600 text-center"></th>

    </tr>
  </thead>
 {m.map((c) => {
  return <tbody>
  <tr>
    <td class="border border-slate-300 p-6 text-lg border-2  border-lime-600 text-center">{c.name}</td>
    <td class="border border-slate-300 p-6 text-lg border-2 border-lime-600 text-center">{c.contact}</td>
    <td class="border border-slate-300 p-6 text-lg border-2 border-lime-600 text-center">{c.email}</td>
    <td class="border border-slate-300 p-6 text-lg border-2 border-lime-600 text-center">{c.noOfAnimals}</td>
    <td class="border border-slate-300 p-6 text-lg border-2 border-lime-600 text-center">{c.specialist}</td>

    <td class="border border-slate-300 p-6 border-2 border-lime-600 text-center "><button type="button" value={c._id} onClick={(e) => handleChange(e)} className="border-md bg-lime-500/75 p-2 text-white rounded-lg">Action 
   
        
  </button></td>
  </tr>
</tbody>
 })} 
</table>
</div>


    
    </>
    
    
  )
}

export default immediateActions