import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter.js';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
// import { addExpense } from './actions/expenses';
// import { setTextFilter } from './actions/filters';
// import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';
// import './playground/promises';


const store = configureStore();

// store.subscribe(() => console.log(store.getState()));

// let expenseOne = store.dispatch(addExpense({description: 'Water Bill', amount: 100000, createdAt:100}));
// let expenseTwo = store.dispatch(addExpense({description: 'Gas Bill', amount: 66.04, createdAt: 1500}));
// let expenseThree = store.dispatch(addExpense({description: 'Cheese', amount: 19.33, createdAt:-100}));
// let filterOne = store.dispatch(setTextFilter('bill'));

// const state = store.getState();
// let visibleExpenses = getVisibleExpenses(state.expenses, state.filters);


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));