import React,{useEffect,useRef,useState} from "react";
import {Link} from 'react-router-dom';


function UserPage() {

  const[news,setNews] = useState([]);
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
  })
  return (
    <div>
      <nav className="bg-lime-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a className="font-sans  font-bold text-3xl">ANWELL</a>
  </div>
              <div className="hidden md:block">
                <div className="ml-10 float-root flex items-baseline space-x-4">
                  {/*<a
                    href="#"
                    className=" hover:bg-gray-700 hover:text-white text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </a>

                  <a
                    to="/report"
                    className=" hover:bg-gray-700 hover:text-white text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Team
                  </Link>

                  <Link
                    to="#"
                    className=" hover:bg-gray-700 hover:text-white text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Projects
                  </Link>

                  <Link
                    to="#"
                    className="hover:text-white text-black hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Calendar
                  </Link>*/}

                  <Link
                  to="/login"
                    className="hover:text-white text-black hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
  </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/*<div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Team
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Projects
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Calendar
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Reports
            </a>
          </div>
        </div>*/}
  </nav>
  <div style={{ 
      backgroundImage: `url("https://d2evkimvhatqav.cloudfront.net/images/_960xAUTO_crop_center-center_none/mother_cow_calf_31883069.jpg?v=1650463658,0.6021,0.4284")` ,
    height:"100%",
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover"}}className="py-8 px-80 bg-slate-100 text-white text-xl">
		
      {news.map((c) => {
        return(
		<marquee class="marq"
				direction="down"
				behavior="scroll"
		loop="20">
          <p className='p-4 h-40'>Title: {c.title}<br/>Date: {c.date}<br/> {c.description}</p></marquee>
        )
      })}
		
	</div>
    </div>
  );
}
export default UserPage;