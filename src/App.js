import { useEffect } from 'react';
import './App.scss';
import Flight from './components/Flight/Flight';
import FilterPanel from './components/FilterPanel/FilterPanel';

import { result } from './data/flights.json';

const { flights } = result;

function App() {
  return (
    <div className="app">
      <div className="app__left-column" >
        <FilterPanel />
      </div>

      <section className="results" >
        {flights.map((flight, index) => <Flight data={flight} key={index} />)}

        <button className="results__button" >Показать еще</button>
      </section>
    </div>
  );
}

export default App;
