const { flights } = require('./data/flights.json').result;

function getPropByPath(dataItemObj, pathString) {
  let result = { ...dataItemObj }
  const segments = pathString.split(".")
  segments.forEach((segment) => {
    result = result[segment]
  })
  /* вернуть значение свойства, лежащего в dataItemObj по пути pathString */
  return result
};

/* В каждом элементе массива flights по пути flight.legs лежит массив "ног" – направлений "туда" и "обратно". В каждом направлении
есть сегменты. Кладем в temporary пары направлений: */
let legPairs = []
flights.forEach((dataItemObj) => legPairs = legPairs.concat(getPropByPath(dataItemObj, "flight.legs")))
/* достать из каждой пары направлений "туда" и "обратно" свойство segments */
const legs = legPairs.map((item) => getPropByPath(item, "segments"))
/* достать из каждого списка сегментов направления свойство segments и разложить его на составляющие, добавив их в итоговый массив */
let segments = []
legs.forEach((leg) => segments.push(...leg))
// /* составить список уник. свойств, встречающихся в массивах segments */
// let propertyKeys = [];
// segments.forEach((item) => {
//   const keys = Object.keys(item)
//   let i = 0;
//   for (let k of keys) {
//     if (!propertyKeys.includes(k)) propertyKeys.push(k);
//     i++;
//   }
// });

// console.log(propertyKeys)

/* 
[
  'classOfServiceCode',
  'classOfService',
  'servicesDetails',

  'stops',
  'techStopInfos',
  'flightNumber',
  'aircraft',
  'airline',
  'operatingAirline'
  'travelDuration',

  'departureDate',
  'departureAirport',
  'departureCity',

  'arrivalDate',
  'arrivalAirport',
  'arrivalCity',

  'starting',
] */

// const multisegmentLegs = legs.filter((leg) => leg.length === 2)

// console.log(multisegmentLegs.every((leg) => {
//   const date1 = new Date(leg[0].departureDate);
//   const date2 = new Date(leg[1].departureDate);
//   return date1.getTime() < date2.getTime()
// }))

/* Возвращает true. Вывод: сегменты в каждой ноге расположены хронологически. */

// console.log(multisegmentLegs.every((leg) => {
//   return leg[0].starting === true && leg[1].starting === false
// }))

/* Возвращает true. Вывод: starting означает "первый сегмент в направлении". */

// console.log(segments.every((segment) => typeof segment.stops === 'number')) // false
// console.log(segments.every((segment) => segment.techStopInfos)) // true

const monosegmentLegs = legs.filter((leg) => leg.length === 1)

// console.log(monosegmentLegs.every((leg) => {
//   return leg[0].starting === true
// }))

// for (let i = 0; i < 9; i++) {
// const segment = segments[i];
// let count120 = 0;
// const deltas = [];
// segments.forEach((segment) => {
//   // console.log(segment)
//   const date1 = new Date(segment.departureDate);
//   const date2 = new Date(segment.arrivalDate);
//   const durCalc = (date2 - date1) / 60000;
//   const { travelDuration } = segment;
//   const delta = travelDuration - durCalc;
//   if (Math.abs(delta) !== 60) {
//     if (!deltas.includes(delta)) deltas.push(delta)
//     count120++;
//   };
//   // }
// })
// console.log(deltas)
// for (let i = 0; i < 9; i++) {
//   console.log(multisegmentLegs[i])
// }

// console.log(multisegmentLegs.some((leg) => {
//   return leg[0].airline.uid === leg[1].airline.uid
// }))

// false???
// console.log(segments.some((segment) => {
//   return segment.arrivalCity
// }))

// true
// console.log('monosegmentLegs', monosegmentLegs.every((leg) => {
//   return leg[0].arrivalCity
// }))

// false - т. е., НЕКОТОРЫЕ ВТОРЫЕ СЕГМЕНТЫ - БЕЗ arrivalCity
// console.log('multisegmentLegs', multisegmentLegs.some((leg) => {
//   return typeof leg[1].arrivalCity == 'undefined'
// }))

// let secondSegmentsWithoutArrivalCity = 0;

// 5 двухсегментных направлений не имеют arrivalCity
// multisegmentLegs.forEach((leg) => {
//   if (typeof leg[1].arrivalCity == 'undefined') {
    // secondSegmentsWithoutArrivalCity++;
    // console.log('leg[0].departureCity', leg[0].departureCity)
    // console.log('leg[0].arrivalCity', leg[0].arrivalCity)
    // console.log('leg[1].departureCity', leg[1].departureCity)
    // console.log('leg[1].arrivalAirport.match()', leg[1].arrivalAirport.caption.match(/(\W+),/)[1])
//   }
// })

// let firstSegmentsWithoutDepartureCity = 0; // 3
// let secondSegmentsWithoutDepartureCity = 0; // 0

// 5 двухсегментных направлений не имеют arrivalCity
// multisegmentLegs.forEach((leg) => {
//   if (typeof leg[0].departureCity == 'undefined') {
//     // firstSegmentsWithoutDepartureCity++;
//     // console.log('City', leg[0].departureCity)
//     console.log("ОТКУДА", leg[0].departureAirport)
//     console.log("КУДА", leg[0].arrivalAirport, 'City', leg[0].arrivalCity)
//     console.log('------------------------------')
//     console.log("ОТКУДА", leg[1].departureAirport, 'City', leg[1].departureCity)
//     console.log('КУДА', leg[1].arrivalAirport, 'City', leg[1].arrivalCity)
//     console.log('============================')
//   }
//   // if (typeof leg[1].departureCity == 'undefined') {
//   //   secondSegmentsWithoutDepartureCity++;
//     // console.log('leg[0].departureCity', leg[0].departureCity)
//     // console.log('leg[0].arrivalCity', leg[0].arrivalCity)
//     // console.log('leg[1].departureCity', leg[1].departureCity)
//     // console.log('leg[1].arrivalAirport.match()', leg[1].arrivalAirport.caption.match(/(\W+),/)[1])
//   // }
// })

// console.log('multisegmentLegs.length', multisegmentLegs.length)
// console.log('firstSegmentsWithoutDepartureCity', firstSegmentsWithoutDepartureCity)
// console.log('secondSegmentsWithoutDepartureCity', secondSegmentsWithoutDepartureCity)

// console.log(segments[0])
// console.log(segments[1])

// const res = flights.every((data) => {
//   const { flight: { price } } = data;
//   const adultPrice = price.passengerPrices.find((item) => item.passengerType.uid === "ADULT").singlePassengerTotal.amount;
  // const adultPrice = parseInt(price.passengerPrices.find((item) => item.passengerType.uid === "ADULT").singlePassengerTotal.amount, 10);
  // const totalPrice = parseInt(price.total.amount, 10);
  // return adultPrice === totalPrice
  // return /\d+\.00/.test(adultPrice)
// })

// console.log('res', res)

// for (let i = 0; i < 9; i++) {
//   // const adultPrice = parseInt(flights[i].flight.price.passengerPrices.find((item) => item.passengerType.uid === "ADULT").singlePassengerTotal.amount, 10);
//   const adultPrice = Number(flights[i].flight.price.passengerPrices.find((item) => item.passengerType.uid === "ADULT").singlePassengerTotal.amount);
//   console.log(adultPrice)
// }

