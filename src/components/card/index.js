import style from './index.module.css'
import Flight from '../flight'


function Card(props) {
  return <div className={style.card}>
    <div className={style.header}>
      <div className={style.header_airline}>
        <img src={'plane1.png'} className={style.img}/>
        <div>{props.flight.carrier.airlineCode}</div>
      </div>

      <div className={style.header_price}>
        <div>{props.flight.price.total.amount}</div>
        <div className={style.text}>
          Стоимость для одного взрослого пассажира
        </div>
      </div>

    </div>
    <div className={style.content}>
      {props.flight.legs.map((leg, i) => {
        return <Flight leg={leg} key={i}/>
      })}
    </div>
    <div className={style.footer}>Выбрать</div>
  </div>
}

export default Card