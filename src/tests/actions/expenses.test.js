import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {    startAddExpense, 
            addExpense,
            editExpense, 
            removeExpense,
            setExpenses,
            startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done)=> {
    database.ref().remove()
    .then(() => {
    expenses.map(({ id, description, note, amount, createdAt}) => database.ref('expenses').push({id, description, note, amount, createdAt}))
    done();
});
});

test('should setup remove expense action obejct', () => {
    const action = removeExpense({id: 'testid'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'testid'
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('testid',{ description: 'test description'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'testid',
        updates: { 
            description: 'test description'
        }
    });
});

// test(`should set up a new expense object with default values`, () => {
//      const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             amount: 0,
//             createdAt: 0,
//             note: ''
//         }
//     });
// });

test(`should set up add expense object with assigned values`, () =>{
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
        });
    });

    //done forces jest to wait for asynchronous functions
    test(`should add expense to database and store`, (done) => {
        const store = createMockStore({});
        const expenseData = {
            description: 'laptop',
            note: '',
            amount: 1500,
            createdAt: 10000
        };
        store.dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
            
            }).then((snapshot) => {
                expect(snapshot.val()).toEqual(expenseData)
                done();            
        });
    });

    test(`should add expense with defaults to database and store`, (done) => {
        const store = createMockStore({});
        const defaultValues = {
                    description: '', 
                    note: '', 
                    amount: 0, 
                    createdAt: 0
                };
        store.dispatch(startAddExpense({}))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...defaultValues
                }
            });
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
            
            }).then((snapshot) => {
                expect(snapshot.val()).toEqual(defaultValues)
                done();            
        });
    });

test(`should fetch the expenses from firebase`, (done)=> {
    const store = createMockStore({});
    store.dispatch(startSetExpenses())
    .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    })

})