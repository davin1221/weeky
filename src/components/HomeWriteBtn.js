const HomeWriteBtn = ({top, right, date}) => { 
    return <div className="HomeWriteBtn" style={{top:`${top}px`, right:`${right}px`}}>
        <ul>
            <li onClick={()=>console.log(date)}>
                Write</li>
            <li>Edit</li>
        </ul>
    </div>
}

export default HomeWriteBtn;
