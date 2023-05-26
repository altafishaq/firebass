//  After the database config and collections in firebase
// as below
`firebase_config.js`
import { initializeApp } from "firebase/app";
import {addDoc, collection, getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAu8kZaj1x3iyAeqECpwnD8vtR0ER589x4",
    authDomain: "crud-300ba.firebaseapp.com",
    projectId: "crud-300ba",
    storageBucket: "crud-300ba.appspot.com",
    messagingSenderId: "365494047054",
    appId: "1:365494047054:web:f5977610165fc364508e1f"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const usersRef = collection(db, 'users');

// export default app;

//===============================================================================================

//`````````````````````````````,,,,,,,,,,,,,,,,,,,,,,
// Read
//const _data = await getDocs(ref);

 // you can use one of these

    1. // _data.forEach((doc)=>{
    //     setDataa((prv)=>[...prv,{...doc.data(), id:doc.id}]);
    // })

2.// setDataa(_data.docs.map((prv)=>({...prv.data(),id:prv.id})))

`Read.js`
import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { usersRef } from '../firebase-config';

const Read = () => {
    const [ dataa , setDataa] = useState([]);

    useEffect(()=>{
        getDataa();
    },[])

const getDataa = async ()=>{
    const ref = usersRef;
    const _data = await getDocs(ref);

    // _data.forEach((doc)=>{
    //     setDataa((prv)=>[...prv,{...doc.data(), id:doc.id}]);
    // })

   setDataa(_data.docs.map((prv)=>({...prv.data(),id:prv.id})))

}

return (
    <div>
      {
        dataa.map((e)=>{
            return(
                
                <div key={e.id}>
                   <h2>{e.name}</h2>
                   <h2>{e.age}</h2>
                </div>
            )
        })
      }
    </div>
  )
}

// export default Read;


//===============================================================================================
//`````````````````````````````,,,,,,,,,,,,,,,,,,,,,,
// Insert 
// await addDoc(ref, state)
// const _data = await addDoc(ref, data);

import React, { useState } from 'react'
import { usersRef } from '../firebase-config';
import { addDoc } from 'firebase/firestore';

const Insert = () => {
    const [data, setData] = useState({
        name:"",
        age:""
    })
  
  const add = async ()=>{
    const ref = usersRef;
    const _data = await addDoc(ref, data);
    setData({
        name:"",
        age:""
    })

    // the below one is for so after the button clicked the inputes got empty or clear
    setData({
        name:"",
        age:""
    })


  }
  
    return (
    <div>
      <input type="text" value={data.name} onChange={(e)=>setData({...data , name:e.target.value})} placeholder='name' />
      <input type="text" value={data.age} onChange={(e)=>setData({...data , age:e.target.value})} placeholder='age' />
      <button onClick={add} >Add</button>
    </div>
  )
}

export default Insert


//===============================================================================================
//`````````````````````````````,,,,,,,,,,,,,,,,,,,,,,
// Delete
//       const deleteFun = async (id)=>{
//        const _data = doc(db, 'users' , id)
//       const deletingData = await deleteDoc(_data);
//       }


// <button onClick={()=>deleteFun(e.id)} >Remove</button>


import { getDocs , deleteDoc , doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { usersRef , db } from '../firebase-config';

const Read = () => {
    const [ dataa , setDataa] = useState([]);
    
    useEffect(()=>{
        getDataa();
    },[])

const getDataa = async ()=>{
    const ref = usersRef;
    const _data = await getDocs(ref);

  setDataa(_data.docs.map((prv)=>({...prv.data(),id:prv.id})))

}


const deleteFun = async (id)=>{
  const _data = doc(db, 'users' , id)
  const deletingData = await deleteDoc(_data);
}



  return (
    <div>
      {
        dataa.map((e)=>{
            return(
                
                <div className='border-b-4 p-b-4' key={e.id}>
      <h2>{e.name}</h2>
      <h2>{e.age}</h2>
      <button onClick={()=>deleteFun(e.id)} className='bg-blue-600 text-white'>Remove</button>
      <hr />
      
                </div>
            )
        })
      }
    </div>
  )
}

export default Read;

//===============================================================================================
//`````````````````````````````,,,,,,,,,,,,,,,,,,,,,,
// Update




