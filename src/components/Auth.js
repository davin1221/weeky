import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';

// 어떤 메서드가 들어갈지(구글, 핸폰, 페북..)
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';


export const Auth = () => { 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // console.log(auth?.currentUser?.photoURL);
    console.log(auth?.currentUser?.email);

    const signIn = async () => { 
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch(err){
            console.error(err);
        }
    }

    const signInWithGoogle = async () => { 
        try {
            await signInWithPopup(auth, googleProvider);
        } catch(err){
            console.error(err);
        }
    }

    const logout = async () => { 
        try {
            await signOut(auth);
        } catch(err){
            console.error(err);
        }
    }


    return <div>
        <input placeholder="Email..." onChange={(e)=> setEmail(e.target.value)} />
        <input placeholder="Password..." type="password" onChange={(e)=> setPassword(e.target.value)}/>
        <button onClick={signIn}>Sign in</button>

        <br />

        <button onClick={signInWithGoogle}>Sign with Google</button>

        <br />
        <button>Logout</button>
    </div>
}