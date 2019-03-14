import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';


export class ExpenseListFilters extends React.Component {

    state = {
        calendarFocused: null
    };

    handleDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    handleFocusChange = (calendarFocused) => this.setState({calendarFocused});

    onTextChange = (e) => this.props.setTextFilter(e.target.value);

    onSortChange = (e) => {
        switch(e.target.value) {
            case 'date':
                this.props.sortByDate();
                break;
            case 'amount':
                this.props.sortByAmount();
                break;
        }};

    render () {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input 
                        className="text-input" 
                        type="text"
                        placeholder="Search expenses"
                        value={this.props.filters.text}
                        onChange={this.onTextChange} />
                    </div>
                    <div className="input-group__item">
                        <select
                            className="select" 
                            value={this.props.filters.sortBy}
                            onChange={this.onSortChange}>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.handleDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.handleFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            showClearDates={true}
                        />
                    </div>
                </div>            
            </div>

        );
    }
};

const mapStateToProps = (state) => ({filters: state.filters});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);