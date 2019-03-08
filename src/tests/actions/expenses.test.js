import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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

test(`should set up a new expense object with default values`, () => {
     const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            amount: 0,
            createdAt: 0,
            note: ''
        }
    });
});

test(`should set up add expense object with assigned values`, () =>{
    const expenseData = {
        description: 'Rent',
        amount: 110000,
        createdAt: 1000,
        note: 'last months rent'
    };

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
})