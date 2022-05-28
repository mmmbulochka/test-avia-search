import style from './index.module.css';
import dayjs from 'dayjs';

const MINUTE = 1000 * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

function getDiff(from, to) {
  let diff = Math.abs(from - to);
  const result = {};
  if (diff > DAY) {
    result.days = Math.floor(diff / DAY);
    diff = diff % DAY;
  }

  if (diff > HOUR) {
    result.hours = Math.floor(diff / HOUR);
    diff = diff % HOUR;
  }

  result.minutes = Math.floor(diff / MINUTE);

  return result;
}

function Flight(props) {
  let from = props.leg.segments[0];
  let to = props.leg.segments[props.leg.segments.length - 1];
  let departureDate = dayjs(from.departureDate);
  let arrivalDate = dayjs(to.arrivalDate);
  const diff = getDiff(arrivalDate.unix() * 1000, departureDate.unix() * 1000);
  return (
    <div className={style.flights}>
      <div className={style.cities}>
        <div className={style.departure_block}>
          <div>
            {from.departureCity?.caption},{from.departureAirport?.caption}
          </div>
          <div className={style.airport_short}>&nbsp;({from.departureAirport?.uid})</div>
        </div>{' '}
        ->
        <div className={style.departure_block}>
          <div>
            {to.arrivalCity?.caption},{to.arrivalAirport?.caption}
          </div>
          <div className={style.airport_short}>&nbsp;({to.arrivalAirport?.uid})</div>
        </div>
      </div>
      <div className={style.line}></div>
      <div className={style.time}>
        <div className={style.time_block}>
          <div>
            {departureDate.format('HH')}:{departureDate.format('mm')}
          </div>
          <div className={style.date}>
            {departureDate.date()} {departureDate.format('MMM')}{' '}
            {departureDate.format('dd')}
          </div>
        </div>
        <div className={style.diff_img}>
          <img src={'clock.png'} className={style.img} />
          <div className={style.diff}>
            {diff.days && diff.days + ' д'} {diff.hours && diff.hours + ' ч'}{' '}
            {diff.minutes && diff.minutes + ' мин'}
          </div>
        </div>

        <div className={style.time_block}>
          <div className={style.date}>
            {arrivalDate.date()} {arrivalDate.format('MMM')}{' '}
            {arrivalDate.format('dd')}
          </div>

          <div>
            {arrivalDate.format('HH')}:{arrivalDate.format('mm')}
          </div>
        </div>
      </div>
      <div className={style.transfer}>
        {to ? (
          <div className={style.transfer_block}>
            <div className={style.transfer_line} />1 пересадка
            <div className={style.transfer_line} />
          </div>
        ) : (
          ''
        )}
      </div>
      <div>Рейс выполняет: {from.airline.caption}</div>
    </div>
  );
}

export default Flight;
