import React from 'react';
import './FilterPanel.scss';
import { useSelector } from "react-redux";
import { selectAirlines } from '../../app/flightsSlice';

function FilterPanel({ filterAndSort }) {
  const airlines = useSelector(selectAirlines);

  function handleChange({ currentTarget, target }) {
    // console.log(currentTarget.type, 'target.type', target.type);
    // console.log(currentTarget.name, currentTarget.id, target.id, target.value);
    // console.log('target.checked', target.checked);
    filterAndSort({
      fieldSetName: currentTarget.name,
      fieldSetId: currentTarget.id,
      fieldId: target.id,
      fieldType: target.type,
      fieldChecked: target.checked,
      fieldValue: parseInt(target.dataset['changeNumber'], 10) || target.value,
      // fieldValue: target.value !== "on" ? target.value : parseInt(target.dataset['changeNumber'], 10),
    });
  }

  return (
    <div className="filter" >
      <form className="filter__panel" >
        <fieldset className="filter__group" name="sort" onChange={handleChange} >
          <legend className="filter__group-caption" >Сортировать</legend>

          <label htmlFor="price-ascending" className="filter__label" >
            <input type="radio" className="filter__field" id="price-ascending" name="sort-option" />
            &ndash; по возрастанию цены
          </label>

          <label htmlFor="price-descending" className="filter__label" >
            <input type="radio" className="filter__field" id="price-descending" name="sort-option" />
            &ndash; по убыванию цены
          </label>

          <label htmlFor="duration" className="filter__label" >
            <input type="radio" className="filter__field" id="duration" name="sort-option" />
            &ndash; по времени в пути
          </label>
        </fieldset>

        <fieldset className="filter__group" id="changes" name="filter" onChange={handleChange} >
          <legend className="filter__group-caption" >Фильтровать</legend>

          <label htmlFor="changes1" className="filter__label" >
            <input type="checkbox" className="filter__field" id="changes1" name="filter-option" data-change-number="1" />
            &ndash; 1 пересадка
          </label>

          <label htmlFor="changes0" className="filter__label" >
            <input type="checkbox" className="filter__field" id="changes0" name="filter-option" data-change-number="0" />
            &ndash; без пересадок
          </label>
        </fieldset>

        <fieldset className="filter__group" id="price" name="filter" onChange={handleChange} >
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

        <fieldset className="filter__group" id="airlines" name="filter" onChange={handleChange} >
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
