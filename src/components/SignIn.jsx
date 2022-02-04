import React, { useState } from 'react';
import { logInWithEmailAndPassword, signInWithGoogle } from '../firebaseConfig';

export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

  return ( 
    <div className="col-md-8 offset-md-2 my-5 p-5">
        <div className="text-center">
       <i class="fas fa-kiwi-bird fa-5x"></i>
            <h1>Welcome to InstaCam</h1>
        </div>    
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            </div>
            <button class="btn btn-primary mt-2" onClick={() => logInWithEmailAndPassword(email, password)}>Login <i class="fas fa-sign-in-alt"></i></button>
            <br/>
            <p className="mt-5">Or</p>
            <button className="btn btn-success " onClick={signInWithGoogle}><i class="fab fa-google"></i> Login with Google</button>
    </div>
  )}
