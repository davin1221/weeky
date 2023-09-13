import { useParams } from "react-router-dom";

import BackBtn from "../components/BackBtn";
import NavBar from "../components/NavBar";
import DateWeek from "../components/DateWeek";

import { useSelector } from "react-redux";

import Goal from "../components/Goal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const WeekGoal = () => {

    // Plan 정보 가져오기 
    const {id} = useParams();

    const weekPlan = useSelector((state) => {
        return state.weekPlan;
      });

    const [targetPlan, setTargetPlan] = useState(weekPlan.filter((it)=> it.weekId === id));

    console.log("targetPlan ", targetPlan)

    // 날짜 정보 가져오기 
    // 월요일 구하기 (오늘 날짜 - 오늘 요일 + 1)
    let [targetDate, setTargetDate] = useState(targetPlan[0].writtenDate)

    const monday = new Date(targetDate);
    monday.setDate(new Date(targetDate).getDate() - new Date(targetDate).getDay() + 1)
    monday.setHours(0, 0, 0, 0);

    // 일요일 구하기 (오늘 날짜 - 오늘 요일 + 7)
    const sunday = new Date(targetDate);
    sunday.setDate(new Date(targetDate).getDate() - new Date(targetDate).getDay() + 7)
    sunday.setHours(23, 59, 59, 999);

    // 날짜 text 
    const weekText = `${monday.getFullYear()}.${String(
        monday.getMonth() + 1
      ).padStart(2, "0")}.${String(monday.getDate()).padStart(2, "0")}
                         ~ ${sunday.getFullYear()}.${String(
        sunday.getMonth() + 1
      ).padStart(2, "0")}.${String(sunday.getDate()).padStart(2, "0")}`;

    const handleWeek = (direction) => { 
        
        const tempDate = new Date(targetDate);
        if(direction === 1) {
            setTargetDate(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 7))
                   
        } else { 
            setTargetDate(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() - 7))
        }

            

    }

    console.log("mon: ", monday);
            console.log( "sun: ", sunday);

    return <div className="WeekGoal">
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
            {
                targetPlan.map((it)=> it.goal.map((goal)=>(  
                    <Goal id={goal.weekGoalId}
                          complete={goal.weekGoalComplete}
                          subject={goal.weekGoalSubject}
                          content={goal.weekGoalContent}
                          uid={it.userId}/> 
                )))
            }
            

        </div>


    </div>
}

export default WeekGoal;