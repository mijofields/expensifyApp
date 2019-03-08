import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

console.log(`redux-expensify`);

const demoState = {
    expenses: [{
        id: "ObjectID",
        description: "groceries",
        note: "groceries for cholent",
        amount: 24.99,
        createdAt: Date(),
    }],
    filters: {
        text: "rent",
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }

};

const addExpense = (
    {
    description = '', 
    note = '', 
    amount = 0, 
    createdAt = Date() 
} = {}
    ) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

//Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_EXPENSE':
            return [...state, action.expense];
            break;
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
            break;
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                };    
            });
            break;
        default:
            return state;
    }
}

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = (startDate) =>({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) =>({
    type: 'SET_END_DATE',
    endDate
});


const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
            break;
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
            break;
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
            break;
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
            break;
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
            break;
            
        default:
            return state;
    }
};

//Get Visible Expenses:

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {
        return expenses.filter( (expense) => {
            const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
            const endDateMatch =typeof endDate !== 'number' || expense.createdAt <= endDate;
            const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()); 

            return startDateMatch && endDateMatch && textMatch;
        }).sort((a,b) => {
            if(sortBy==='date'){
                return a.createdAt < b.createdAt ? 1: -1;
            } else if (sortBy==='amount'){
                return a.amount < b.amount ? 1: -1;
            }            

        });
};

//Create Store

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'Mortgage', amount: 2300, createdAt: 1000}));
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 4500, createdAt: -1000}));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 50}));

// store.dispatch(setTextFilter('mort'));
// store.dispatch(setTextFilter('groceries'));
// store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setEndDate(175));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate());

