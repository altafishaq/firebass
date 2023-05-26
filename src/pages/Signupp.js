import React, { useState } from 'react';
import { NavLink, useNavigate , Link } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase-config';
import {  RotatingLines } from "react-loader-spinner";
import swal from "sweetalert";

const Signupp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [load , setLoad] = useState(false);


    const onSubmit = async (e)=>{
        (e).preventDefault();
        setLoad(true);
        await createUserWithEmailAndPassword(auth, email,password).then((same)=>{
            const user = same.user;
            console.log(user);
            swal({
              text: "Successfully Logged In",
              icon: "success",
              buttons: false,
              timer: 2000
            });

            navigate('/')
        }).catch((error)=>{
            let error_code = error.code;
            let error_message = error.message;
            console.log(error_code,error_message);
            swal({
              text: `${error_code} ${error_message}`,
              icon: "error",
              buttons: false,
              timer: 2000
            });
        })
        setLoad(false);
 }



  return (
    <>
    
    
       <from>
       <div className='w-full flex flex-col justify-center items-center mt-16 space-y-4'>
        <h1 className='text-4xl font-600 pb-2'>Sign Up and Explore</h1>
      
       <div>
       <label htmlFor='email'></label>
        <input type='email'  placeholder='Enter your Email' className='border-2 mb-4 border-gray-600 py-2 px-2 w-full rounded-lg' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label htmlFor='password'></label>
        <input type='password'  placeholder='Enter your Password' className='border-2 mb-4 border-gray-600 py-2 px-2 w-full rounded-lg' value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button type='submit' onClick={onSubmit} className='bg-blue-500 text-white px-4 py-2 rounded' >{load ? <RotatingLines strokeColor="black" height={30} width={30} /> : "Sign Up"}</button>
       </div>
       <p className='text-lg'>
        If you already have an account{' '}
        <Link to={'/'}>
          <span className='text-blue-600 mr-52 font-bold ml-2'>Login</span>
        </Link>
      </p>
        </div>
       </from>
      
    

     
    </>

  )
}

export default Signupp
