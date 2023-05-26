import React , {useState, useEffect} from 'react';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase-config';
import {onAuthStateChanged} from 'firebase/auth';
import { useNavigate , Link } from 'react-router-dom';
import swal from "sweetalert";

const Header = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged((auth), (user)=>{
      if(user){
        const uid = user.id; 
      }else{
        swal({
          
          text:"Successfully Logged Out" ,
          icon:"success",
          buttons:false,
          timer:2000})
      }
    })
   },[])

   const logouHandler =()=>{
    signOut(auth).then(()=>{
      navigate('/signin');
    })
   }






  return (
    <div className='w-full py-2 bg-slate-900 flex justify-between items-center text-white'>
     <Link to={"/"} > <h1 className='flex items-center cursor-pointer'><span className='text-red-500 font-bold text-2xl'>Google</span>
      <span className=' font-bold text-2xl text-white'>Firebase</span>
      </h1></Link>
      <div>
      <button onClick={logouHandler}  className="bg-blue-500 text-white px-4 py-2 rounded">Logout</button>
     
      </div>
      
      

    </div>
  )
}

export default Header
