import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faChevronRight} from "@fortawesome/free-solid-svg-icons";

const DateWeek = () => { 



  //  주(week) 설정 ----------------------------
  const [currentDate, setCurrentDate] = useState(new Date()); // 오늘 날짜 Thu Sep 07 2023 23:03:15 GMT+0900 (한국 표준시)

  const currentDay = currentDate.getDay(); // 오늘 요일 일 0 ~ 토 6

  // 월요일 구하기 (오늘 날짜 - 오늘 요일 + 1)
  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - currentDay + 1);
  monday.setHours(0, 0, 0, 0);

  // 일요일 구하기 (오늘 날짜 - 오늘 요일 + 7)
  const sunday = new Date(currentDate);
  sunday.setDate(currentDate.getDate() - currentDay + 7);
  sunday.setHours(23, 59, 59, 999);

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
  
  
  
  return <div className="DateWeek">
    <span onClick={() => handleWeek(-1)}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </span>
    <span>{weekText}</span>
    <span onClick={() => handleWeek(1)}>
      <FontAwesomeIcon icon={faChevronRight} />
    </span>
  </div>
}


export default DateWeek;