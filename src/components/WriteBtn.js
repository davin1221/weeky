import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faPen, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WriteBtn = ({writtenDate}) => {

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const openBtns = () => { 
        setIsOpen(!isOpen)
    }

    return <div className="WriteBtn">
        
        <div>
            <div className={`edit_btn sm_btn ${isOpen ? 'visible' : 'hidden'}`} 
                 onClick={()=>navigate(`/editor/${writtenDate}`)}>
                <FontAwesomeIcon icon={faPenToSquare} writtenDate={writtenDate}/>
            </div>
            <div className={`delete_btn sm_btn ${isOpen ? 'visible' : 'hidden'}`}>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </div>
        

        <div className="write_btn" onClick={openBtns}>
            <FontAwesomeIcon icon={faPen} />
        </div>
        
    </div>
}

export default WriteBtn;
