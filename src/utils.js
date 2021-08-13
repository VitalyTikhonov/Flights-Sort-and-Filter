function getAsNumberAndLastDigit(numberArg) {
  let number;
  let string;
  if (typeof numberArg === 'number') {
    number = numberArg;
    string = numberArg.toString();
  } else {
    number = Number(numberArg);
    string = numberArg;
  }
  const { length } = string;
  const lastDigitStr = string.charAt(length - 1);
  const lastDigitNum = Number(lastDigitStr);
  const lastTwoDigitsStr = string.slice(length - 2);
  const lastTwoDigitsNum = Number(lastTwoDigitsStr);
  const lastButOneDigitStr = string.slice(length - 2, length - 1);
  const lastButOneDigitNum = Number(lastButOneDigitStr);
  const result = {
    number,
    string,
    lastDigitNum,
    lastTwoDigitsNum,
    lastButOneDigitNum,
  };
  return result;
}

export function matchNumInNominativeCase(inputNumber) {
  let resultingString;
  const caseForms = {
    singular: 'пересадка', // …1, кроме …11
    plural: 'пересадки', // …2–4, кроме …12–…14
    genitivePlural: 'пересадок', // 0, …5–9, 10–20, …11
  };
  const {
    number,
    string,
    lastDigitNum,
    lastButOneDigitNum,
  } = getAsNumberAndLastDigit(inputNumber);
  if (number === 0) {
    return resultingString = null;
  }
  if (
    (lastDigitNum >= 5 && lastDigitNum <= 9)
    || lastDigitNum === 0
    || lastButOneDigitNum === 1
  ) {
    resultingString = `${string} ${caseForms.genitivePlural}`;
    return resultingString;
  }
  if (lastDigitNum >= 2 && lastDigitNum <= 4) {
    resultingString = `${string} ${caseForms.plural}`;
    return resultingString;
  }
  if (lastDigitNum === 1) {
    resultingString = `${string} ${caseForms.singular}`;
    return resultingString;
  }
  return resultingString;
}

export function getDateAndTime(timestamp) {
  const string = new Date(timestamp);
  return {
    time: string.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
    date: string.toLocaleDateString('ru', { day: 'numeric', month: 'short' }),
    weekday: string.toLocaleDateString('ru', { weekday: 'short' }),
  }
}

export function getDurationString(duration) {
  const blankDate = new Date(0);
  blankDate.setMinutes(duration);
  return `${blankDate.getUTCHours()} ч ${blankDate.getUTCMinutes()} мин`;
}

export function getAirlineString(airlines) {
  if (airlines.length === 1 || airlines.every((item) => item.uid === airlines[0].uid)) {
    return `Рейс выполняет: ${airlines[0].airlineCode} ${airlines[0].caption}`;
  } else {
    return 'Рейс выполняют:' + airlines.map((item) => ` ${item.airlineCode} ${item.caption}`);
  }
}

export function getCityString(city, airport) {
  return typeof city != 'undefined' ? city.caption : airport.caption.match(/(\W+),/)[1];
}
