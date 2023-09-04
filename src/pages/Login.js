import { useState } from "react";
import SignIn from "../components/SignIn";

import { auth, googleProvider } from '../config/firebase'
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";

const Login = () => { 

    // SignIn 보이기
    const [isSignInVisible, setIsSignInVisible] = useState(false);
    const handleSignIn = () => { 
        setIsSignInVisible(!isSignInVisible);
    }

    // 일반 로그인
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    console.log(auth?.currentUser?.email);

    const handleLogin = async () => { 
        try{ 
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch(err){
            if (err.code == 'auth/invalid-email') {
                alert('잘못된 이메일 형식입니다.');
              }
              if (err.code == 'auth/user-not-found') {
                alert('존재하지 않는 아이디입니다.');
              }
              if (err.code == 'auth/wrong-password') {
                alert('비밀번호를 다시 확인해주세요');
              }
              if (err.code == 'auth/too-many-requests') {
                alert('잠시 후 다시 시도해 주세요');
              }
            console.error(err);
        }
    } 

    
    // 구글 로그인
    const signInWithGoogle = async () => { 
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        } catch(err){
            console.error(err);
        }
    }


    return <div className="Login">

        <div className="logo_area">
          <img src= {process.env.PUBLIC_URL + '/weeky_logo.png'} alt="img_logoPage"/>
        </div>

        <div className="login_area">
            <div className="login_email">
                <input type="text" required onChange={(e)=> setEmail(e.target.value)}/>
                <label>Email</label>
            </div>

            <div className="login_password">
                <input type="password" required onChange={(e)=> setPassword(e.target.value)}/>
                <label>Password</label>
            </div>
            <button className="login_btn" onClick={handleLogin}>Login</button>

            <button className="login_google_btn" onClick={signInWithGoogle}>
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
