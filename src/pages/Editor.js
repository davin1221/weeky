import { useParams } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useSelector } from "react-redux";

const Editor = () => {

    const {writtenDate} = useParams();

    const planCategory = writtenDate.slice(0,1);
    const [date, setDate] = useState(writtenDate.slice(2));

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

     // week 날짜 
     const [monday, setMonday] = useState(parseInt(date));
     const [sunday, setSunday] = useState( new Date(parseInt(date)).setDate( new Date(parseInt(date)).getDate() + 6 ) )
 
     // daily 날짜 
     const [daliyDate, setDailyDate] = useState(new Date(parseInt(date)));
     const [startDailyHour, setStartDailyHour] = useState(daliyDate.setHours(0,0,0,0));
     const [endDailyHour, setEndDailyHour] = useState(daliyDate.setHours(23,59,59,59));
     
     const dateText = planCategory === "w" ? `${new Date(monday).getFullYear()}.${String(new Date(monday).getMonth()+1).padStart(2, "0")}.${String(new Date(monday).getDate()).padStart(2,"0")} ~ 
                       ${new Date(sunday).getFullYear()}.${String(new Date(sunday).getMonth()+1).padStart(2, "0")}.${String(new Date(sunday).getDate()).padStart(2,"0")}` 
                       : `${daliyDate.getFullYear()}. ${String(daliyDate.getMonth()+1).padStart(2,"0")}. ${String(daliyDate.getDate()).padStart(2,"0")}`;
 
    // 계획 가져오기
    const [targetPlan, setTargetPlan] = useState([]);

    useEffect(()=>{
        const newTarget = planCategory === "w" ? weekPlan.filter( (it)=> it.userId === uid && (monday <= it.writtenDate && it.writtenDate <= sunday)) 
                                               : dayPlan.filter( (it)=> it.userId === uid && (startDailyHour <= it.writtenDate && it.writtenDate <= endDailyHour));
        setTargetPlan(newTarget);
    },[uid, monday, daliyDate, weekPlan, dayPlan])

    const [firstResult, setFirstResult] = useState(true);

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
    

    const goalDelete = (id) => { 
        console.log(id)
        if(id.substring(0,2) === "wg") {
            const newPlan = targetPlan.map((it)=>({
                ...it,
                goal: it.goal.filter((goal)=> goal.weekGoalId != id)
            }))
            setTargetPlan(newPlan)
        } else { 
            const newPlan = targetPlan.map((it)=>({
                ...it,
                goal: it.goal.filter((goal)=> goal.dailyGoalId != id)
            }))
            setTargetPlan(newPlan)
        }
    }

    return <div className="Editor">
        <NavBar navLeft={<BackBtn />}/>

        <div className="date_area" style={{fontSize:"18px"}}>
            <span onClick={() => handleDate(-1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            <div>{dateText}</div>
            <span onClick={() => handleDate(1)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </span>
        </div>


        <div className="edit_area">

            {
                targetPlan.length > 0 ?
                    targetPlan.map((it)=>(it.goal.map((goal)=>(
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