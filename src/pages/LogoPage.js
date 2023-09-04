import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoPage = () => { 

    const [loading, setLoading] = useState();

    const navigate = useNavigate();

    const timeout = () => { 
        setTimeout(()=>{ 
            navigate('/Login');
        }, 2000);
    }

    useEffect(()=>{ 
        timeout();
        return () => { 
            clearTimeout(timeout);
        }
    });

    return <div className="LogoPage">
       <img src= {process.env.PUBLIC_URL + '/weeky_logo.png'} alt="img_logoPage"/>
    </div>
}

export default LogoPage;