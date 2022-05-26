import style from './index.module.css'
import dayjs from 'dayjs'

const MINUTE = 1000 * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

function getDiff(from, to) {
  let diff = Math.abs(from - to)
  const result = {

  }
  if (diff > DAY) {
    result.days = Math.floor(diff / DAY)
    diff = diff % DAY
  }

  if (diff > HOUR) {
    result.hours = Math.floor(diff / HOUR)
    diff = diff % HOUR
  }

  result.minutes = Math.floor(diff / MINUTE)

  return result
}



function Flight(props) {
  let departureDate = dayjs(props.leg.segments[0].departureDate)
  let arrivalDate = dayjs(props.leg.segments[1] ? props.leg.segments[1].arrivalDate : props.leg.segments[0].arrivalDate)
  const diff = getDiff(arrivalDate.unix() * 1000, departureDate.unix() * 1000)
  return <div className={style.flights}>
    <div className={style.cities}>
      <div className={style.departure_block}>
        <div>
          {props.leg.segments[0].departureCity.caption},
          {props.leg.segments[0].departureAirport.caption}
        </div>
        <div className={style.blue}>
          &nbsp;({props.leg.segments[0].departureAirport.uid})
        </div>
      </div> ->
      <div className={style.departure_block}>
        <div>
          {props.leg.segments[1] ? props.leg.segments[1].arrivalCity.caption : props.leg.segments[0].arrivalCity.caption},
          {props.leg.segments[1] ? props.leg.segments[1].arrivalAirport.caption : props.leg.segments[0].arrivalAirport.caption}
        </div>
        <div className={style.blue}>
          &nbsp;({props.leg.segments[1] ? props.leg.segments[1].arrivalAirport.uid : props.leg.segments[0].arrivalAirport.uid})
        </div>
      </div>
    </div>
    <div className={style.time}>
      <div className={style.time_block}>
        <div>
          {departureDate.format('HH')}:{departureDate.format('mm')}
        </div>
        <div className={style.blue_date}>
          {departureDate.date()} {departureDate.format('MMM')} {departureDate.format('dd')}
        </div>
      </div>
      <div className={style.diff}>
        {diff.days && diff.days + ' д'} {diff.hours && diff.hours + ' ч'} {diff.minutes && diff.minutes + ' мин'}
      </div>
      <div className={style.time_block}>
        <div className={style.blue_date}>
          {arrivalDate.date()} {arrivalDate.format('MMM')} {arrivalDate.format('dd')}
        </div>

        <div>
          {arrivalDate.format('HH')}:{arrivalDate.format('mm')}
        </div>
      </div>
    </div>
    <div className={style.transfer}>{props.leg.segments[1] ? '1 пересадка' : ''}</div>
    <div>
      Рейс выполняет: {props.leg.segments[0].airline.caption}
    </div>
  </div>
}

export default Flight