import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter.js';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
// import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';


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

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));



firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
        renderApp();
        if (history.location.pathname === '/') {
          history.push('/dashboard');
        }
    });
    } else {
       store.dispatch(logout());
        renderApp();
        history.push('/');
    }
  });