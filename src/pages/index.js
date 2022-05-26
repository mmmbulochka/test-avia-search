import SideBar from "../components/side_bar";
import Card from "../components/card";
import style from '../styles/Home.module.css'
import flights from '../store/flights.json'



export default function Home() {
  console.log(flights)
  return (
    <div className={style.home}>
      <div className={style.side_bar}>
        <SideBar/>
      </div>
      <div className={style.content}>
        {flights.result.flights.slice(0,10).map((flight)=>{
          return <Card flight={flight.flight} key={flight.flightToken}/>
        })}
      </div>
    </div>
  )
}
