import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {    startAddExpense, 
            addExpense,
            editExpense,
            startEditExpense ,
            startRemoveExpense,
            removeExpense,
            setExpenses,
            startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = `testuidabc123`;
const defaultAuthState = {auth: {uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
      expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
  });

test('should setup remove expense action object', () => {
    const action = removeExpense({id: 'testid'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'testid'
    });
});

test(`should remove expense from database and store`, (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    return store.dispatch(startRemoveExpense({ id }))
    .then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`user/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
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

test(`should edit expense in firebase`, (done)=> {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = {amount: 555555};
    store.dispatch(startEditExpense(id, updates))
    .then(()=> {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot)=>{
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
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
        const store = createMockStore(defaultAuthState);
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
            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
            
            }).then((snapshot) => {
                expect(snapshot.val()).toEqual(expenseData)
                done();            
        });
    });

    test(`should add expense with defaults to database and store`, (done) => {
        const store = createMockStore(defaultAuthState);
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
            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
            
            }).then((snapshot) => {
                expect(snapshot.val()).toEqual(defaultValues)
                done();            
        });
    });

test(`should fetch the expenses from firebase`, (done)=> {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses())
    .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });

});