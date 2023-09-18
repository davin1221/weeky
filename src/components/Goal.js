import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleGoalComplete } from "../store";
import { handleDailyGoalComplete } from "../store";

const Goal = ({ uid, id, goalId, complete, subject, content, needNavigate }) => {

    // Redux 
    const dispatch = useDispatch();


    const mySubject = useSelector((state) => {
        return state.subject.filter((it) => it.userId === uid);
    })

    const navigate = useNavigate();

    // week, daily 상세페이지 이동
    const handleNavigate = () => { 
       if(id.substring(0,2) === "wp" && needNavigate) {
        navigate(`/weekGoal/${id}`)
       } else { 
        navigate(`/dailyGoal/${id}`)
       }
    }
    
    // goal complete 설정
    const handleGoal = () =>{ 
        if(id.substring(0,2) === "wp") {
            dispatch(handleGoalComplete({id, goalId}))
        } else { 
            dispatch(handleDailyGoalComplete({id, goalId}))
        }
    }

    return <div className="Goal" key={id}>
                <div className="goal_complete" onClick={handleGoal}>
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



