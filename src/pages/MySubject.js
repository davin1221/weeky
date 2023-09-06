import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Nav from "../components/Nav";

import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import NavBar from "../components/NavBar";
import BackBtn from "../components/BackBtn";

import { auth, db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const MySubject = () =>{ 

    // 색상값(Hexa)을 받을 state
    const [color, setColor] = useState([]);

    // chromePicker on/off
    const [isPicker, setIsPicker] = useState(false);

    // 색상 변경 함수 
    const handleColor = (color) => { 
        setColor(color)
    }

    // subject 정보 받아오기 
    const uid = auth?.currentUser?.uid;
    const subjectRef = collection(db, "user");

    const [subject, setSubject] = useState([]);

    useEffect(()=>{
        getSubject();
    },[])

    useEffect(()=>{
        console.log(subject)
    },[subject])

    const getSubject = async () => { 

        // subject 세팅
        try{
            const data = await getDocs(subjectRef);
            const filteredData = data.docs.map((doc)=>({
                                            ...doc.data(), id: doc.id
                                             }))

            setSubject(JSON.parse(filteredData[0].subject))
        } catch(err){
            console.error(err);
        }
    }


    // subject 추가하기 
    const [newSubjectName, setNewSubjectName] = useState();
    const addColor = () => { 
        console.log(newSubjectName, color)
    }



    return <div className="MySubject">

        <NavBar navRight={<BackBtn/>}/>
        
        <div className="subject_area">
            <div className="subject_top">My Subjects</div>
            <div>
                {   
                    subject.map((it)=>(
                        <div className="subject_item" key={it.subjectId}>
                            <span style={{backgroundColor: `${it.color}`}}>{it.subject}</span>
                            <span><FontAwesomeIcon icon={faXmark}/></span>
                        </div>
                    ))
            }
            </div>
        </div>

        <div className="make_subject_area">
            <div className="subject_top">Make new subject</div>
            <div>
                <input placeholder="Subject Name" onChange={(e)=>setNewSubjectName(e.target.value)}/>
                <input value={color} 
                       onMouseEnter={()=> setIsPicker(true)}
                       onChange={(e)=> handleColor(e.target.value)}
                       placeholder="Pick the color"/>
                <button onClick={addColor}>add</button>
                
                <div className={`chromePicker ${isPicker}`}>
                    <ChromePicker color={color} onChange={(color)=>handleColor(color.hex)}/>
                </div>
            </div>
        </div>
    </div>
}

export default MySubject;


const subDummy = [
    {
        userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
        subjectId: "sub1",
        subject: "영어", 
        color: "#ffd6f5"
    },
    {
        userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
        subjectId: "sub2",
        subject: "운동", 
        color: "#d6e0ff"
    },
    {
        userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
        subjectId: "sub3",
        subject: "생활", 
        color: "#d7ffd6"
    },
    {
        userId: "4qPCMlanKiXhsIDIKeUrIZxi7qm1",
        subjectId: "sub4",
        subject: "코딩", 
        color: "#e3d6ff"
    },
    
];