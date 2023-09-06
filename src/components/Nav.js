import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Nav = ({navRight}) => { 

    const navigate = useNavigate();

    return <nav className="NavBar">
                <span onClick={()=> navigate(-1)}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </span>

                <span className="logo_area" onClick={() => {navigate("/");}}>
                    <img src= {process.env.PUBLIC_URL + '/weeky_logo.png'} alt="logo_home"/>
                </span>

                <div className="nav_right">
                    {navRight}
                </div>
            </nav>
}

export default Nav;