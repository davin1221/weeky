import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faPen, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteWeekGoals, deletedailyGoals } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";

const WriteBtn = ({writtenDate, id, empty}) => {

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {params} = useParams();
    const planCategory = params.slice(0,1);

    // subject 검사(하나라도 만들지 않으면 계획 작성 불가)
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

    const subject = useSelector((state) => {
        return state.subject;
    });

    const mySubject = subject.filter((it) => it.userId === uid);

    const openBtns = () => { 
        setIsOpen(!isOpen)
    }
    
    const navigateEditor = () => { 
        
        if(mySubject.length === 0) { 
            alert("subject를 하나 이상 만들어주세요");
            navigate(`/mySubject`);
            return;
        } else {
            if(planCategory === "w") { 
                navigate(`/editor/${planCategory}_${writtenDate}`)
            } else { 
                navigate(`/editor/${planCategory}_${writtenDate.getTime()}`)
            }
        }
        
    }

    // 계획 전체 삭제 
    const handleDeleteAll = () => {
        if(planCategory === "w" && !empty) {
            if(window.confirm("데이터를 모두 삭제하시겠습니까?")) {
                dispatch(deleteWeekGoals(id));
            }
        } else if(planCategory === "d" && !empty){ 
            if(window.confirm("데이터를 모두 삭제하시겠습니까?")) {
                dispatch(deletedailyGoals(id));
            }
        } else { 
            alert("삭제할 데이터가 없습니다.")
        }
    }

    return <div className="WriteBtn">
        
        <div>
            <div className={`edit_btn sm_btn ${isOpen ? 'visible' : 'hidden'}`} 
                 onClick={navigateEditor}>
                <FontAwesomeIcon icon={faPenToSquare} writtenDate={writtenDate}/>
            </div>
            <div className={`delete_btn sm_btn ${isOpen ? 'visible' : 'hidden'}`}
                 onClick={handleDeleteAll}>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </div>
        

        <div className="write_btn" onClick={openBtns}>
            <FontAwesomeIcon icon={faPen} />
        </div>
        
    </div>
}

export default WriteBtn;
