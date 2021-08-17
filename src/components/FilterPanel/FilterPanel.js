import React from 'react';
import './FilterPanel.scss';
import { useSelector } from "react-redux";
import { selectAirlines } from '../../app/flightsSlice';

function FilterPanel({ sortFunction }) {
  const airlines = useSelector(selectAirlines);

  function sortData(e) {
    sortFunction(e.target.id);
    console.log({id: e.target.id})
    // switch (e.target.id) {
    //   case price-ascending:
    //     sortFunction
      // case price-descending
      // case duration
    // }

  }

  return (
    <div className="filter" >
      <form className="filter__panel" >
        <fieldset className="filter__group" >
          <legend className="filter__group-caption" >Сортировать</legend>

          <label htmlFor="price-ascending" className="filter__label" >
            <input onChange={sortData} type="radio" className="filter__field" id="price-ascending" name="sort-option" />
            &ndash; по возрастанию цены
          </label>

          <label htmlFor="price-descending" className="filter__label" >
            <input onChange={sortData} type="radio" className="filter__field" id="price-descending" name="sort-option" />
            &ndash; по убыванию цены
          </label>

          <label htmlFor="duration" className="filter__label" >
            <input onChange={sortData} type="radio" className="filter__field" id="duration" name="sort-option" />
            &ndash; по времени в пути
          </label>
        </fieldset>

        <fieldset className="filter__group" >
          <legend className="filter__group-caption" >Фильтровать</legend>

          <label htmlFor="single-change" className="filter__label" >
            <input type="checkbox" className="filter__field" id="single-change" name="filter-option" />
            &ndash; 1 пересадка
          </label>

          <label htmlFor="no-changes" className="filter__label" >
            <input type="checkbox" className="filter__field" id="no-changes" name="filter-option" />
            &ndash; без пересадок
          </label>
        </fieldset>

        <fieldset className="filter__group" >
          <legend className="filter__group-caption" >Цена</legend>

          <label htmlFor="minimum" className="filter__label filter__label_price" >
            От
            <input type="number" className="filter__field filter__field_price" id="minimum" name="filter-option" />
          </label>

          <label htmlFor="maximum" className="filter__label filter__label_price" >
            До
            <input type="number" className="filter__field filter__field_price" id="maximum" name="filter-option" />
          </label>
        </fieldset>

        <fieldset className="filter__group" >
          <legend className="filter__group-caption" >Авиакомпании</legend>

          {airlines && airlines.map((item) => (
            <label htmlFor={item.uid} className="filter__label" key={item.uid} >
              <input type="checkbox" className="filter__field" id={item.uid} name="filter-option" />
              &ndash; {item.caption}
            </label>
          ))}
        </fieldset>
      </form>
    </div>
  );
}

export default FilterPanel;
