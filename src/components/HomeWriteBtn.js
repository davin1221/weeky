const HomeWriteBtn = ({top, right, date}) => { 
    return <div className="HomeWriteBtn" style={{top:`${top}px`, right:`${right}px`}}>
        <ul>
            <li onClick={(e)=>console.log(e.target)}>
                Write</li>
            <li>Edit</li>
        </ul>
    </div>
}

export default HomeWriteBtn;
