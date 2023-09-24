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

    // 해당 유저의 weekPlan, dayPaln, subject ----------------------------
    const [uid, setUid] = useState(); // user Id

    // week 날짜 
    const [monday, setMonday] = useState(parseInt(writtenDate));
    const [sunday, setSunday] = useState( new Date(parseInt(writtenDate)).setDate( new Date(parseInt(writtenDate)).getDate() + 6 ) )

    // daily 날짜 
    const [daliyDate, setDailyDate] = useState(new Date(parseInt(writtenDate)));
    const [startDailyHour, setStartDailyHour] = useState(daliyDate.setHours(0,0,0,0));
    const [endDailyHour, setEndDailyHour] = useState(daliyDate.setHours(23,59,59,59));
    
    const dateText = planCategory === "w" ? `${new Date(monday).getFullYear()}.${String(new Date(monday).getMonth()+1).padStart(2, "0")}.${String(new Date(monday).getDate()).padStart(2,"0")} ~ 
                      ${new Date(sunday).getFullYear()}.${String(new Date(sunday).getMonth()+1).padStart(2, "0")}.${String(new Date(sunday).getDate()).padStart(2,"0")}` 
                      : `${daliyDate.getFullYear()}. ${String(daliyDate.getMonth()+1).padStart(2,"0")}. ${String(daliyDate.getDate()).padStart(2,"0")}`;

    // redux ----------------------------
    const weekPlan = useSelector((state) => {
        return state.weekPlan;
    });
    const subject = useSelector((state) => {
        return state.subject;
    });
    const dayPlan = useSelector((state) => {
        return state.dayPlan;
    });


    const [targetPlan, setTargetPlan] = useState([]);

     // userId가 null일때 오류 안나오게 하기
     useEffect(() => {
        const currentUserUid = auth?.currentUser?.uid;
        if (currentUserUid === null) {
        console.log("uid없음");
        } else {
        setUid(currentUserUid);
        }
       
    }, []);

    useEffect(()=> { 
        const newTarget = planCategory === "w" ? weekPlan.filter( (it)=> it.userId === uid && (monday <= it.writtenDate && it.writtenDate <= sunday)) 
                                               : dayPlan.filter( (it)=> it.userId === uid && (startDailyHour <= it.writtenDate && it.writtenDate <= endDailyHour));
        setTargetPlan(newTarget);
    }, [uid, monday, daliyDate, weekPlan, dayPlan])

    const handleDate = (direction) => { 
        if(planCategory === "w") {
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
        } else { 
            if(direction === -1){
                const newDailydate = new Date( daliyDate.setDate(daliyDate.getDate() - 1) )
                setDailyDate(newDailydate)
                const newStartHour = new Date( newDailydate.setHours(0,0,0,0))
                setStartDailyHour(newStartHour)
                const newEndHour = new Date( newDailydate.setHours(23,59,59,59))
                setEndDailyHour(newEndHour)

            } else { 
                const newDailydate = new Date( daliyDate.setDate(daliyDate.getDate() + 1) )
                setDailyDate(newDailydate)
                const newStartHour = new Date( newDailydate.setHours(0,0,0,0))
                setStartDailyHour(newStartHour)
                const newEndHour = new Date( newDailydate.setHours(23,59,59,59))
                setEndDailyHour(newEndHour)
            }
        }
    }

    useEffect(()=>{ 
        const newTarget = planCategory === "w" ? weekPlan.filter( (it)=> it.userId === uid && (monday <= it.writtenDate && it.writtenDate <= sunday)) 
                                               : dayPlan.filter( (it)=> it.userId === uid && (startDailyHour <= it.writtenDate && it.writtenDate <= endDailyHour));
        setTargetPlan(newTarget);
    },[])


    return<div className="GoalDetail">
    <NavBar navLeft={<BackBtn />}/>

    <div className="date_area">
        <span onClick={() => handleDate(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <span>{dateText}</span>
        <span onClick={() => handleDate(1)}>
            <FontAwesomeIcon icon={faChevronRight} />
        </span>
   </div>

    <div className="goal_wrap">
        {  targetPlan.length > 0 ? 
            targetPlan.map((it)=> it.goal.map((goal)=>(  
                <Goal id={it.weekId || it.dailyId}
                      goalId={goal.weekGoalId || goal.dailyGoalId}
                      complete={goal.weekGoalComplete || goal.dailyGoalComplete} 
                      subject={goal.weekGoalSubject || goal.dailyGoalSubject}
                      content={goal.weekGoalContent || goal.dailyGoalContent}
                      uid={it.userId} />
            ))) : null
        }

        <WriteBtn writtenDate={params}/>
    </div>

</div>
}

export default WeekDetail;
