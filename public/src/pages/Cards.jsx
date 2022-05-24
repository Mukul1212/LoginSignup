import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Cards() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [data, setData] = useState([]);



  useEffect(() => {
    async function GetData() {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=25')
      console.log(res.data.results);
      setData(res.data.results)
    }
    GetData()
  }, [])


  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
      <div className="private">
        <h1>Super Secret Page</h1>
        <button onClick={logOut}>Log out</button>
        <div className="cardcontainer" >

          {
            data.map((value) => {
              return (
                <>
                <div style={{textAlign: 'center'}}>

                  <div class="card" style={{width:' 22rem',margin:'auto' }}>
                  
                      <div class="card-body">
                        <h5 class="card-title">{value.name}</h5>
                        <h5 class="card-text">{value.url}</h5>
                       
                      </div>
                  </div>
                  </div>
                  <br></br>




                </>
              )
            })
          }
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
