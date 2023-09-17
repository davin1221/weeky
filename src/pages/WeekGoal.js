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

const WeekGoal = () => {

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

    const weekPlan = useSelector((state) => {
        return state.weekPlan;
      });

    const [targetPlan, setTargetPlan] = useState(weekPlan.filter((it)=> it.weekId === id));

    // weekPlan이 바뀌면 다시 세팅하기 
    useEffect(()=>{
        setTargetPlan(weekPlan.filter((it)=> it.weekId === id));
    },[weekPlan])

    // 날짜 정보 가져오기(targetPlan이 없으면 빈 배열 반환)
    const goalDate = targetPlan.length > 0 ? targetPlan[0].writtenDate : []; 
    const [targetDate, setTargetDate] = useState(goalDate);

    // 처음 렌더링일땐 true, 날짜 변경 버튼 누르면 false(아래 useEffect와 관련 있음)
    const [firstResult, setFirstResult] = useState(true);

    // 월요일 구하기 (오늘 날짜 - 오늘 요일 + 1)
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
        if(direction === 1) {
            const newDate = new Date(targetDate);
            newDate.setDate(newDate.getDate() + 7);
            setTargetDate(newDate);
            setFirstResult(false);
        } else { 
            const newDate = new Date(targetDate);
            newDate.setDate(newDate.getDate() - 7);
            setTargetDate(newDate);
            setFirstResult(false);
        }
    }

    // firstResult가 false인 경우(날짜버튼이 눌림) targetDate가 변경되면 setNewTarget을 실행
    // 이런식으로 firstResult에 대한 정보가 없으면 targetDate는 처음 화면이 렌더링되었을 시에도 실행되어서 결과가 뜨지 않음 
    useEffect(() => {
        if(!firstResult) return setNewTarget();
    }, [targetDate]);

    // 날짜 변경 시 targetPlan 새로 세팅
    const setNewTarget = () => { 
        const newTarget = weekPlan.filter((it)=> it.userId === uid &&
        (monday.getTime() <= it.writtenDate && it.writtenDate <= sunday.getTime() ))
        setTargetPlan(newTarget);
    }


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
            {  targetPlan.length > 0 ? 
                targetPlan.map((it)=> it.goal.map((goal)=>(  
                    <Goal id={it.weekId}
                          goalId={goal.weekGoalId}
                          complete={goal.weekGoalComplete}
                          subject={goal.weekGoalSubject}
                          content={goal.weekGoalContent}
                          uid={it.userId} />
                ))) : null
            }
        </div>


    </div>
}

export default WeekGoal;