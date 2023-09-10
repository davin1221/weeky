import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { auth } from "../config/firebase";

const Home = () => {
  // let subject = useSelector((state)=> {return state.subject}) // store

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
  let dispatch = useDispatch(); // dispatch

  // 해당 유저의 weekPlan, dayPaln, subject ----------------------------
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

  // 필터링
  const filteredWeekPlan = weekPlan.filter((it) => it.userId === uid);
  const filteredDayPlan = dayPlan.filter((it) => it.userId === uid);
  const filteredSubject = subject.filter((it) => it.userId === uid);

  //  주(week) 설정 ----------------------------
  const [currentDate, setCurrentDate] = useState(new Date()); // 오늘 날짜 Thu Sep 07 2023 23:03:15 GMT+0900 (한국 표준시)

  const currentDay = currentDate.getDay(); // 오늘 요일 일 0 ~ 토 6

  // 월요일 구하기 (오늘 날짜 - 오늘 요일 + 1)
  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - currentDay + 1);
  //   if(currentDate.getDay()===1) {
  //     monday.setDate(currentDate.getDate() - currentDay);
  //   } else {
  //     monday.setDate(currentDate.getDate() - currentDay + 1);
  //   }
  monday.setHours(0, 0, 0, 0);

  // 일요일 구하기 (오늘 날짜 - 오늘 요일 + 7)
  const sunday = new Date(currentDate);
  sunday.setDate(currentDate.getDate() - currentDay + 7);
  sunday.setHours(23, 59, 59, 999);

  console.log(monday, sunday);
  // 날짜 text 지정
  const weekText = `${monday.getFullYear()}.${String(
    monday.getMonth() + 1
  ).padStart(2, "0")}.${String(monday.getDate()).padStart(2, "0")}
                     ~ ${sunday.getFullYear()}.${String(
    sunday.getMonth() + 1
  ).padStart(2, "0")}.${String(sunday.getDate()).padStart(2, "0")}`;

  // ** 버튼 누르면 주(week) 이동 **
  const handleWeek = (direction) => {
    // direction -1 왼쪽 / 1 오른쪽
    if (direction === -1) {
      // 한 주 감소
      setCurrentDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 7
        )
      );
    } else {
      // 한 주 증가
      setCurrentDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 7
        )
      );
    }
  };

  // 선택된 주의 week paln
  const mondayMs = monday.getTime();
  const sundayMs = sunday.getTime();

  const thisWeekPlan = filteredWeekPlan.filter(
    (it) => mondayMs <= it.writtenDate && it.writtenDate <= sundayMs
  );
  const thisWeekDailyPlan = filteredDayPlan.filter(
    (it) => mondayMs <= it.writtenDate && it.writtenDate <= sundayMs
  );

  console.log("thisWeekDaily: ", thisWeekDailyPlan);

  // 반복할 칸의 개수
  const sevenDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className="Home">
      <NavBar />

      <div className="home_date_area">
        <span onClick={() => handleWeek(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <span>{weekText}</span>
        <span onClick={() => handleWeek(1)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </div>

      <div className="home_week_area">
        <div>This week's plan</div>

        <div className="week_goals">
          {thisWeekPlan.map((it) =>
            it.goal.map((goal) => {
              // subject 정보에서 이름이 일치하는 정보를 찾아 색상 지정
              let subColor = "";

              filteredSubject.map((sub) => {
                if (sub.subject === goal.weekGoalSubject) {
                  subColor = sub.color;
                }
              });

              return (
                <span className="goal_item" key={goal.weekGoalId}>
                  <span>
                    {goal.weekGoalComplete ? (
                      <FontAwesomeIcon icon={faSquareCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faSquare} />
                    )}
                  </span>
                  <span
                    className="subject"
                    style={{ backgroundColor: `${subColor}` }}
                  >
                    {goal.weekGoalSubject}
                  </span>
                  <span>{goal.weekGoalContent}</span>
                </span>
              );
            })
          )}
        </div>
      </div>

      <div className="home_daily_area">
        {sevenDays.map((days, index) => (
          <div className="home_daily_item">
            <div>
              <span>
                {(() => {
                  const thisMonday = new Date(monday);
                  let date = thisMonday.setDate(monday.getDate() + index);
                  return `${new Date(date).getMonth() + 1}/${new Date(
                    date
                  ).getDate()}`;
                })()}
              </span>
              <span>{days}</span>
            </div>

            <div>
            {(() => {
                  const thisMonday = new Date(monday);
                  let date = thisMonday.setDate(monday.getDate() + index);
                  return <GoalItem date={date} item={thisWeekDailyPlan} sub={filteredSubject}/>
                })()}
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


  const GoalItem = ({date, item, sub}) => { 
    
    console.log("sub::", sub);

    return (
        <div>
            {item.map((it) =>
                it.goal.map((goal) => {
                // 날짜가 일치하는 경우 렌더링 
                if (date === new Date(it.writtenDate).setHours(0, 0, 0, 0)) {

                    // 주제 색상 지정
                    let subColor = 'red';
                    sub.map((sub) => {
                        if (sub.subject === goal.dailyGoalSubject) {
                        subColor = sub.color;
                        }
                    });

                    return (
                        <span className={`goal_item ${date}`} key={it.id}>
                            <span>
                            {goal.dailyGoalComplete ? (
                                <FontAwesomeIcon icon={faSquareCheck} />
                            ) : (
                                <FontAwesomeIcon icon={faSquare} />
                            )}
                            </span>

                            {/* 서브 컬러 설정 */}
                            <span className="subject" style={{ backgroundColor: `${subColor}` }}>
                            {goal.dailyGoalSubject}
                            </span>

                            <span>{goal.dailyGoalContent}</span>
                        </span>
                        );
                    } else {
                        return null;
                    }
                })
            )}
        </div>

      );
} 


export default Home;
