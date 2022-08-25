import React from 'react'
import { useState, } from 'react';
import { useNavigate } from "react-router-dom";
const SignUp = (props) => {
  const [credentials, setcredentials] = useState({name: "",email: "",password:""})
  let navigate=useNavigate();
 const handleSubmit =async (e)=>{
      e.preventDefault();
      const responce = await fetch("http://localhost:5000/api/auth/createuser", {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
        
          body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})

        });

     const json= await responce.json();
      console.log(json);
      if (json.success) {
          localStorage.setItem('token', json.authtoken);
          navigate('/');
          props.showAlert("Account Created Successfully", "success");
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
      <h2>Sign Up to use UpNotes</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group" >
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange}  value={credentials.name} minLength={3} required  placeholder="Enter Your Name"/>
    
  </div>
  <div className="form-group" >
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required value={credentials.email} placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} minLength={5} required  placeholder="Password"/>
  </div>
  <div className="form-group">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required placeholder="Confirm Password"/>
  </div>

  <button type="submit"  className="btn btn-primary my-3">Sign Up</button>
</form>
      
    </div>
  )
}

export default SignUp
