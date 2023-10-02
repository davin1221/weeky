// Hook 
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// component 
import BackBtn from "../components/BackBtn";
import NavBar from "../components/NavBar";
import WriteBtn from "../components/WriteBtn";
import Goal from "../components/Goal";

// Redux
import { useSelector } from "react-redux";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons";

// Firebase
import { auth } from "../config/firebase";

// 상세페이지 
const WeekDetail = () => { 

    // url 파라미터 사용하여 작성날짜 및 weekly/daily 확인 
    const {params} = useParams();
    const writtenDate = params.slice(2);
    const planCategory = params.slice(0,1);

    const [uid, setUid] = useState(); // user Id

    // 날짜 ----------------------------
    // week 날짜 
    const [monday, setMonday] = useState(parseInt(writtenDate));
    const [sunday, setSunday] = useState( new Date(parseInt(writtenDate)).setDate( new Date(parseInt(writtenDate)).getDate() + 6 ) )

    // daily 날짜 
    const [daliyDate, setDailyDate] = useState(new Date(parseInt(writtenDate)));
    const [startDailyHour, setStartDailyHour] = useState(daliyDate.setHours(0,0,0,0));
    const [endDailyHour, setEndDailyHour] = useState(daliyDate.setHours(23,59,59,59));
    
    // 상단 날짜 정보 
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

    // 화면에 나타날 계획
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

    //  plan이 weekly인지 daily 인지 확인하여 해당 날짜에 맞는 plan을 targetPlan 설정(화면 정보 변경 시)
    useEffect(()=> { 
        const newTarget = planCategory === "w" ? weekPlan.filter( (it)=> it.userId === uid && (monday <= it.writtenDate && it.writtenDate <= sunday)) 
                                               : dayPlan.filter( (it)=> it.userId === uid && (startDailyHour <= it.writtenDate && it.writtenDate <= endDailyHour));
        setTargetPlan(newTarget);
    }, [uid, monday, daliyDate, weekPlan, dayPlan])

    // 날짜 이동 
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

    //  plan이 weekly인지 daily 인지 확인하여 해당 날짜에 맞는 plan을 targetPlan 설정 (로딩 시)
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

        {
            targetPlan.length > 0?
                targetPlan.map((it)=> (
                    planCategory === "w" ? <WriteBtn writtenDate={monday} id={it.weekId} empty={false}/> 
                    :  <WriteBtn writtenDate={daliyDate} id={it.dailyId} empty={false}/>
                ))
                :
                planCategory === "w" ? <WriteBtn writtenDate={monday} empty={true}/> 
                :  <WriteBtn writtenDate={daliyDate} empty={true}/>
        }
        
    </div>

</div>
}

export default WeekDetail;
