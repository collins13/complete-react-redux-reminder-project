import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addReminder, deleteReminder, clearReminders} from '../actions';
import moment from 'moment';

class app extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text:'',
      dueDate:''
    };
  }


  addReminder(){
    console.log('this.state.dueDate', this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }
  deleteReminder(id){
    this.props.deleteReminder(id);

  }
  renderReminder(){
    const {reminders} = this.props;
    return(
      <ul className="list-group col-sm-4">
        {
          reminders.map(reminder =>{
            return(
              <li key={reminder.id} className="list-group-item">
                <div className="list-item">
                  <div>{reminder.text}</div>
                  <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div
                  className="list-item delete-button"
                  onClick={()=>this.deleteReminder(reminder.id)}
                  >&#x2715;
                </div>
              </li>
            )
          })

        }
      </ul>
    )
  }

  render(){
    console.log('this.props', this.props);
    return(
       <div className="app">
         <div className="title">
           <h1>Reminder Pro</h1>
         </div>
         <div className="form-inline reminder-form">
           <div className="form-group">
             <input
                type="text"
                className="form-control"
                onChange={event => this.setState({text:event.target.value})}
                vlaue="" placeholder="i want to..."
                />
             <input
               className="form-control"
               type="datetime-local"
               onChange={event =>this.setState({dueDate:event.target.value})}
               />
           </div>

           <button
             type="button"
             className="btn btn-success"
             onClick={()=>this.addReminder()}
             id="button">Add Reminder
           </button>

         </div><br/>
       {this.renderReminder()}
       <div
         className="btn btn-danger"
         onClick={()=>this.props.clearReminders()}
         >
         Clear Reminders
       </div>
       </div>
    )
  }
}
function mapToProps(state){
  return{
    reminders:state
  }
}

export default connect(mapToProps, {addReminder, deleteReminder, clearReminders})(app);
