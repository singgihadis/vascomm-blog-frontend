function Navbar(){
  var token = "";
  if(localStorage.hasOwnProperty("token")){
    token = localStorage.getItem("token");
  }
  function logout(){
    localStorage.removeItem("token");
    window.location.href = "/";
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="#"><b>Blog</b></a>
        {token != "" && (<button onClick={() => logout()} className="btn btn-danger" type="button">Logout</button>)}
      </div>
    </nav>
  )
}
export default Navbar;
