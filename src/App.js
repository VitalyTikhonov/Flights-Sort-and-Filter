import { useEffect } from 'react';
import './App.scss';
import Flight from './components/Flight/Flight';
import FilterPanel from './components/FilterPanel/FilterPanel';

import { result } from './data/flights.json';

const { flights } = result;

function App() {
  return (
    <div className="app">
      <FilterPanel />

      <section className="results" >
        {flights.map((flight, index) => <Flight data={flight} key={index} />)}
      </section>
    </div>
  );
}

export default App;
