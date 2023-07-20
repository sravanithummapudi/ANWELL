import React,{useState} from 'react'

function addNews() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const[title,setTitle] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const[news,setNews] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const[date,setDate] = useState("");
  let token = "Bearer "+localStorage.getItem("token");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const[t,setT]=useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const[m,setM]=useState("");
  


  const handleSubmit = async () => {
    console.log("title: ",title," Date: ",date, " News: ",news);
    const response = await fetch(process.env.REACT_APP_BASE_URL+"admin/news", {
      method: "POST",
      headers: {
        "Authorization" : token,
        "Content-Type": "application/json" },
      body: JSON.stringify({title:title,description: news,date:date}),
    });
    const content = await response.json();
    console.log(content);
    setM(content.message);
    setTimeout(function(){
      setM("");
    },5000);
    setT(true);
    
  }
  return (
    <>
      <div className="flex items-center justify-center mt-20 text-md m-auto">
       
          <table>
            <thead></thead>
            <tbody>
            <tr>
              <td className='px-6 py-4 whitespace-nowrap'>Title </td>
              <td className='px-6 py-4 whitespace-nowrap'><input type="text" value={title} name="title" className='border w-80' placeholder='Title...' onChange={(e) => setTitle(e.target.value)}/></td>
            </tr>
            <tr >
              <td className='px-6 py-4 whitespace-nowrap'> Date</td>
              <td className='px-6 py-4 whitespace-nowrap'><input type="date" value={date} name="date" className='border w-80' placeholder='Date...' onChange={(e) => setDate(e.target.value)}/></td>
            </tr>
            <tr >
              <td className='px-6 py-4 whitespace-nowrap'>
                News 
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <textarea value={news} className='border w-80 h-40' name="news" placeholder="Description..." onChange={(e) => setNews(e.target.value)}/>
              </td>
            </tr>
           
            <tr>
              <td></td>
              <td><button className='px-4 py-2 whitespace-nowrap rounded-md bg-slate-100' onClick={() => handleSubmit()} >Submit</button></td>
            </tr>
            </tbody>
          </table>
      </div>
<br/>
      {
        t && <div className='flex justify-center items-center'>{m}</div>
      }
    </>
  )
}

export default addNews