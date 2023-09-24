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


const WeekDetail = () => { 

    const {params} = useParams();
    const writtenDate = params.slice(2);
    const planCategory = params.slice(0,1);

    const [monday, setMonday] = useState(parseInt(writtenDate));
    const [sunday, setSunday] = useState( new Date(parseInt(writtenDate)).setDate( new Date(parseInt(writtenDate)).getDate() + 6 ) )


    const dateText = `${new Date(monday).getFullYear()}.${String(new Date(monday).getMonth()+1).padStart(2, "0")}.${String(new Date(monday).getDate()).padStart(2,"0")} ~ 
                      ${new Date(sunday).getFullYear()}.${String(new Date(sunday).getMonth()+1).padStart(2, "0")}.${String(new Date(sunday).getDate()).padStart(2,"0")}`

    const handleWeek = (direction) => { 
        if(direction === -1) {
            const newMonday = new Date(monday).setDate(new Date(monday).getDate() - 7)
            setMonday(newMonday)

            const newSunday = new Date(monday).setDate(new Date(monday).getDate() - 1)
            setSunday(newSunday)
            
        } else { 
            const newMonday = new Date(monday).setDate(new Date(monday).getDate() + 7)
            setMonday(newMonday)

            const newSunday = new Date(monday).setDate(new Date(monday).getDate() + 13)
            setSunday(newSunday)
        }
    }


    return<div className="GoalDetail">
    <NavBar navLeft={<BackBtn />}/>

    <div className="date_area">
        <span onClick={() => handleWeek(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <span>{dateText}</span>
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

export default WeekDetail;
