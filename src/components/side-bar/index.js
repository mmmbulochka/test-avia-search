import style from './index.module.css';

function SideBar(props) {
  return (
    <div className={`${style.side_bar} ${props.className}`}>
      <div className={style.block}>
        <h3>Сортировать</h3>
        <div className={style.input_block_group}>
          <label className={style.input_block}>
            <input
              type={'checkbox'}
              onChange={() => {
                props.setSort('up');
              }}
              checked={props.sort === 'up'}
            />
            <div>по возрастанию цены</div>
          </label>
          <label className={style.input_block}>
            <input
              type={'checkbox'}
              onChange={() => {
                props.setSort('down');
              }}
              checked={props.sort === 'down'}
            />
            <div>по убыванию цены</div>
          </label>
          <label className={style.input_block}>
            <input
              type={'checkbox'}
              onChange={() => {
                props.setSort('time');
              }}
              checked={props.sort === 'time'}
            />
            <div>по времени в пути</div>
          </label>
        </div>
      </div>
      <div className={style.block}>
        <h3>Фильтрация</h3>
        <div className={style.input_block_group}>
          {Object.keys(props.steps).map((step) => {
            return (
              <label key={step} className={style.input_block}>
                <input
                  type={'checkbox'}
                  onChange={() => {
                    props.setFilter(+step);
                  }}
                  checked={+step === props.filter}
                />
                {+step === 0 && <div>Без персадок</div>}
                {+step !== 0 && <div>{step} пересадка</div>}
              </label>
            );
          })}
        </div>
      </div>
      <div className={style.block}>
        <h3>Цена</h3>
        <div className={style.input_block_group_price}>
          <div className={style.input_block}>
            <div>От</div>
            <input
              type={'text'}
              onChange={(e) =>
                props.setPrice({max: props.price.max, min: e.target.value})
              }
              value={props.price.min}
            />
          </div>
          <div className={style.input_block}>
            <div>До</div>
            <input
              type={'text'}
              onChange={(e) =>
                props.setPrice({min: props.price.min, max: e.target.value})
              }
              value={props.price.max}
            />
          </div>
        </div>
      </div>
      <div className={style.block}>
        <h3>Авиакомпания</h3>
        <div className={`${style.input_block_group} ${style.airlines}`}>
          {Object.entries(props.bestPrices).map(([airline, price]) => {
            return (
              <label className={style.airline} key={airline}>
                <input
                  type={'checkbox'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.setAirlines([...props.airlines, airline]);
                    } else {
                      props.setAirlines(
                        props.airlines.filter(
                          (compAirline) => compAirline !== airline
                        )
                      );
                    }
                  }}
                  checked={props.airlines.includes(airline)}
                />
                <div>
                  {airline.length > 18 ? airline.slice(0, 14) + '...' : airline}{' '}
                  от {price} p.
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
