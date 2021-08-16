import React, { useState, useEffect } from 'react';
import './App.scss';
import Flight from './components/Flight/Flight';
import FilterPanel from './components/FilterPanel/FilterPanel';
import { useDispatch, useSelector } from "react-redux";
import { setFlights, selectFlights } from './app/flightsSlice';

function App() {
  const dispatch = useDispatch();
  const flights = useSelector(selectFlights);
  const [sortedIndices, setSortedIndices] = useState([]);
  const incrementSize = 2;
  const [renderedIndices, setRenderedIndices] = useState([]);

  function renderMore() {
    if (sortedIndices.length - renderedIndices.length >= incrementSize) {
      setRenderedIndices(sortedIndices.slice(0, renderedIndices.length + incrementSize))
    } else {
      setRenderedIndices(sortedIndices)
    }
  }

  useEffect(() => dispatch(setFlights()), [dispatch]);
  useEffect(() => setSortedIndices(flights.map((_, i) => i)), [flights, dispatch]);
  useEffect(() => setRenderedIndices(sortedIndices.slice(0, incrementSize)), [sortedIndices, dispatch]);

  return (
    <div className="app">
      <FilterPanel />

      <section className="results" >
        <div className="results__view-area" >
          {renderedIndices.map((index, i) => <Flight data={flights[index]} key={i} />)}
        </div>

        <div className="results__button-background" >
          <button className="results__button" onClick={renderMore} >Показать еще</button>
        </div>
      </section>
    </div>
  );
}

export default App;

/*
VARIANT A

sortedIndices
incrementSize
renderedIndices useState(sortedIndices.slice(0, incrementSize));

renderMore()
  // sortedIndices.length
  // renderedIndices.length
  // incrementSize
  if (sortedIndices.length - renderedIndices.length >= incrementSize) // добавить к renderedIndices incrementSize
    setRenderedIndices(sortedIndices.slice(0, renderedIndices.length + incrementSize))
  else // отрендерить все sortedIndices
    setRenderedIndices(sortedIndices)

return
  {renderedIndices.map((index, i) => <Flight data={flights[index]} key={i} />)}
*/

/*
VARIANT B

sortedIndices
incrementSize
lastRenderedIndex = useState ( incrementSize - 1 )

renderMore
  const newIndex = lastRenderedIndex + incrementSize;
  setLastRenderedIndex(newIndex < sortedIndices.length ? newIndex : sortedIndices.length + 1);

return
  {sortedIndices.map((index, i) => index <= lastRenderedIndex && <Flight data={flights[index]} key={i} />)}

  так map продолжит итерироваться по sortedIndices, сравнивая индексы, до самого конца. Вероятно, вариант А оптимальнее,
  т. к. в нем рендер не имеет этого недостатка, а renderMore хоть и кажется сложнее, но эта операция выполняется реже, чем рендер
*/