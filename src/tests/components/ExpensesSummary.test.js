import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test(`should correctly render ExpensesSummary with one expense`, () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={250} /> );
    expect(wrapper).toMatchSnapshot();
});

test(`should correctly render ExpensesSummary with multiple expense`, () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={15} expensesTotal={250054} /> );
    expect(wrapper).toMatchSnapshot();
});