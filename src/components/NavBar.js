import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const NavBar = ({navLeft}) => {

  const navigate = useNavigate();

  // 메뉴 선택 여부
  const [burger, setBurger] = useState("burger-bar unclicked");
  const [menu, setMenu] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // 메뉴 보임/숨김 설정
  const UpdateMenu = () => {
    if (!isMenuClicked) {
      setBurger("burger-bar clicked");
      setMenu("menu visible");
    } else {
      setBurger("burger-bar unclicked");
      setMenu("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  // url이 변경되었을 때 메뉴 숨김 설정(없으면 열린채로 따라다님)
  useEffect(()=> {
    if(isMenuClicked) { 
        setIsMenuClicked(false);
        UpdateMenu();
    } 
  },[window.location.pathname]);
  

  // 로그아웃 
  const handleLogout = async () => { 
    try {
      await signOut(auth);
      navigate('/');
  } catch(err){
      console.error(err);
  }
  }

  return (
    <nav className="NavBar">
      <span>
        {navLeft}
      </span>

      <span className="logo_area" onClick={() => {navigate("/home");}}>
        <img src= {process.env.PUBLIC_URL + '/weeky_logo.png'} alt="logo_home"/>
      </span>

      <div className="hamburger_area">
        <div className="hamburger" onClick={UpdateMenu}>
          <div className={burger}></div>
          <div className={burger}></div>
          <div className={burger}></div>
        </div>
      </div>

      <div className={menu}>
        <ul className="menu_area">
          <li>{auth?.currentUser?.email}</li>
          <li onClick={()=> navigate('/mySubject')}>my Subject</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;


// 