// component 
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";

// Hook 
import { useNavigate, useParams } from "react-router-dom";

// Font Awesome 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons";

// Firebase
import { auth } from "../config/firebase";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { editWeekGoal, addWeekGoal, editDailyGoal, addDailyGoal } from "../store";


const Editor = () => {

    const navigate = useNavigate();

    // url 파라미터로 weekly, daily 정보 및 작성 날짜 가져오기 
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

    let dispatch = useDispatch(); 

    // 주제 
    const mySubject = subject.filter((it)=> it.userId === uid);

     
     // 날짜 관리 --------------
     // weekily 날짜 
     const [monday, setMonday] = useState(parseInt(date));
     const [sunday, setSunday] = useState( new Date(parseInt(date)).setDate( new Date(parseInt(date)).getDate() + 6 ) )
 
     // daily 날짜 
     const [daliyDate, setDailyDate] = useState(new Date(parseInt(date)));
     const [startDailyHour, setStartDailyHour] = useState(daliyDate.setHours(0,0,0,0));
     const [endDailyHour, setEndDailyHour] = useState(daliyDate.setHours(23,59,59,59));
     
     // 화면 상단 날짜 정보
     const dateText = planCategory === "w" ? `${new Date(monday).getFullYear()}.${String(new Date(monday).getMonth()+1).padStart(2, "0")}.${String(new Date(monday).getDate()).padStart(2,"0")} ~ 
                       ${new Date(sunday).getFullYear()}.${String(new Date(sunday).getMonth()+1).padStart(2, "0")}.${String(new Date(sunday).getDate()).padStart(2,"0")}` 
                       : `${daliyDate.getFullYear()}. ${String(daliyDate.getMonth()+1).padStart(2,"0")}. ${String(daliyDate.getDate()).padStart(2,"0")}`;
 

    // 계획  ---------------------
    // 화면에 나타날 계획
    const [targetPlan, setTargetPlan] = useState([]);

    // 계획 데이터가 있는지 없는지 확인 
    const [isEmptyPlan, setIsEmptyPlan] = useState(false);

    useEffect(()=>{
        // 새로운 타겟 : plan이 weekly인지 daily 인지 확인하여 해당 날짜에 맞는 plan을 targetPlan 설정 
        const newTarget = planCategory === "w" ? weekPlan.filter( (it)=> it.userId === uid && (monday <= it.writtenDate && it.writtenDate <= sunday)) 
                                               : dayPlan.filter( (it)=> it.userId === uid && (startDailyHour <= it.writtenDate && it.writtenDate <= endDailyHour));
        setTargetPlan(newTarget);

        // 데이터가 없는 계획인 경우 기본적인 데이터 먼저 세팅하기 
        if(newTarget.length === 0 && uid != null ){ 
            setIsEmptyPlan(true);

            if(planCategory === "w") { 
                const targetForEmpty = [{
                    weekId: `wp_${uid.slice(0,4)}_${date}`,
                    writtenDate: parseInt(date),
                    userId: uid,
                    goal: [{
                        weekPlanGoalId: "",
                        weekGoalSubject: mySubject[0].subject,
                        weekGoalContent: "",
                        weekGoalComplete: false
                    }]
                }]
                setTargetPlan(targetForEmpty);
            } else { 
                const targetForEmpty = [{
                    dailyId: `dp_${uid.slice(0,4)}_${date}`,
                    writtenDate: parseInt(date),
                    userId: uid,
                    goal: [{
                        dailyGoalId: "",
                        dailyGoalSubject: mySubject[0].subject,
                        dailyGoalContent: "",
                        dailyGoalComplete: false
                    }]
                }]
                setTargetPlan(targetForEmpty);
            }                 
        }
    },[uid, monday, daliyDate, weekPlan, dayPlan])

    // 날짜 변경
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
    

    // 계획 지우기 
    const DeletePlan = (id) => { 
        if(planCategory === "w") {
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

    // 계획 입력창 추가하기 
    const addPlan = () => { 
            if(planCategory === "w"){
                 const newPlan = targetPlan.map((it) => ({
                    ...it,
                    goal: [
                      ...it.goal,
                      {
                        weekGoalId: "",
                        weekGoalSubject: mySubject[0].subject,
                        weekGoalContent: "",
                        weekGoalComplete: false
                      }
                    ]
                  }))
                  setTargetPlan(newPlan)
             } else { 
                const newPlan = targetPlan.map((it) => ({
                    ...it,
                    goal: [
                      ...it.goal,
                      {
                        dailyGoalId: "",
                        dailyGoalSubject: mySubject[0].subject,
                        dailyGoalContent: "",
                        dailyGoalComplete: false
                      }
                    ]
                  }))
                  setTargetPlan(newPlan)
             }
    }

    // 주제 선택하기 
    const handleSubject = (e, index) => { 
        if(planCategory === "w"){
            const newPlan = targetPlan.map((it)=>({
                ...it,
                goal: it.goal.map((goal, i)=>{
                    if(i===index){
                        return{
                            ...goal, 
                            weekGoalSubject : e.target.value
                        }
                    }
                    return goal;
                })
            }));
            setTargetPlan(newPlan);
        } else {
            const newPlan = targetPlan.map((it)=>({
                ...it,
                goal: it.goal.map((goal, i)=>{
                    if(i===index){
                        return{
                            ...goal, 
                            dailyGoalSubject : e.target.value
                        }
                    }
                    return goal;
                })
            }));
            setTargetPlan(newPlan);
        }
    }

    // 내용 입력하기 
    const handleContent = (e, index) => {
        if(planCategory === "w"){
            const newPlan = targetPlan.map((it)=>({
                ...it,
                goal: it.goal.map((goal, i)=>{
                    if(i===index){
                        return{
                            ...goal, 
                            weekGoalId : `wg_${uid.slice(0,4)}_${e.target.value.replace(/\s+/g, '')}}`,
                            weekGoalContent : e.target.value
                        }
                    }
                    return goal;
                })
            }));
            setTargetPlan(newPlan);
        } else {
            const newPlan = targetPlan.map((it)=>({
                ...it,
                goal: it.goal.map((goal, i)=>{
                    if(i===index){
                        return{
                            ...goal, 
                            dailyGoalId : `dg_${uid.slice(0,4)}_${e.target.value.replace(/\s+/g, '')}`,
                            dailyGoalContent : e.target.value
                        }
                    }
                    return goal;
                })
            }));
            setTargetPlan(newPlan);
        }
      }

      // 계획 저장
      const savePlan = () => { 
        if(targetPlan.some((it)=>it.goal.some((goal)=> goal.weekGoalContent === ""))) {
            alert("계획을 작성해주세요.")
        } else { 
            if(window.confirm("저장하시겠습니까?")){
                if(isEmptyPlan === false) {
                    planCategory === "w" ? dispatch(editWeekGoal(targetPlan)) : dispatch(editDailyGoal(targetPlan))
                    navigate('/home')
                } else {
                    planCategory === "w" ? dispatch(addWeekGoal(targetPlan)) : dispatch(addDailyGoal(targetPlan))
                    navigate('/home')  
                }
            }
        }
      }

      // 에디터 나가기 
      const handleExit = () => {
        if(window.confirm("작성을 취소하시겠습니까?")) { 
            navigate(-1, {replace:true})
        } 
      }

    return <div className="Editor">
        <NavBar />

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
                    targetPlan.map((it)=>(it.goal.map((goal, index)=>(
                        <div className="edit_goal_item">
                            <select onChange={(e)=>handleSubject(e, index)}>
                            {
                                mySubject.map((it)=>(
                                    <option selected={it.subject === goal.weekGoalSubject || it.subject === goal.dailyGoalSubject}>
                                        {it.subject}
                                    </option>
                                ))
                            }
                            </select>
                            <input placeholder= { goal.weekGoalContent === "" || goal.dailyGoalContent === "" ? "What is your plan?" : "" }
                                   value={goal.weekGoalContent === "" || goal.dailyGoalContent === "" ? "" : `${goal.weekGoalContent || goal.dailyGoalContent}`}
                                   onChange={(e)=>handleContent(e, index)}
                                   />
                            <span onClick={()=> DeletePlan(goal.weekGoalId || goal.dailyGoalId)}>&times;</span>
                        </div>
                  )))) : null
            }


            <div className="edit_add_btn" onClick={addPlan}>
                + add Plan
            </div>

        </div>

        <div className="edit_btn_area">
            <button className="save_btn" onClick={savePlan}>Save Plan</button>
            <button className="exit_btn" onClick={handleExit}>Exit</button>
        </div>
        
    </div>

}

export default Editor;
