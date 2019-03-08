import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test(`should set default state`, () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test(`should remove expense by ID`, ()=> {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});


test(`should not remove expenses if id not found`, ()=> {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '5'
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test(`should add an expense`, ()=> {
    const expenseToAdd = {
        id: '4',
        description: 'Cheese',
        note: '',
        amount: 55000,
        createdAt: moment(0).add(4, 'days').valueOf()
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense: expenseToAdd      
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expenseToAdd]);
});

test(`should edit an expense`, ()=>{

    const amount = 111000    

    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state[1].amount).toBe(amount);

})

test(`should not edit expense if expense not found`, ()=> {

    const amount = 111000    

    const action = {
        type: 'EDIT_EXPENSE',
        id: '7',
        updates: {
            amount
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);

});