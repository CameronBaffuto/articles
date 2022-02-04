import Home from "./components/Home";
import SignIn from "./components/SignIn";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
     
      { user ? <Home /> : <SignIn /> }
      
      </div>
   
    
  );
}

export default App;
