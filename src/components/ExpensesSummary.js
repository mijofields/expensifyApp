import React from 'react';
import { connect } from 'react-redux';
import getExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';


export const ExpensesSummary = ({expensesCount, expensesTotal}) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';

    return (
    <div>
        <h2>Viewing {expensesCount} {expenseWord} totaling {numeral(expensesTotal).format('$0,0.00')} </h2>
    </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);

    return {
        expensesCount: visibleExpenses.length,
        expensesTotal: getExpensesTotal(visibleExpenses)
    };
};


export default connect(mapStateToProps)(ExpensesSummary);