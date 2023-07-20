import React,{useEffect,useRef} from 'react';
import { useState } from 'react';
import "../index.css"


function Home() {

	const[news,setNews] = useState([])
	async function CallApi(){
		const response = await fetch(process.env.REACT_APP_BASE_URL+"home/getNews", {
		  method: "GET",
		  headers: { 
			"Content-Type": "application/json" }
		});
		const content = await response.json();
		console.log(content.news);
    setNews(content.news);
    console.log(news);
	  }
    

	  const dataFetchedRef=useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    CallApi();
  }, [])

	
  return (
    <div style={{ 
      backgroundImage: `url("https://d2evkimvhatqav.cloudfront.net/images/_960xAUTO_crop_center-center_none/mother_cow_calf_31883069.jpg?v=1650463658,0.6021,0.4284")` ,
    height:"100%",
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover"}}className=" px-80 bg-slate-100 text-white text-xl">
		  {news.map((c) => {
        return(<marquee class="marq"
				direction="down"
				behavior="scroll"
		loop="20">
          <p className='p-4 h-40'>Title: {c.title}<br/>Date: {c.date}<br/> {c.description}</p></marquee>
        )
      })}
	</div>
  )
}

export default Home