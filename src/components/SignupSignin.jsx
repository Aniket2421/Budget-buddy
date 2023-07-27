import React, { useState } from 'react'
import Input from './Input'
import Buttons from './Buttons'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, provider, } from '../firebase';
import {doc,getDoc,setDoc} from "firebase/firestore"
import { Navigate, useNavigate } from 'react-router-dom';
import {signInWithPopup, GoogleAuthProvider } from 'firebase/auth';



const SignupSignin = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [Password,setPassword] = useState("")
    const [loginform,setLogiform] = useState(false)
    const [confirmpassword,setConfirm] = useState("");
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();

    const signupwithemail = () => {
      setLoading(true)
      if(name != "" && email != "" && Password != "" && confirmpassword != ""){
        if(Password == confirmpassword){
          createUserWithEmailAndPassword(auth, email, Password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          toast.success("USer Create")
          setLoading(false)
          setName("")
          setConfirm('')
          setEmail("")
          setPassword("")
          createdoc(user)

          navigate("/dashboard")

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          toast.error(errorMessage)
          setLoading(false)

        })

        }
        else{
        toast.error("Password & ConfirmPasswword dont match")
        setLoading(false)
        }

        }
        

      
      else{
        toast.error("All fields are Mandotry")
        setLoading(false)
      }
      
      }

      const loginUsingEmail = () =>{
        setLoading(true)
        if( email != "" && Password != ""){
         signInWithEmailAndPassword(auth, email, Password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("User Login")
          setLoading(false)
          navigate("/dashboard")


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        // ..
      })
    }else{
      toast.error("All fields are mandtory ")
    }
    }

   async function createdoc (user){
    if(!user) return;
    const useRef = doc(db,"users",user.uid);
    const userData = await getDoc(useRef)

    if(!userData.exists()){

    
    try{
          await setDoc(doc(db,"users",user.uid),{
 name : user.displayName ? user.displayName : name,
 email : user.email,
 photoURL : user.photoURL ? user.photoURL : "",
 createdAt : new Date(),   
    })
    toast.success("Doc Created");
    setLoading(false)

  }catch (e) {
    toast.error(e.message)
    setLoading(false)
  }
  }else{
    toast.error("Doc is already exist")
    setLoading(false)
  }
}

function googleAuth(){
  setLoading(true)
  try{
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    createdoc(user)
    setLoading(false)
    navigate("/dashboard")
    toast.success("User Authnticated")
   // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code; 
    const errorMessage = error.message;
    toast.error(errorMessage)
  });
}
catch(e) {
  setLoading(false)
  toast.error(e.message)
}
}





  return (
    <>
    {loginform ? (    
    <div className="signup-wrapper">
        <h2 className='titel'>Login on
        <span style={{color:"#2970ff"}}> Finacely.</span>
        </h2>
        <form>
            <Input type = 'email' label = {"Email"} state = {email} setState = {setEmail} placeholder = {"xyz@gmail.com"}
            />
             <Input type = "password" label = {"Password"} state = {Password} setState = {setPassword} placeholder = {"1234@xyz"}
            />
             
            <Buttons disabled={loading}   text = {loading ? " loading...": "Login Using Email & Password"} onclick={loginUsingEmail}/>
            <p style={{textAlign:"center"}}>OR7</p>
            <Buttons onclick={googleAuth}  text =  { loading ? " loading..." :"Login with Googel"} blue = {true}/>
            <p className='p-login' onClick={() => setLogiform(!loginform)}>Dont  Have An Account Already ? Click here</p>

        </form>
    </div> 
    ):(  
      <div className="signup-wrapper">
        <h2 className='titel'>Sign Up pn
        <span style={{color:"#2970ff"}}> Finacely.</span>
        </h2>
        <form>
            <Input  label = {"Full Name"} state = {name} setState = {setName} placeholder = {"John Doe"}
            />
             <Input type = 'email' label = {"Email"} state = {email} setState = {setEmail} placeholder = {"xyz@gmail.com"}
            />
             <Input type = "password" label = {"Password"} state = {Password} setState = {setPassword} placeholder = {"1234@xyz"}
            />
             <Input type = "password" label = {"ConfirmPassword"} state = {confirmpassword} setState = {setConfirm} placeholder = {""}
            />
            <Buttons disabled={loading}   text = {loading ? " loading...": "Signup Using Email & Password"} onclick={signupwithemail}/>
            <p>OR</p>
            <Buttons  onclick={googleAuth}    text =  { loading ? " loading..." :"Signup with Googel"} blue = {true}/>
            <p className='p-login'  onClick={() => setLogiform(!loginform)}>or Have An Account Already ? Click here</p>
        </form>
    </div> 
    )}

    </>
  )
}

export default SignupSignin