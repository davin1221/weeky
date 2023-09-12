import { useParams } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";

const WeekGoal = () => {

    const {id} = useParams();

    const weekPlan = useSelector((state) => {
        return state.weekPlan;
      });
      const subject = useSelector((state) => {
        return state.subject;
      });

      console.log(weekPlan)
      console.log(id)
    const targetPlan = weekPlan.filter((it)=> it.weekId === id);
    
    console.log(targetPlan);

    return <div className="WeekGoal">
        <NavBar navLeft={<BackBtn />}/>

        <div className="">
        
        </div>


    </div>
}

export default WeekGoal;