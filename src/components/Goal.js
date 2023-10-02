// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { handleGoalComplete } from "../store";
import { handleDailyGoalComplete } from "../store";

// 목표 아이템
const Goal = ({ uid, id, goalId, complete, subject, content }) => {

    // Redux ----------------------------
    // 함수 Hook
    const dispatch = useDispatch();

    // 주제(subject) 가져오기 
    const mySubject = useSelector((state) => {
        return state.subject.filter((it) => it.userId === uid);
    })

    
    // goal complete(목표 완료/미완료 설정) 
    const handleGoal = () =>{ 
        if(id.substring(0,2) === "wp") {
            dispatch(handleGoalComplete({id, goalId}))
        } else { 
            console.log("id:", id, "goalId", goalId)
            dispatch(handleDailyGoalComplete({id, goalId}))
        }
    }

    return <div className="Goal" onClick={(e)=> e.stopPropagation()}>
                <div className="goal_complete" onClick={handleGoal}>
                    {
                        complete ? <FontAwesomeIcon icon={faSquareCheck} /> 
                                : <FontAwesomeIcon icon={faSquare} />
                    }
                </div>

                <div className="goal_content">
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



