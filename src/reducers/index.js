import {ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS} from '../constants';
import {bake_cookie, read_cookie} from 'sfcookies';

const reminder =(action)=>{
  let {text, dueDate} = action;
  return{
    id: Math.random(),
    text,
    dueDate

  }
}
const removeById = (state=[], id) =>{
  const reminders = state.filter(reminder =>reminder.id !== id);
  console.log('reduced reminders', reminders);
  return reminders;
}

const reminders = (state = [], action)=>{
  let reminders = null;
  state = read_cookie('reminders');

  switch (action.type) {
    case ADD_REMINDER:
    reminders = [...state, reminder(action)];
    bake_cookie('reminders', reminders);
    return reminders;

      break;
      case DELETE_REMINDER:
      reminders = removeById(state, action.id);
      bake_cookie('reminders', reminders);
      return reminders;

        break;
        case CLEAR_REMINDERS:
        reminders = [];
        bake_cookie('reminders', reminders);
        return reminders;

          break;
    default: return state;

  }
}
export default reminders;
