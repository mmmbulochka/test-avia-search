import style from './index.module.css';
import Flight from '../flight';
import {Fragment} from 'react';

function Card(props) {
  return (
    <div className={style.card}>
      <div className={style.header}>
        <div className={style.header_airline}>
          <img src={'plane1.png'} className={style.img_plane} />
          <div>{props.flight.carrier.airlineCode}</div>
        </div>

        <div className={style.header_price}>
          <div className={style.header_price_img}>
            <div>{props.flight.price.total.amount}</div>
            <img src={'ruble.svg'} className={style.img_ruble} />
          </div>
          <div className={style.text}>
            Стоимость для одного взрослого пассажира
          </div>
        </div>
      </div>
      <div className={style.content}>
        {props.flight.legs.map((leg, i) => {
          return (
            <Fragment key={i}>
              <Flight leg={leg} />{' '}
              {props.flight.legs.length - 1 !== i && (
                <div className={style.line}></div>
              )}
            </Fragment>
          );
        })}
      </div>
      <div className={style.footer}>Выбрать</div>
    </div>
  );
}

export default Card;
