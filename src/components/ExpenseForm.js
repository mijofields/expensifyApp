import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


const now = moment();

export default class ExpenseForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: undefined
        };
    }

    handleDescriptionChange = (e) => {
        let description = e.target.value;
        this.setState(() => ({description}));
    };

    handleNoteChange = (e) => {
        let note = e.target.value;
        this.setState(() => ({note}));
    };

    handleAmountChange = (e) => {
        let amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({amount}))
        }
    };

    handleDateChange = (createdAt) =>{
        if (createdAt){
            this.setState(() => ({createdAt}));
        }
    };

    handleFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));

    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({error: 'Please set both a description and an amount'}));
        } else {
            this.setState(() => ({error: undefined}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount),
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }

    }


    render () {
        return (
            
                
                <form className="form" onSubmit={this.handleSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <input
                    type="text"
                    className="text-input"
                    placeholder="Description"
                    autoFocus
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                    />
                    <input 
                    type="text"
                    className="text-input"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.handleAmountChange}
                    />
                    <SingleDatePicker 
                    date={this.state.createdAt}
                    onDateChange={this.handleDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.handleFocusChange}
                    numberOfMonths= {1}
                    isOutsideRange={() => false}
                    />
                    <textarea
                    className="textarea"
                    placeholder="add a note for your expense (optional)"
                    value={this.state.note}
                    onChange={this.handleNoteChange}
                    />
                        <div>
                            <button className="button">Save Expense</button>
                        </div>
                </form>
            
        )
    }
}