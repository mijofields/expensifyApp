import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test(`should set up default filter value`, () =>{
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test(`should set sortBy to amount`, ()=> {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
    });

test(`should set sortBy to date`, ()=>{
    const initalState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };

    const action = {type: 'SORT_BY_DATE'};
    const state = filtersReducer(initalState, action);
    expect(state.sortBy).toBe('date');
});

test(`should set text filter`, ()=> {
    const text = 'this is a test';
    const state = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text});
    expect(state.text).toBe(text);
});

test(`should set startDate filter`, ()=> {
    const startDate = 0;
    const state = filtersReducer(undefined, {type: 'SET_START_DATE', startDate});
    expect(state.startDate).toBe(startDate);
});

test(`should set endDate filter`, ()=> {
    const endDate = 0;
    const state = filtersReducer(undefined, {type: 'SET_END_DATE', endDate});
    expect(state.endDate).toBe(endDate);
});




