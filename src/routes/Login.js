import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
function Login() {
  var token = "";
  if(localStorage.hasOwnProperty("token")){
    token = localStorage.getItem("token");
    if(token != ""){
      window.location.href = "/daftar";
    }
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function action(e){
    var formBody = new FormData();
    const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body: "email=" + email + "&password=" + password
      };
      fetch('http://127.0.0.1:3001/login', requestOptions)
          .then(response => response.json())
          .then(data => {
            if(data.is_error){
              alert("Email / password salah");
            }else{
              localStorage.setItem("token",data.token)
              window.location.href = "/daftar";
            }
          });
    e.preventDefault();
  }
  return (
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <div className="card mt-5">
          <div className="card-body">
            <h4><b>LOGIN</b></h4>
            <br />
            <form onSubmit={(e) => action(e)}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input id="email" name="email" onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input id="password" name="password" onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
}
export default Login;
