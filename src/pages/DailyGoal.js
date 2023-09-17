import NavBar from "../components/NavBar";
import BackBtn from "../components/BackBtn";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useParams } from "react-router-dom";
import Goal from "../components/Goal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons";



const DailyGoal = () => { 

    // user id 가져오기 
    const [uid, setUid] = useState(); // user Id

    // userId가 null일때 오류 안나오게 하기
    useEffect(() => {
      const currentUserUid = auth?.currentUser?.uid;
      if (currentUserUid === null) {
        console.log("uid없음");
      } else {
        setUid(currentUserUid);
      }
    }, []);

  
    // Plan 정보 가져오기 
    const {id} = useParams();

    const dailyPlan = useSelector((state)=> {
        return state.dayPlan;
    })

    const [targetPlan, setTargetPlan] = useState(dailyPlan.filter((it)=> it.dailyId === id));

    // weekPlan이 바뀌면 다시 세팅하기 
    useEffect(()=>{
        setTargetPlan(dailyPlan.filter((it)=> it.dailyId === id));
    },[dailyPlan])


    // 날짜 
    // 날짜 정보 가져오기 
    const goalDate = targetPlan.length > 0 ? targetPlan[0].writtenDate : [];
    const [targetDate, setTargetDate] = useState(goalDate);

    // 처음 렌더링일땐 true, 날짜 변경 버튼 누르면 false(아래 useEffect와 관련 있음)
    const [firstResult, setFirstResult] = useState(true);

    // 날짜 text 
    const dayText = `${new Date(targetDate).getFullYear()}년 
                     ${String(new Date(targetDate).getMonth()+ 1).padStart(2, "0") }월
                     ${String(new Date(targetDate).getDate()).padStart(2,"0")}일`

    console.log(new Date(targetDate))

    const handleDay = () => { 

    }


    return <div className="DialyGoal">
        <NavBar navLeft={<BackBtn />}/>

        <div className="date_area">
            <span onClick={() => handleDay(-1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            <span>&nbsp;&nbsp; {dayText} &nbsp;&nbsp;</span>
            <span onClick={() => handleDay(1)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </span>
       </div>

        <div className="goal_wrap">
            {  targetPlan.length > 0 ? 
                targetPlan.map((it)=> it.goal.map((goal)=>(  
                    <Goal id={it.dailyId}
                          goalId={goal.dailyGoalId}
                          complete={goal.dailyGoalComplete}
                          subject={goal.dailyGoalSubject}
                          content={goal.dailyGoalContent}
                          uid={it.userId} />
                ))) : null
            }
        </div>
    </div>
}

export default DailyGoal;