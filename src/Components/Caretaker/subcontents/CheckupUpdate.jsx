import React,{useRef,useEffect} from 'react'
import { useState } from 'react'

function CheckUpdate() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const[title,setTitle] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const[feedback,setFeedback] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const[date,setDate] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const[id,setId] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const[a,setA] = useState("");

  const handleSubmit = async() => {
   const response = await fetch(process.env.REACT_APP_BASE_URL+"caretaker/createMessage", {
      method: "POST",
      headers: { 
        "Authorization": token,
        "Content-Type": "application/json" },
        body: JSON.stringify({animalId: id,date: date,feedback: feedback}),
  });
  const content = await response.json();
  console.log(content);
  setA(content.message);
  setTimeout(function(){
    setA("");
  },5000); 


}

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
    console.log(content);
    setData(content.animal);
  }

  const dataFetchedRef=useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    CallApi2();
  }, [])
  


  return (
    <>
      <div className="flex items-center justify-center mt-20 text-md m-auto">
       
          <table>
            <thead></thead>
            <tbody>
            <tr>
              <td className='px-6 py-4 whitespace-nowrap'>Animal ID </td>
              <td className='px-6 py-4 whitespace-nowrap'><select onChange={(e) => setId(e.target.value)} className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
            <option disabled selected value> -- select an option -- </option>
            {data.map((c) => {
              return(<option value={c._id}>{c.id}</option>)
            })}
            </select></td>
            </tr>
            <tr >
              <td className='px-6 py-4 whitespace-nowrap'> Date</td>
              <td className='px-6 py-4 whitespace-nowrap'><input type="date" value={date} name="date" className='border w-80' placeholder='Date...' onChange={(e) => setDate(e.target.value)}/></td>
            </tr>
            <tr >
              <td className='px-6 py-4 whitespace-nowrap'>
                Feedback
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <textarea value={feedback} className='border w-80 h-40' name="feedback" placeholder="Note..." onChange={(e) => setFeedback(e.target.value)}/>
              </td>
            </tr>
           
            <tr>
              <td></td>
              <td><button className='px-4 py-2 whitespace-nowrap rounded-md bg-slate-100' onClick={() => handleSubmit()} >Submit</button></td>
            </tr>
            </tbody>
          </table>
      </div>
      {a && <><div className="flex justify-center items-center">{a}</div></>}
    </>
  )
}

export default CheckUpdate
