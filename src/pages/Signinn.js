import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import swal from "sweetalert";
import { RotatingLines } from "react-loader-spinner";

const Signinn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    setLoad(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((some) => {
        let user = some.user;
        console.log(user);
        swal({
          text: "Successfully Logged In",
          icon: "success",
          buttons: false,
          timer: 2000
        });
        navigate('/crud');
      })
      .catch((error) => {
        let error_code = error.code;
        let error_message = error.message;
        swal({
          text: `${error_code} ${error_message}`,
          icon: "error",
          buttons: false,
          timer: 2000
        });
      })
      .finally(() => {
        setLoad(false);
      });
  };

  return (
    <>
      <div>
      <form>
  <div className='w-full flex flex-col justify-center items-center mt-16 space-y-2'>
    <h2 className='text-4xl font-bold pb-4'>Sign in to your Account</h2>
    <div>
      <label htmlFor='email'></label>
      <input
        type='email'
        label='email'
        placeholder='Enter your Email'
        className='border-2 mb-4 border-blue-300 focus:border-2 focus:border-blue-300 py-2 px-2 w-full rounded-lg'
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor='password'></label>
      <input
        type='password'
        label='password'
        placeholder='Enter your Password'
        className='border-2 mb-4 border-blue-300 focus:border-2 focus:border-blue-300 py-2 px-2 w-full rounded-lg'
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type='submit' onClick={onLogin} className='bg-blue-500 text-white px-4 py-2 rounded mb-2'>
        {load ? <RotatingLines strokeColor="black" height={30} width={30} /> : "Log in"}
      </button>
      <p className='text-lg'>
        If you Don't have an account?
        <Link to={'/signup'}>
          <span className='text-blue-600 font-bold ml-2'>Sign Up</span>
        </Link>
      </p>
    </div>
  </div>
</form>


      </div>
    </>
  );
};

export default Signinn;
