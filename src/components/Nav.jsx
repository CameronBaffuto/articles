import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import AddArticle from './AddArticle';
import Articles from './Articles';
import { auth } from "../firebaseConfig";

export default function Nav() {

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
        auth.onAuthStateChanged((user) => {
              setCurrentUser(user);
              console.log(user);
        })
  }, [])

  return (

 <BrowserRouter>
   
<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-5">
        <Link to="articles" class="navbar-brand"><i class="fas fa-kiwi-bird"></i> InstaCam</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
            <Link to="add" className="nav-link"><i class="fas fa-plus-circle"></i> Add New</Link>
        </li>
        
      </ul>
      <ul class="navbar-nav ms-auto">
      {/* <span class="navbar-text px-5 mt-2 text-warning">
          {currentUser ? <p><img src={currentUser.photoURL} alt="usr" style={{ height: "3vh" }}/> Welcome to InstaCam, {currentUser.email} </p> : <p>Welcome to InstaCam </p>}    
        </span> */}
        <li class="nav-item">
              <button onClick={() => auth.signOut()} className="btn btn-danger mt-2">Logout <i class="fas fa-sign-out-alt"></i></button>
        </li>
      </ul>
      
    </div>
</nav>
      <Routes>
            <Route path="/" exact={true} element={<Articles />}></Route>
            <Route path="articles" exact={true} element={<Articles />}></Route>
            <Route path="add" exact={true} element={<AddArticle />}></Route>
      </Routes>
 
 </BrowserRouter>

  );}
