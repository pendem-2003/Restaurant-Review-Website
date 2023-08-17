import React from "react";
import Home from "./components/home.js";
import {Routes,Route,Link} from "react-router-dom";
import Login from "./components/login";
import Reviews from "./components/reviews.js";
import AddReviews from "./components/add-reviews.js";
import "./styles/App.css"

function App() {
  const [user, setUser]= React.useState(null);
  function login(user=null){
    setUser(user);
    console.log("Logged in")
  }
  function logOut(){
    setUser(null);
  }
  return (
    <div className="App">
        <nav className="navbar">
          <h3 className="project-name">Restaurant Review Website</h3>
          <ul className="navbar-columns">
                <li><Link to="/home">Home</Link></li>
                {/* <li><Link to={"/reviews"}>Reviews</Link></li> */}
                <li>{user?
                  (<a href="/home" onClick={logOut}>Logout</a>):
                  (<Link to={"/login"} >Login</Link>)
                }
                </li>
          </ul>
        </nav>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/home"} element={<Home/>}/>
          <Route path="/login" element={<Login login={login}/>}/>
          <Route path="/reviews/:id" element={<Reviews user={user}/>}/>
          <Route path="/reviews/add-edit/:id" element={<AddReviews user={user}/>}/>
        </Routes>
    </div>
  );
}

export default App;
