import { useParams } from "react-router-dom";

import BackBtn from "../components/BackBtn";
import NavBar from "../components/NavBar";
import DateWeek from "../components/DateWeek";

import { useSelector } from "react-redux";

import Goal from "../components/Goal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

import { auth } from "../config/firebase";
import WriteBtn from "../components/WriteBtn";


const GoalDetail = () => { 

    const handleWeek = () => { 

    }

    const [weekText, setWeekText] = useState();
    
    return<div className="GoalDetail">
    <NavBar navLeft={<BackBtn />}/>

    <div className="date_area">
        <span onClick={() => handleWeek(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <span>{weekText}</span>
        <span onClick={() => handleWeek(1)}>
            <FontAwesomeIcon icon={faChevronRight} />
        </span>
   </div>

    <div className="goal_wrap">
        {/* {  targetPlan.length > 0 ? 
            targetPlan.map((it)=> it.goal.map((goal)=>(  
                <Goal id={it.weekId}
                      goalId={goal.weekGoalId}
                      complete={goal.weekGoalComplete}
                      subject={goal.weekGoalSubject}
                      content={goal.weekGoalContent}
                      uid={it.userId} />
            ))) : null
        } */}

        <WriteBtn />
    </div>

</div>
}

export default GoalDetail;
