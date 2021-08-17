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
  const [numOfRendered, setNumOfRendered] = useState(2);
  const [renderedIndices, setRenderedIndices] = useState([]);

  function renderMore() {
    if (sortedIndices.length - renderedIndices.length >= numOfRendered) {
      const newNumOfRendered = renderedIndices.length + numOfRendered;
      setRenderedIndices(sortedIndices.slice(0, renderedIndices.length + numOfRendered))
      setNumOfRendered(newNumOfRendered)
    } else {
      setRenderedIndices(sortedIndices)
      setNumOfRendered(sortedIndices)
    }
  }

  function sortFlights(option) {
    const newSortedIndices = [...sortedIndices];
    switch (option) {
      case "price-ascending":
        setSortedIndices(newSortedIndices.sort((a, b) => flights[a].flight.price.total.amount - flights[b].flight.price.total.amount));
        break;
      case "price-descending":
        setSortedIndices(newSortedIndices.sort((a, b) => flights[b].flight.price.total.amount - flights[a].flight.price.total.amount));
        break;
      case "duration":
        setSortedIndices(newSortedIndices.sort((a, b) => flights[a].duration - flights[b].duration));
        break;
      default:
    }

  }

  useEffect(() => dispatch(setFlights()), [dispatch]);
  useEffect(() => setSortedIndices(flights.map((_, i) => i)), [flights, dispatch]);
  useEffect(() => setRenderedIndices(sortedIndices.slice(0, numOfRendered)), [sortedIndices, dispatch]);
  useEffect(() => console.log('renderedIndices', renderedIndices), [renderedIndices]);

  return (
    <div className="app">
      <FilterPanel sortFunction={sortFlights} />

      <section className="results" >
        <div className="results__view-area" >
          {renderedIndices.map((index, i) => <Flight data={flights[index]} key={i} />)}
        </div>

        <div className="results__button-background" >
          <button className="results__button button" onClick={renderMore} >Показать еще</button>
        </div>
      </section>
    </div>
  );
}

export default App;
