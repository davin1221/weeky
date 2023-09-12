import React, { useEffect, useState } from "react";

// components
import NavBar from "../components/NavBar";
import BackBtn from "../components/BackBtn";

// redux
import { addSubject, deleteSubject } from "../store";

// font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// 색상 라이브러리 
import { ChromePicker } from "react-color";

// firebase 로그인 정보 
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const MySubject = () =>{ 
    
 
    // redux ----------------------------
    let subject = useSelector((state)=> {return state.subject}) // store
    let dispatch = useDispatch(); // dispatch 

    // 해당 유저의 subject ----------------------------
    const [uid, setUid] = useState(); // userId
    
    // userId가 null일때 오류 안나오게 하기 
    useEffect(()=> { 
        const currentUserUid = auth?.currentUser?.uid;
        if (currentUserUid === null) {
            console.log("uid없음");
        } else {
            setUid(currentUserUid); 
        }
    }, []);

    const filteredSubject = subject.filter((it)=> it.userId === uid);

    // 색상 선택 ----------------------------
    const [color, setColor] = useState([]); // 색상값(Hexa)을 받을 state]
    const [isPicker, setIsPicker] = useState(false); // chromePicker on/off

    // 색상 변경 함수 
    const handleColor = (color) => { 
        setColor(color)
    }

    // subject 추가 ----------------------------
    const [newSubjectName, setNewSubjectName] = useState(); // 새로운 주제 이름 
    const handleAddSubject = () => { 
        const newSubjectItem = {
            userId : uid,
            subjectId: `sub_${uid.slice(0,4)}_${newSubjectName}`,
            subject: newSubjectName,
            color: color
        }
        dispatch(addSubject(newSubjectItem));
    }

    // subject 삭제 ----------------------------
    const handleDeleteSubject = (id) => { 
        dispatch(deleteSubject(id));
    }





    return <div className="MySubject">

        <NavBar navLeft={<BackBtn/>}/>
        
        <div className="subject_area">
            <div className="subject_top">My Subjects</div>
            <div>
                {   
                    filteredSubject.map((it)=>(
                        <div className="subject_item" key={it.subjectId}>
                            <span style={{backgroundColor: `${it.color}`}}>{it.subject}</span>
                            <span><FontAwesomeIcon icon={faXmark} onClick={()=>handleDeleteSubject(it.subjectId)}/></span>
                        </div>
                    ))
            }
            </div>
        </div>

        <div className="make_subject_area">
            <div className="subject_top">Make new subject</div>
            <div>
                <input placeholder="Subject Name" onChange={(e)=> setNewSubjectName(e.target.value)}/>
                <input value={color} 
                       onMouseEnter={()=> setIsPicker(true)}
                       onChange={(e)=> handleColor(e.target.value)}
                       placeholder="Pick the color"/>
                <button onClick={handleAddSubject}>add</button>
                
                <div className={`chromePicker ${isPicker}`}>
                    <ChromePicker color={color} onChange={(color)=>handleColor(color.hex)}/>
                </div>
            </div>
        </div>
    </div>
}

export default MySubject;
