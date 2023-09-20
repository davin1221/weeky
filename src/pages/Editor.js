import { useParams } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useSelector } from "react-redux";

const Editor = () => {

    // id 가져오기 
    const {id} = useParams();

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

     // redux ----------------------------
    const weekPlan = useSelector((state) => {
        return state.weekPlan;
    });
    const dayPlan = useSelector((state) => {
        return state.dayPlan;
    });
    const subject = useSelector((state) => {
        return state.subject;
    });
   

    // 주제 가져오기 
    const mySubject = subject.filter((it)=> it.userId === uid);

    // 계획 가져오기
    const [myPlan, setMyPlan] = useState([]);

    useEffect(() => {
        if(id.substring(0,2) === "wp"){
            setMyPlan(weekPlan.filter((it)=> it.weekId === id))
        } else { 
            setMyPlan(dayPlan.filter((it)=> it.dailyId === id))
        }
      }, []);

     // 날짜(weekly)
     const [targetDate, setTargetDate] = useState();
     useEffect(()=>{
        setTargetDate(myPlan.length > 0 ? myPlan[0].writtenDate : null)
     },[myPlan])

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

    const dayText = `${new Date(targetDate).getFullYear()}년 
                    ${String(new Date(targetDate).getMonth()+ 1).padStart(2, "0") }월
                    ${String(new Date(targetDate).getDate()).padStart(2,"0")}일`

    // 함수 

    const handleDay = (direction) => { 

    }

    const goalDelete = (id) => { 
        console.log(id)
        if(id.substring(0,2) === "wg") {
            const newPlan = myPlan.map((it)=>({
                ...it,
                goal: it.goal.filter((goal)=> goal.weekGoalId != id)
            }))
            setMyPlan(newPlan)
        } else { 
            const newPlan = myPlan.map((it)=>({
                ...it,
                goal: it.goal.filter((goal)=> goal.dailyGoalId != id)
            }))
            setMyPlan(newPlan)
        }
    }

    return <div className="Editor">
        <NavBar navLeft={<BackBtn />}/>

        <div className="date_area" style={{fontSize:"18px"}}>
            <span onClick={() => handleDay(-1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            {
                id.substring(0,2) === "wp" ? 
                <div>{weekText}</div> 
                :
                <div>&nbsp;&nbsp;&nbsp;{dayText}&nbsp;&nbsp;&nbsp;</div>
            }
            <span onClick={() => handleDay(1)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </span>
        </div>


        <div className="edit_area">

            {
                myPlan.length > 0 ?
                    myPlan.map((it)=>(it.goal.map((goal)=>(
                        <div className="edit_goal_item">
                            <select>
                            {
                                mySubject.map((it)=>(
                                    <option>{goal.weekGoalSubject || goal.dailyGoalSubject}</option>
                                ))
                            }
                            </select>
                            <input placeholder="What is your plan?" value={`${goal.weekGoalContent || goal.dailyGoalContent}`}/>
                            <span onClick={()=> goalDelete(goal.weekGoalId || goal.dailyGoalId)}>&times;</span>
                        </div>
                  )))) : null
            }

            <div className="edit_goal_item">
                <select>
                   {
                    mySubject.map((it)=>(
                        <option>{it.subject}</option>
                    ))
                   }
                </select>
                <input placeholder="What is your plan?"/>
                <span>&times;</span>
            </div>

            <div className="edit_add_btn">
                + add Plan
            </div>

        </div>

        <div className="edit_btn_area">
            <button className="save_btn">Save Plan</button>
            <button className="exit_btn">Exit</button>
        </div>
        
    </div>

}

export default Editor;