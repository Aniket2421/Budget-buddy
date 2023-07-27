import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import userImg from "../assests/userImg.png"

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate()

 useEffect(() => {
  if(user){
    navigate("/dashboard")
  }
 
  },[user,loading]);



    const logout = () =>{
      try{
        signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logout Sucessfully")
          navigate("/")
        }).catch((error) => {
          // An error happened.
          toast.error(error.message)
        });

      }
      catch (e) {
        toast.error(e.message);
      }
      
    }
  return (
    <div className='navbar'>
        <p className='logo'>Financely.</p>
        {user && (
          <div style={{display : "flex",
          alignItems : 'center',
          gap : "0.75rem"
          }}>
            <img src={user.photoURL ? user.photoURL : userImg} alt="" style={{borderRadius : "50%", height:"1.5rem", width:"1.5rem" }}/>
         <p className='link' onClick={logout}>Logout</p>
         
       </div>
       ) }
    </div>
  )
}

export default Header