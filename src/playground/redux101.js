import { createStore } from 'redux';

console.log(`redux-101`);

//Reducers:
// 1. Reducers are pure functions
// 2. Never want to directly change state of action

const countReducer = (state = {count : 0 }, action) => {
    
    switch (action.type){
        case 'INCREMENT':
            return { count: state.count + action.incrementBy};
            break;
        case 'DECREMENT':
            return {count: state.count - action.decrementBy};
            break;
        case 'RESET':
            return {count: 0};
            break;
        case 'SET':
            return {count: action.count};
            break;
        default:
        return state;
        
}};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

// store.subscribe(() => {
//     console.log(store.getState());
// });
// call unsubscribe() to kill the subscribe function 
//otherwise the declaration of store.subscirbe will start the subscribe service

const incCount = ({incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decCount = ({decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () => ({
    type: 'RESET'
});

const setCount = ({count}) => ({
    type: 'SET',
    count
});






// const unsubscribe = store.subscribe(() => {
//     console.log(store.getState());
// });

// console.log(store.getState());

//Actions - an object that gets sent to the store to trigger an action


// //Increments the count
store.dispatch(incCount({incrementBy: 100000}));
//     console.log(store.getState());

store.dispatch((decCount({decrementBy: 500000})));
//     console.log(store.getState());

store.dispatch((resetCount()));

store.dispatch((setCount({count: 4545})));



    // store.dispatch({
    //     type: 'DECREMENT'
    // });
    
//     console.log(store.getState());
    
    // store.dispatch({
    //     type: 'DECREMENT',
    //     decrementBy: 10000
    // });

    // store.dispatch({
    //     type: 'SET',
    //     count: 45
    // });
    
    
//     console.log(store.getState());
    // store.dispatch({
    //     type: 'RESET'
    // });

    // unsubscribe();
//     console.log(store.getState());

//Decrements the count

//Reset