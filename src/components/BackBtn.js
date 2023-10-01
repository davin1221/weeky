import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


// 뒤로가기 버튼 
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