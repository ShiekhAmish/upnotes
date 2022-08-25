import React from 'react'
import { useState, } from 'react';
import { useNavigate } from "react-router-dom";
const Login = (props) => {
    const [credentials, setcredentials] = useState({email: "",password:""})
    let navigate=useNavigate();
   const handleSubmit =async (e)=>{
        e.preventDefault();
        const responce = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              
              
            },
          
            body: JSON.stringify({email:credentials.email,password:credentials.password})
  
          });

       const json= await responce.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert("Logged IN Successfully", "success");
        }
        else{
          props.showAlert("Invalid Credentials", "danger");
        }
    }
    const onChange =(e)=>{
     setcredentials({...credentials,[e.target.name]: e.target.value})
      }
  return (
    <div>
      <h2>Log In to continue UpNotes</h2>
     <form onSubmit={handleSubmit}>
  <div className="form-group" >
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" value={credentials.email} placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password}  placeholder="Password"/>
  </div>

  <button type="submit"  className="btn btn-primary my-3">Log In</button>
</form>
    </div>
  )
}

export default Login
