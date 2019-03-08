import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

//regular unconnected component
export const ExpenseList = (props) => (
    <div>
       {props.expenses.length=== 0 ? (
           <p>No Expenses</p>
       ) : (
        props.expenses.map((expense) => {
            return <ExpenseListItem {...expense} key={expense.id} />;
       })
    ) 
}
    </div>
);

//function mapping state to props

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

//connected Component
export default connect(mapStateToProps)(ExpenseList);