import { createSlice } from '@reduxjs/toolkit';

/* Вместо подключения API */
import { result } from '../data/flights.json';

const { flights } = result;

export const flightsSlice = createSlice({
  name: 'flights',
  initialState: {
    flightsData: [],
    airlines: [],
  },
  reducers: {
    setFlights: (state) => { // (state, action)
      let carriers = [];
      flights.forEach((item) => {
        item.duration = item.flight.legs.reduce((acc, leg) => acc + leg.duration, 0)

        const newAirline = item.flight.carrier;
        if (carriers.findIndex((carrier) => carrier.uid === newAirline.uid) === -1) {
          carriers.push(newAirline);
        }
      });
      
      state.flightsData = flights;
      state.airlines = carriers;
    },
  },
});

export const { setFlights } = flightsSlice.actions;
export const selectFlights = state => state.flights.flightsData;
export const selectAirlines = state => state.flights.airlines;

export default flightsSlice.reducer;
