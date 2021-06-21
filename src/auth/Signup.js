import React,{useState} from "react";
import firebase from "firebase/app";
import { Redirect } from "react-router";

const Signup =()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlesubmit=()=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(res=>{
            console.log(res)
         } )
        .catch(error=>(
            console.log(error)
        ))
    };

    const handleonclick =(e)=>{
        e.preventDefault();
        handlesubmit();
        <Redirect to ="/admin"/>
    };

    return(
        <div>
            <h1>Sign up page</h1>
            <input
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={e=>setEmail(e.target.value)}/>
            <br/>
            <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={e=>setPassword(e.target.value)}/>
            <br/>
            <button onClick={handleonclick}>submit</button>
        </div>
    )
};

export default Signup;