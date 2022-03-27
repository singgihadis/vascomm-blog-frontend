import React, { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import { useNavigate } from 'react-router';
function Edit() {
  const params = useParams();
  let navigate = useNavigate();
  var token = "";
  if(localStorage.hasOwnProperty("token")){
    token = localStorage.getItem("token");
    if(token == ""){
      window.location.href = "/";
    }
  }
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  function action(e){
    var formBody = new FormData();
    const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body: "token=" + token + "&id=" + params.id + "&judul=" + judul + "&isi=" + isi
      };
      fetch('http://127.0.0.1:3002/blog/update', requestOptions)
          .then(response => response.json())
          .then(data => {
            if(data.is_error){
              alert("Gagal update data");
            }else{
              navigate("/daftar", { replace: true });
            }
          });
    e.preventDefault();
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
          fetch('http://127.0.0.1:3002/blog', {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
               },
               body: "token=" + token + "&id=" + params.id
           })
          .then(response => response.json())
          .then(data => {
            if(data.is_error){
              alert(data.msg);
            }else{
              setJudul(data.data[0]['judul']);
              setIsi(data.data[0]['isi']);
            }
          });
        }
      });
  },[]);
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card mt-5">
          <div className="card-body">
            <h4><b>Edit</b></h4>
            <br />
            <form onSubmit={(e) => action(e)}>
              <div className="mb-3">
                <label className="form-label">Judul</label>
                <input id="judul" name="judul" value={judul} onChange={(e) => setJudul(e.target.value)} type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Isi</label>
                <textarea id="isi" name="isi" onChange={(e) => setIsi(e.target.value)} className="form-control" value={isi}></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Edit;
