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

      console.log("mypaln:", myPlan)
 

    const handleDay = (direction) => { 

    }

    return <div className="Editor">
        <NavBar navLeft={<BackBtn />}/>

        <div className="date_area">
            <span onClick={() => handleDay(-1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            {
                id.substring(0,2) === "wp" ? 
                <div>2023.09.04 ~ 2023.09.10</div> 
                :
                <div>2023년 09월 04일 계획</div>
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
                            <span>&times;</span>
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