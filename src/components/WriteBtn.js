import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faPen, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const WriteBtn = () => {
    return <div className="WriteBtn">
        
        <div>Week</div>
        <div>daliy</div>

        <div className="bigBtn">
            <FontAwesomeIcon icon={faPen} />
        </div>
        
    </div>
}

export default WriteBtn;