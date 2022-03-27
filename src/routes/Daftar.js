import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/Daftar.css';
function Daftar() {
  const [dataUser, setDataUser] = useState({});
  const [data, setData] = useState([]);
  const [dataErrorMessage, setDataErrorMessage] = useState("");
  const [reload, setReload] = useState(0);
  var token = "";
  if(localStorage.hasOwnProperty("token")){
    token = localStorage.getItem("token");
    if(token == ""){
      window.location.href = "/";
    }
  }
  function hapus(id){
    const requestOptions = {
         method: 'POST',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
         },
         body: "token=" + token + "&id=" + id
     };
    fetch('http://127.0.0.1:3002/blog/delete', requestOptions)
    .then(response => response.json())
    .then(data => {
      if(data.is_error){
        alert(data.msg);
      }else{
        alert(data.msg);
        setReload(reload + 1);
      }
    });
  }
  useEffect(() => {
     const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: "token=" + token
      };
      fetch('http://127.0.0.1:3001/login_cek', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.is_error){
          localStorage.removeItem("token");
          window.location.href = "/";
        }else{
          setDataUser(data.data[0]);
          fetch('http://127.0.0.1:3002/blog', requestOptions)
          .then(response => response.json())
          .then(data => {
            if(data.is_error){
              setDataErrorMessage(data.msg);
            }else{
              setData(data.data);
            }
          });
        }
      });
  },[reload]);
  return (
    <div>
      <br />
      <div className="text-end">
        <Link to="/tambah" className="btn btn-primary">Tambah</Link>
      </div>
      {dataErrorMessage != "" && (
        <div className="alert alert-warning">{dataErrorMessage}</div>
      )}
      <br />
      {data.map((item,index) => (
        <div key={"blog" + index} className="card mb-4">
          <div className="card-body">
            {dataUser['role'] == 1 && (
              <div className="text-end">
                <div className="btn-group">
                  <Link to={"/edit/" + item.id} className="btn btn-primary">Edit</Link>
                  <button type="button" className="btn btn-danger" onClick={() => hapus(item.id)}>Hapus</button>
                </div>
              </div>
            )}
            <h4><b>{item.judul}</b></h4>
            <div>
              {item.isi}
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}
export default Daftar;
