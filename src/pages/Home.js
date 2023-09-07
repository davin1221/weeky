import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { auth } from "../config/firebase";

const Home = () => { 


    // let subject = useSelector((state)=> {return state.subject}) // store

    // redux ----------------------------
    let weekPlan = useSelector((state)=> {return state.weekPlan})
    let dispatch = useDispatch(); // dispatch 

    // 해당 유저의 weekPlan ----------------------------
    const [uid, setUid] = useState();  // user Id

     // userId가 null일때 오류 안나오게 하기 
     useEffect(()=> { 
         const currentUserUid = auth?.currentUser?.uid;
         if (currentUserUid === null) {
             console.log("uid없음");
         } else {
             setUid(currentUserUid); 
         }
     }, []);

     const filteredWeekPlan = weekPlan.filter((it)=> it.userId === uid); 

     console.log(filteredWeekPlan)

    //  주(week) 설정 ----------------------------
    const [currentDate, setCurrentDate] = useState( new Date()); // 오늘 날짜 Thu Sep 07 2023 23:03:15 GMT+0900 (한국 표준시)
    
    const currentDay = currentDate.getDay() // 오늘 요일 일 0 ~ 토 6

    // 월요일 구하기 (오늘 날짜 - 오늘 요일 + 1)
    const monday = new Date(currentDate);  
    monday.setDate(currentDate.getDate() - currentDay + 1);

    // 일요일 구하기 (오늘 날짜 - 오늘 요일 + 7)
    const sunday = new Date(currentDate);
    sunday.setDate(currentDate.getDate() - currentDay + 7)

    // 날짜 text 지정 
    const weekText = `${monday.getFullYear()}.${String(monday.getMonth()+1).padStart(2,"0")}.${String(monday.getDate()).padStart(2,"0")}
                     ~ ${sunday.getFullYear()}.${String(sunday.getMonth()+1).padStart(2,"0")}.${String(sunday.getDate()).padStart(2,"0")}`;
    
    // ** 버튼 누르면 주(week) 이동 **
    const handleWeek = (direction) => { 
        // direction -1 왼쪽 / 1 오른쪽 
        if(direction === -1) {
            // 한 주 감소 
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7))
        } else { 
            // 한 주 증가 
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7))
        }
    }        

    // 선택된 주의 week paln 


    return <div className="Home">
        <NavBar />

        <div className="home_date_area">
            <span onClick={()=>handleWeek(-1)}><FontAwesomeIcon icon={faChevronLeft}/></span>
            <span>{weekText}</span>
            <span onClick={()=>handleWeek(1)}><FontAwesomeIcon icon={faChevronRight}/></span>
        </div>

        <div className="home_week_area">
            <div>
                This week's plan
            </div>

            <div className="week_goals">
                <span className="goal_item">
                    <span><FontAwesomeIcon icon={faSquareCheck}/></span>
                    <span className="subject sub_영어">영어</span>
                    <span>영단어 20개 암기</span>
                </span>
                <span className="goal_item">
                    <span><FontAwesomeIcon icon={faSquare}/></span>
                    <span className="subject sub_운동">운동</span>
                    <span>헬스 5번 이상 가기</span>
                </span>
            </div>

        </div>

        <div className="home_daily_area">
            <div className="home_daily_item">
                <div>
                    <span>9/4</span>
                    <span>Mon</span>
                </div>
                <div>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquareCheck}/></span>
                        <span className="subject sub_영어">영어</span>
                        <span>영단어 100개 암기</span>
                    </span>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquare}/></span>
                        <span className="subject sub_운동">운동</span>
                        <span>유산소 50분</span>
                    </span>        
                </div>
            </div>
            <div className="home_daily_item">
                <div>
                    <span>9/5</span>
                    <span>The</span>
                </div>
                <div>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquareCheck}/></span>
                        <span className="subject sub_영어">영어</span>
                        <span>영단어 100개 암기</span>
                    </span>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquare}/></span>
                        <span className="subject sub_운동">운동</span>
                        <span>유산소 50분</span>
                    </span>                    
                </div>
            </div>
            <div className="home_daily_item">
                <div>
                    <span>9/6</span>
                    <span>Wed</span>
                </div>
                <div>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquareCheck}/></span>
                        <span className="subject sub_영어">영어</span>
                        <span>영단어 100개 암기</span>
                    </span>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquare}/></span>
                        <span className="subject sub_운동">운동</span>
                        <span>유산소 50분</span>
                    </span>                    
                </div>
            </div>
            <div className="home_daily_item">
                <div>
                    <span>9/7</span>
                    <span>Thu</span>
                </div>
                <div>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquareCheck}/></span>
                        <span className="subject sub_영어">영어</span>
                        <span>영단어 100개 암기</span>
                    </span>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquare}/></span>
                        <span className="subject sub_운동">운동</span>
                        <span>유산소 50분</span>
                    </span>                    
                </div>
            </div>
            <div className="home_daily_item">
                <div>
                    <span>9/8</span>
                    <span>Fri</span>
                </div>
                <div>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquareCheck}/></span>
                        <span className="subject sub_영어">영어</span>
                        <span>영단어 100개 암기</span>
                    </span>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquare}/></span>
                        <span className="subject sub_운동">운동</span>
                        <span>유산소 50분</span>
                    </span>                    
                </div>
            </div>
            <div className="home_daily_item">
                <div>
                    <span>9/9</span>
                    <span>Sat</span>
                </div>
                <div>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquareCheck}/></span>
                        <span className="subject sub_영어">영어</span>
                        <span>영단어 100개 암기</span>
                    </span>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquare}/></span>
                        <span className="subject sub_운동">운동</span>
                        <span>유산소 50분</span>
                    </span>                    
                </div>
            </div>
            <div className="home_daily_item">
                <div>
                    <span>9/10</span>
                    <span>Sun</span>
                </div>
                <div>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquareCheck}/></span>
                        <span className="subject sub_영어">영어</span>
                        <span>영단어 100개 암기</span>
                    </span>
                    <span className="goal_item">
                        <span><FontAwesomeIcon icon={faSquare}/></span>
                        <span className="subject sub_운동">운동</span>
                        <span>유산소 50분</span>
                    </span>                    
                </div>
            </div>

            
            
        </div>
    </div>
}

export default Home;


const dummyWeekData = [
    {
        weekId : "w1",
        startDate : 1699190400000,
        endDate: 1699776000000,
        userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
        weekGoal : [
            {weekGoalId: "wg1",
             weekGoalSubject: "영어",
             weekGaolContent: "영단어 100개 암기",
             weekGoalComplete: true},
             {weekGoalId: "wg2",
             weekGoalSubject: "운동",
             weekGaolContent: "헬스 5번 가기",
             weekGoalComplete: false},
        ]
    },
    {
        weekId : "w2",
        startDate : 1699862400000,
        endDate: 1699913600000,
        userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
        weekGoal : [
            {weekGoalId: "wg3",
             weekGoalSubject: "생활",
             weekGaolContent: "물 2L 매일 마시기",
             weekGoalComplete: true},
             {weekGoalId: "wg4",
             weekGoalSubject: "코딩",
             weekGaolContent: "정보처리기사 1회독 완료",
             weekGoalComplete: false},
        ]
    },
];

const dummyDailyData = [
    {
        weekId : "d1",
        date : 1699190400000,
        userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
        dailyGoal : [
            {dailyGoalId: "dg1",
             dailyGoalSubject: "영어",
             dailyGoalContent: "영단어 20개 암기",
             dailyGoalComplete: true},
             {dailyGoalId: "dg2",
             dailyGoalSubject: "운동",
             dailyGoalContent: "유산소 50분",
             dailyGoalComplete: true},
        ]
    },
    {
        weekId : "d2",
        date : 1699276800000,
        userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
        dailyGoal : [
            {dailyGoalId: "dg3",
             dailyGoalSubject: "생활",
             dailyGoalContent: "커피 안마시고 커피값 카카오뱅크에 저금하기",
             dailyGoalComplete: true},
             {dailyGoalId: "dg4",
             dailyGoalSubject: "운동",
             dailyGoalContent: "런데이 50분",
             dailyGoalComplete: true},
        ]
    },
];