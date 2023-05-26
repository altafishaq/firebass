import React, { useEffect, useState } from "react";
import { usersRef, db } from "../firebase-config";
import { addDoc, deleteDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { FidgetSpinner, RotatingLines } from "react-loader-spinner";
import swal from "sweetalert";

import {signOut} from 'firebase/auth';
import {auth} from '../firebase-config';
import {onAuthStateChanged} from 'firebase/auth';
import { useNavigate , Link } from 'react-router-dom';




const Crud = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [add, setAdd] = useState({
    name: "",
    age: "",
  });

  const [data, setData] = useState({
    id: "",
    name: "",
    age: "",
  });
  const [pop, setpop] = useState(false);
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3 , setLoad3] = useState(false);
  

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

   const logoutHandler =()=>{
    signOut(auth).then(()=>{
     navigate('/');
    })
    
   }

 

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoad(true);
    const ref = usersRef;
    const _data = await getDocs(ref);
    setUser(_data.docs.map((prev) => ({ ...prev.data(), id: prev.id })));
    setLoad(false);
  };


  const addData = async () => {
    if (add.name === '' || add.age === '') {
      swal({
        text: 'Please fill in all the fields',
        icon: 'error',
        buttons: false,
        timer: 2000
      });
      return;
    }

    

    try{
      


      setLoad2(true);
    const ref = usersRef;
    const _data = await addDoc(ref, add);
    setAdd({
      name: '',
      age: '',
    });

      swal({
        text:' Great! Your data added Successfully ',
        icon:"success",
        buttons:false,
        timer:2000
  
      });

      const show = await getDocs(ref);
    setUser(show.docs.map((pre) => ({ ...pre.data(), id: pre.id })));
    
      setAdd({
        name: '',
        age: '',});

    }catch(error){
      swal({
        name:error,
        text:"Oop's Please try again " ,
        icon:"error",
        buttons:false,
        timer:2000})
    }finally{
      setLoad2(false);
    }

  }




  const deleteFun = async (id) => {
    swal({
      text: 'Are you sure you want to delete this data?',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true
    }).then(async (confirmDelete) => {
      if (confirmDelete) {
        const ref = doc(db, "users", id);
        await deleteDoc(ref);
        console.log("Deleted Successfully");
  
        // Show the updated result
        const reff = usersRef;
        const show = await getDocs(reff);
        setUser(show.docs.map((pre) => ({ ...pre.data(), id: pre.id })));
        
        swal({
          text: 'Data deleted successfully',
          icon: 'success',
          buttons: false,
          timer: 2000
        });
      } else {
        swal({
          text: 'Deletion cancelled',
          icon: 'info',
          buttons: false,
          timer: 2000
        });
      }
    });
  };
  

  const updateFun = (id) => {
    const selectedUser = user.find((n) => n.id === id);
    setData({ ...selectedUser });
    setpop(true);
  };

  const updateHandler = async () => {
    if (data.name === '' || data.age === '') {
      swal({
        text: 'Please fill in all the fields',
        icon: 'error',
        buttons: false,
        timer: 2000
      });
      return;
    }
   try{
    setLoad3(true);
      const ref = doc(db, "users", data.id);
      await updateDoc(ref, {
        name: data.name,
        age: data.age,
      });

      const reff = usersRef;
    const show = await getDocs(reff);
    setUser(show.docs.map((pre) => ({ ...pre.data(), id: pre.id })));

      swal({
        text:' Great! Data Updated Successfully ',
        icon:"success",
        buttons:false,
        timer:2000
  
      });



    }catch(error){
      swal({
        name:error,
        text:"Oop's Please try again " ,
        icon:"error",
        buttons:false,
        timer:2000})

    }finally{
      setpop(false);
      setLoad3(false);
    }
    
  };

  return (
    <>
    
    <button className="fixed right-0 py-2 px-4  bg-red-500 text-white  rounded mr-4 mt-4 font-bold  " onClick={logoutHandler}>
      Logout
    </button>
   
    {load ?  <>( 
        <div className=" w-full flex justify-center items-center mt-56">
          <FidgetSpinner
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            ballColors={["green", "red", "blue"]}
            backgroundColor="lightred"
          />
        </div>
      )</> : (
        <div>
          <h1 className="text-center mr-24 py-8 font-bold text-2xl flex justify-center cursor-pointer">
            Google Firebase Crud
          </h1>
          <div className="w-full mx-16 px-44 py-2">
            <input
              className="w-1/3 mx-4   pl-2 pr-8 rounded-lg py-2 mb-2 border-2 border-gray-600"
              type="text"
              required
              placeholder="Enter you Name here.."
              value={add.name}
              onChange={(e) => setAdd({ ...add, name: e.target.value })}
            />
            <input
              className="w-1/3     pl-2 pr-8 rounded-lg py-2 mb-2 border-2 border-gray-600 "
              type="number"
              required
              placeholder="Enter you Age here.."
              value={add.age}
              onChange={(e) => setAdd({ ...add, age: e.target.value })}
            />

            <button
              onClick={addData}
              className="mr-2 p-2 rounded-lg bg-blue-500 text-white mx-4"
            >
              {load2 ? (
                <div >
                  <RotatingLines height="24" width="24" strokeColor="black" />
                </div>
              ) : (
                <AddCircleOutlinedIcon />
              )}
            </button>
          </div>

          <div className="w-full px-56  py-2">
            <table className="min-w-full bg-white border-2 border-gray-600  ">
              <thead className="bg-gray-300 rounded">
                <tr>
                  <th className="px-6 py-3 border-b border-b-gray-600">Name</th>

                  <th className="px-6 py-3 border-b">Age</th>
                  <th className="px-6 py-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {user.map((e) => (
                  <tr key={e.id}>
                    <td className="px-6 py-4 border-b">{e.name}</td>

                    <td className="px-6 py-4 border-b">{e.age}</td>
                    <td className="px-6 py-4 border-b">
                      <button
                        className="mr-2 p-2 rounded bg-red-500 text-white"
                        onClick={() => deleteFun(e.id)}
                      >
                        {" "}
                        <DeleteOutlineOutlinedIcon />
                      </button>
                      <button
                        className="p-2 rounded bg-blue-500 text-white"
                        onClick={() => updateFun(e.id)}
                      >
                        {" "}
                        <EditOutlinedIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pop && (
            <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center  bg-gray-500 bg-opacity-60">
              <div className="bg-white p-8 rounded-md ">
                <input
                  type="text"
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full rounded-lg  border-2 border-gray-600 pl-2 pr-8 py-2 mb-3 "
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={data.age}
                  onChange={(e) => setData({ ...data, age: e.target.value })}
                  className="w-full pl-4 pr-8 rounded-lg py-2 mb-2 border-2 border-gray-600 "
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={updateHandler}
                >
                 {load3 ? <RotatingLines strokeColor="black" height={30} width={30} /> : "Update"} 
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Crud;
