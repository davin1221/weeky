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
  let dispatch = useDispatch(); // dispatch

  // 해당 유저의 weekPlan, subject ----------------------------
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

  const filteredWeekPlan = weekPlan.filter((it) => it.userId === uid);
  const filteredSubject = subject.filter((it) => it.userId === uid);

  console.log("plan: ", filteredWeekPlan);
  console.log("sub:: ", filteredSubject);

  //  주(week) 설정 ----------------------------
  const [currentDate, setCurrentDate] = useState(new Date()); // 오늘 날짜 Thu Sep 07 2023 23:03:15 GMT+0900 (한국 표준시)

  const currentDay = currentDate.getDay(); // 오늘 요일 일 0 ~ 토 6

  // 월요일 구하기 (오늘 날짜 - 오늘 요일 + 1)
  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - currentDay + 1);

  // 일요일 구하기 (오늘 날짜 - 오늘 요일 + 7)
  const sunday = new Date(currentDate);
  sunday.setDate(currentDate.getDate() - currentDay + 7);

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
    (it) => mondayMs >= it.writtenDate && it.writtenDate <= sundayMs
  );

  // 주제
  const [subColor, setSubColor] = useState();



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

            {
                thisWeekPlan.map((it)=> (
                    it.goal.map((goal)=> {
                        // subject 정보에서 이름이 일치하는 정보를 찾아 색상 지정 
                        let subColor = '';

                        filteredSubject.map((sub)=>{
                            if(sub.subject === goal.weekGoalSubject) { 
                                subColor = sub.color;
                            }
                        });
                        
                        return (
                                <span className="goal_item" key={goal.weekGoalId}>
                                    <span>
                                        <FontAwesomeIcon icon={faSquareCheck} />
                                    </span>
                                    <span className="subject" style={{backgroundColor:`${subColor}`}}>{goal.weekGoalSubject}</span>
                                    <span>{goal.weekGoalContent}</span>
                                </span>
                            )
                        })
                        ))
            }

          


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
              <span>
                <FontAwesomeIcon icon={faSquareCheck} />
              </span>
              <span className="subject sub_영어">영어</span>
              <span>영단어 100개 암기</span>
            </span>
            <span className="goal_item">
              <span>
                <FontAwesomeIcon icon={faSquare} />
              </span>
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
              <span>
                <FontAwesomeIcon icon={faSquareCheck} />
              </span>
              <span className="subject sub_영어">영어</span>
              <span>영단어 100개 암기</span>
            </span>
            <span className="goal_item">
              <span>
                <FontAwesomeIcon icon={faSquare} />
              </span>
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
              <span>
                <FontAwesomeIcon icon={faSquareCheck} />
              </span>
              <span className="subject sub_영어">영어</span>
              <span>영단어 100개 암기</span>
            </span>
            <span className="goal_item">
              <span>
                <FontAwesomeIcon icon={faSquare} />
              </span>
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
              <span>
                <FontAwesomeIcon icon={faSquareCheck} />
              </span>
              <span className="subject sub_영어">영어</span>
              <span>영단어 100개 암기</span>
            </span>
            <span className="goal_item">
              <span>
                <FontAwesomeIcon icon={faSquare} />
              </span>
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
              <span>
                <FontAwesomeIcon icon={faSquareCheck} />
              </span>
              <span className="subject sub_영어">영어</span>
              <span>영단어 100개 암기</span>
            </span>
            <span className="goal_item">
              <span>
                <FontAwesomeIcon icon={faSquare} />
              </span>
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
              <span>
                <FontAwesomeIcon icon={faSquareCheck} />
              </span>
              <span className="subject sub_영어">영어</span>
              <span>영단어 100개 암기</span>
            </span>
            <span className="goal_item">
              <span>
                <FontAwesomeIcon icon={faSquare} />
              </span>
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
              <span>
                <FontAwesomeIcon icon={faSquareCheck} />
              </span>
              <span className="subject sub_영어">영어</span>
              <span>영단어 100개 암기</span>
            </span>
            <span className="goal_item">
              <span>
                <FontAwesomeIcon icon={faSquare} />
              </span>
              <span className="subject sub_운동">운동</span>
              <span>유산소 50분</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
