import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';
import numeral from 'numeral';


export const ExpensesSummary = ({expensesCount, expensesTotal}) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';

    return (
    <div className="page-header">
        <div className="content-container">
            <h1 className="page-header__title">Viewing <span>{expensesCount}</span> {expenseWord} totaling <span>{numeral(expensesTotal).format('$0,0.00')}</span> </h1>
            <div className="page-header__actions">
                <Link className="button" to="/create">Add Expense</Link>
            </div>
        </div>
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