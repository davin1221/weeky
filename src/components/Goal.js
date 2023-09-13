import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Goal = ({ uid, id, complete, subject, content, needNavigate }) => {


    const mySubject = useSelector((state) => {
        return state.subject.filter((it) => it.userId === uid);
    })

    const navigate = useNavigate();

    const handleNavigate = () => { 
       if(needNavigate) return navigate(`/weekGoal/${id}`);
    }

    return <div className="Goal" key={id}>
        <div className="goal_complete">
            {
                complete ? <FontAwesomeIcon icon={faSquareCheck} /> 
                         : <FontAwesomeIcon icon={faSquare} />
            }
        </div>

        <div className="goal_content"
             onClick={handleNavigate}>
            {(()=>{
                let subColor = "";

                mySubject.map((sub) => {
                if (sub.subject === subject) {
                    subColor = sub.color;
                }
                });
            
                return (
                <span style={{ backgroundColor: subColor }}>{subject}</span>
                );
            })()}
            <span>{content}</span>
        </div>
    </div>
}

export default Goal;



