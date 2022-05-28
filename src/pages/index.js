import SideBar from '../components/side-bar';
import Card from '../components/card';
import style from '../styles/Home.module.css';
import flights from '../store/flights.json';
import {useEffect, useState} from 'react';
import Show from '../components/show/index.js';

export default function Home() {
  const [sort, setSort] = useState('up');
  const [filter, setFilter] = useState(0);
  const [price, setPrice] = useState({
    min: 0,
    max: 1000000,
  });
  const [airlines, setAirlines] = useState([]);
  const [show, setShow] = useState(2);
  let steps = {};

  useEffect(() => {
    setAirlines([]);
  }, [filter]);

  flights.result.flights.forEach((flight) => {
    flight.flight.legs.forEach((leg) => {
      steps[leg.segments.length - 1] = true;
    });
  });

  let filteredFlights = flights.result.flights.filter((flight) => {
    const stepsValid = flight.flight.legs.every((leg) => {
      return leg.segments.length - 1 <= filter;
    });
    if (stepsValid === false) {
      return false;
    }
    const priceValid =
      flight.flight.price.total.amount >= +price.min &&
      flight.flight.price.total.amount <= +price.max;
    if (priceValid === false) {
      return false;
    }
    return true;
  });
  filteredFlights.sort((flight1, flight2) => {
    if (sort === 'up') {
      return (
        flight1.flight.price.total.amount - flight2.flight.price.total.amount
      );
    }
    if (sort === 'down') {
      return (
        flight2.flight.price.total.amount - flight1.flight.price.total.amount
      );
    }
    if (sort === 'time') {
      let diffFlight1 = 0;
      let diffFlight2 = 0;
      flight1.flight.legs.forEach((leg) => {
        let from = +new Date(leg.segments[0].departureDate);
        let to = +new Date(leg.segments[leg.segments.length - 1].arrivalDate);
        diffFlight1 += to - from;
      });
      flight2.flight.legs.forEach((leg) => {
        let from = +new Date(leg.segments[0].departureDate);
        let to = +new Date(leg.segments[leg.segments.length - 1].arrivalDate);
        diffFlight2 += to - from;
      });

      return diffFlight1 - diffFlight2;
    }
  });
  let bestPrices = {};
  filteredFlights.forEach((flight) => {
    let caption = flight.flight.carrier.caption;
    let price = +flight.flight.price.total.amount;
    if (caption in bestPrices) {
      if (price < bestPrices[caption]) {
        bestPrices[caption] = price;
      }
    } else {
      bestPrices[caption] = price;
    }
  });
  filteredFlights = filteredFlights.filter((flight) => {
    if (airlines.length === 0) {
      return true;
    }
    return airlines.includes(flight.flight.carrier.caption);
  });
  return (
    <div className={style.home}>
      <div className={style.side_bar}>
        <SideBar
          className={style.side_bar}
          bestPrices={bestPrices}
          sort={sort}
          setSort={setSort}
          filter={filter}
          setFilter={setFilter}
          price={price}
          setPrice={setPrice}
          steps={steps}
          airlines={airlines}
          setAirlines={setAirlines}
        />
      </div>
      <div className={style.body}>
        <div className={style.content}>
          {filteredFlights.slice(0, show).map((flight) => {
            return <Card flight={flight.flight} key={flight.flightToken} />;
          })}
        </div>
        <Show show={show < filteredFlights.length}>
          <button
            className={style.button}
            onClick={() => {
              setShow(show + 2);
            }}
          >
            Показать еще
          </button>
        </Show>
      </div>
    </div>
  );
}
