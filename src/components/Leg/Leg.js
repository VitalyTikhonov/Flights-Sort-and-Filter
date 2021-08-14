import './Leg.scss';
import { matchNumInNominativeCase, getDateAndTime, getDurationString, getCityString, getAirlineString } from '../../utils.js';

function Leg({ data }) { // leg.segments
  const segment1 = data.segments[0];
  const segment2 = data.segments[1];
  /* здесь можно было бы сделать сравнение дат или проверку показателя starting, но в предоставленном наборе данных всегда
  не более двух сегментов и они в хронологическом порядке (см. data_analysis.js) */
  const lastSegment = segment2 ? segment2 : segment1;

  const { departureCity, departureAirport } = segment1;
  const { arrivalCity, arrivalAirport } = lastSegment;

  const departureDT = getDateAndTime(segment1.departureDate);
  const arrivalDT = getDateAndTime(lastSegment.departureDate);

  const durationString = getDurationString(data.duration);

  const airlineString = getAirlineString(data.segments.map((segment) => segment.airline))

  return (
    <li className="leg" >
      <h3 className="leg__header" >
        <span className="leg__city" >
          {getCityString(departureCity, departureAirport)}, {departureAirport.caption} <span className="leg__airport-code" >({departureAirport.uid}) </span>
        </span>

        <span className="leg__city" >
          {getCityString(arrivalCity, arrivalAirport)}, {arrivalAirport.caption} <span className="leg__airport-code" >({arrivalAirport.uid}) </span>
        </span>
      </h3>

      <div className="leg__date-time" >
        <span className="leg__time" >{departureDT.time} <span className="leg__date" >{departureDT.date} {departureDT.weekday}</span></span>
        <span className="leg__duration" >{durationString}</span>
        <span className="leg__time" ><span className="leg__date" >{arrivalDT.date} {arrivalDT.weekday}</span> {arrivalDT.time}</span>
      </div>

      <span className="leg__change-number" ><span className="leg__change-number-text" >{matchNumInNominativeCase(data.segments.length - 1)}</span></span>

      <span className="leg__airline" >{airlineString}</span>
    </li>
  )
}

export default Leg;
