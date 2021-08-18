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
  const increment = 2;
  const [numOfRendered, setNumOfRendered] = useState(increment);
  const [renderedIndices, setRenderedIndices] = useState([]);
  const [sortCriterion, setSortCriterion] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({ changes: {}, price: {}, airlines: {} });

  function renderMore() {
    const newNumOfRendered = Math.min(numOfRendered + increment, sortedIndices.length); // если всего 11, то индексы 0-10; мин(2 + 2, 11) = 4, затем 6, 8, 10, 11...
    setRenderedIndices(sortedIndices.slice(0, newNumOfRendered)) // ...и включ с 0 по 3, затем 0-5, 0-7, 0-9, 0-10
    setNumOfRendered(newNumOfRendered)
  }

  function filterAndSort({ fieldSetName, fieldSetId, fieldId, fieldType, fieldChecked, fieldValue, sortedIndicesInput }) {
    let newSortedIndices;
    switch (fieldSetName) {
      case "sort":
        newSortedIndices = sortedIndicesInput ? [...sortedIndicesInput] : [...sortedIndices];
        switch (fieldId) {
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
            break;
        }
        setSortCriterion(fieldId)
        break;

      case "filter":
        const newFilterCriteria = { ...filterCriteria };
        newFilterCriteria[fieldSetId] = { ...filterCriteria[fieldSetId], [fieldId]: fieldValue };
        /* Удалять поля, если */
        /* неотмеченный чекбокс */
        const a = fieldType === 'checkbox';
        const b = !fieldChecked;
        /* пустое поле (falsy) или [поля нет; но возможно ложное true: мы подставляем для одного из полей цифру, и это мб 0; поэтому проверяю по длине] */
        const c = !fieldValue;
        const d = fieldValue !== 0;
        if ((a && b) || (c && d)) {
          delete newFilterCriteria[fieldSetId][fieldId];
        }

        newSortedIndices = flights.reduce((result, item, index) => {
          const itemPrice = parseInt(item.flight.price.total.amount, 10);
          if (
            (Object.keys(newFilterCriteria.changes).length === 0 || Object.values(newFilterCriteria.changes).includes(item.numOfChanges)) &&
            (!newFilterCriteria.price.minimum || itemPrice >= parseInt(newFilterCriteria.price.minimum, 10)) &&
            (!newFilterCriteria.price.maximum || itemPrice <= parseInt(newFilterCriteria.price.maximum, 10)) &&
            (Object.keys(newFilterCriteria.airlines).length === 0 || Object.keys(newFilterCriteria.airlines).includes(item.flight.carrier.uid))
          ) {
            result.push(index);
          }
          return result;
        }, []);
        setSortedIndices(newSortedIndices)
        sortCriterion && filterAndSort({ fieldSetName: 'sort', fieldId: sortCriterion, sortedIndicesInput: newSortedIndices })
        setFilterCriteria(newFilterCriteria);
        break;
      default:
        break;
    }
  }

  useEffect(() => dispatch(setFlights()), [dispatch]);
  useEffect(() => setSortedIndices(flights.map((_, i) => i)), [flights, dispatch]);
  useEffect(() => {
    // console.log('sortedIndices', sortedIndices)
    setRenderedIndices(sortedIndices.slice(0, numOfRendered));
    console.log('numOfChanges', flights.reduce((acc, item) => {
      if (item.numOfChanges === 0) {
        acc++
        console.log('item.flight.price.total.amount', item.flight.price.total.amount)
      }
      return acc
    }, 0))
  }, [sortedIndices, dispatch]);

  // useEffect(() => console.log('sortCriterion', sortCriterion), [sortCriterion]);

  useEffect(() => {
    // console.log('filterCriteria.price', filterCriteria.price)
    // console.log('Object.values(filterCriteria.changes)', Object.values(filterCriteria.changes))
    // console.log('Object.values(filterCriteria.price)', Object.values(filterCriteria.price))
    // console.log('Object.values(filterCriteria.airlines)', Object.values(filterCriteria.airlines))
  }, [filterCriteria]);

  // useEffect(() => console.log('sortedIndices.length', sortedIndices.length), [sortedIndices]);
  // useEffect(() => console.log('renderedIndices', renderedIndices), [renderedIndices]);

  return (
    <div className="app">
      <FilterPanel filterAndSort={filterAndSort} />

      <section className="results" >
        <div className="results__view-area" >
          {renderedIndices.map((index, i) => <Flight data={flights[index]} key={i} />)}
        </div>

        <div className="results__button-background" >
          {numOfRendered < sortedIndices.length && <button className="results__button button" onClick={renderMore} >Показать еще</button>}
        </div>
      </section>
    </div>
  );
}

export default App;
