import { useState } from 'react';
import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => { 

    // 이메일, 비밀번호를 저장할 state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 회원가입 함수 
    const signIn = async () => { 

        // 이메일 정규표현식 
        let emailCheck = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        
        if(!emailCheck.test(email)){
            alert("이메일을 올바르게 작성해주세요.");
            return;
        }
        
        // firebase로 정보 보내기 
        await createUserWithEmailAndPassword(auth, email, password);

        // 가입 완료 후 input 비우기 
        setEmail("");
        setPassword("");
    }


    return <div className="SignIn">
        <div>
            <label>Email</label>
            <input onChange={(e)=> setEmail(e.target.value)} value={email}/>
        </div>
        <div>
            <label>Password</label>
            <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
        </div>

        <button onClick={signIn}>Sign in</button>
    </div>
}

export default SignIn;