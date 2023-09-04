import { useState } from "react";
import SignIn from "../components/SignIn";

const Login = () => { 

    // SignIn 보이기
    const [isSignInVisible, setIsSignInVisible] = useState(false);

    const handleSignIn = () => { 
        setIsSignInVisible(!isSignInVisible);
    }



    return <div className="Login">

        <div className="logo_area">
          <img src= {process.env.PUBLIC_URL + '/weeky_logo.png'} alt="img_logoPage"/>
        </div>

        <div className="login_area">
            <div className="login_email">
                <input type="text" required/>
                <label>Email</label>
            </div>

            <div className="login_password">
                <input type="password" required/>
                <label>Password</label>
            </div>
            <button className="login_btn">Login</button>
            <button className="login_google_btn">
                Login with Google
                <img src= {process.env.PUBLIC_URL + '/img/google.png'} />
            </button>
        </div>

        <hr />

        <div className="signin_area">
            <button onClick={handleSignIn}>Let's Sign In</button>
        </div>

        <div className={`signin_box ${isSignInVisible ? "active" : ""}`}>
            <SignIn />
        </div>
        
    </div>

}

export default Login;
