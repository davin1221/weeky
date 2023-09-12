import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const BackBtn = () => { 

    const navigate = useNavigate();


    return <>
        <FontAwesomeIcon 
        icon={faChevronLeft} 
        onClick={()=>navigate(-1)}
        style={{cursor:'pointer'}}
        />
    </>
}

export default BackBtn;