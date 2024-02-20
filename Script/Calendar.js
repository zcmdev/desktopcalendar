/*Initialization*/

const sundayElement = document.querySelector('.sundayTitle');
const mondayElement = document.querySelector('.mondayTitle');
const tuesdayElement = document.querySelector('.tuesdayTitle');
const wednesdayElement = document.querySelector('.wednesdayTitle');
const thursdayElement = document.querySelector('.thursdayTitle');
const fridayElement = document.querySelector('.fridayTitle');
const saturdayElement = document.querySelector('.saturdayTitle');
const taskDateElement = document.querySelector('.js-taskDate');
const taskElement = document.querySelector('.js-task');
const sundayTaskElement = document.querySelector('.sunday');
const mondayTaskElement = document.querySelector('.monday');
const tuesdayTaskElement = document.querySelector('.tuesday');
const wednesdayTaskElement = document.querySelector('.wednesday');
const thursdayTaskElement = document.querySelector('.thursday');
const fridayTaskElement = document.querySelector('.friday');
const saturdayTaskElement = document.querySelector('.saturday');
const sundayNumElement = document.querySelector('.sundayTitle-num');
const mondayNumElement = document.querySelector('.mondayTitle-num');
const tuesdayNumElement = document.querySelector('.tuesdayTitle-num');
const wednesdayNumElement = document.querySelector('.wednesdayTitle-num');
const thursdayNumElement = document.querySelector('.thursdayTitle-num');
const fridayNumElement = document.querySelector('.fridayTitle-num');
const saturdayNumElement = document.querySelector('.saturdayTitle-num');
const messageBoxElement = document.querySelector('.messageDisplay-text');
const messageBoxButtonLeftElement = document.querySelector('.messageDisplay-button-left');
const messageBoxButtonRightElement = document.querySelector('.messageDisplay-button-right');

const colorOfTheDay = '#AE887B';
let thisYear = '';
let userSelectedYear = '';
let sundayTask = [];
let mondayTask = [];
let tuesdayTask = [];
let wednesdayTask = [];
let thursdayTask = [];
let fridayTask = [];
let saturdayTask = [];
let weekDate = [];
let weekDateRef = [];

/*********************/

/*Startup Procedures*/

today();
checkMemory();
messageBoxReset();
taskDateElement.value = '';
taskElement.value = '';

/*********************/

/*Startup Functions*/

function messageBoxReset() {
  messageBoxElement.innerHTML = '';
  messageBoxButtonLeftElement.innerHTML = '';
  messageBoxButtonRightElement.innerHTML = '';
}

function checkMemory() {
  if(localStorage.getItem('weekDate') != null) {
    weekDate = JSON.parse(localStorage.getItem('weekDate'));
    if(weekDate.length === 0) {
      resetAllDateDisplay();
    } else {
      updateWeekDateHTML();
      //update the weekDateRef
      weekDateRef = [];
      for(let i = 0; i < weekDate.length; i++) {
        weekDateRef[i] = weekDate[i];
      }
    }
  } else {
    const jsonArrayString = JSON.stringify(weekDate);
    localStorage.setItem('weekDate',jsonArrayString);
    resetAllDateDisplay();
    updateWeekDateHTML();
  }

  if(localStorage.getItem('Sunday') != null) {
    sundayTask = JSON.parse(localStorage.getItem('Sunday'));
    updateSundayHTML();
  } else {
    const jsonArrayString = JSON.stringify(sundayTask);
    localStorage.setItem('Sunday',jsonArrayString);
  }

  if(localStorage.getItem('Monday') != null) {
    mondayTask = JSON.parse(localStorage.getItem('Monday'));
    updateMondayHTML();
  } else {
    const jsonArrayString = JSON.stringify(mondayTask);
    localStorage.setItem('Monday',jsonArrayString);
  }

  if(localStorage.getItem('Tuesday') != null) {
    tuesdayTask = JSON.parse(localStorage.getItem('Tuesday'));
    updateTuesdayHTML();
  } else {
    const jsonArrayString = JSON.stringify(tuesdayTask);
    localStorage.setItem('Tuesday',jsonArrayString);
  }

  if(localStorage.getItem('Wednesday') != null) {
    wednesdayTask = JSON.parse(localStorage.getItem('Wednesday'));
    updateWednesdayHTML();
  } else {
    const jsonArrayString = JSON.stringify(wednesdayTask);
    localStorage.setItem('Wednesday',jsonArrayString);
  }

  if(localStorage.getItem('Thursday') != null) {
    thursdayTask = JSON.parse(localStorage.getItem('Thursday'));
    updateThursdayHTML();
  } else {
    const jsonArrayString = JSON.stringify(thursdayTask);
    localStorage.setItem('Thursday',jsonArrayString);
  }

  if(localStorage.getItem('Friday') != null) {
    fridayTask = JSON.parse(localStorage.getItem('Friday'));
    updateFridayHTML();
  } else {
    const jsonArrayString = JSON.stringify(fridayTask);
    localStorage.setItem('Friday',jsonArrayString);
  }

  if(localStorage.getItem('Saturday') != null) {
    saturdayTask = JSON.parse(localStorage.getItem('Saturday'));
    updateSaturdayHTML();
  } else {
    const jsonArrayString = JSON.stringify(saturdayTask);
    localStorage.setItem('Saturday',jsonArrayString);
  }
}

function today() {
  const day = new Date();
  let dayOfWeek = day.getDay();
  thisYear = day.getFullYear();
  switch (dayOfWeek) {
    case 0:
      sundayElement.style.backgroundColor = colorOfTheDay;
      break;
    case 1:
      mondayElement.style.backgroundColor = colorOfTheDay;
      break;
    case 2:
      tuesdayElement.style.backgroundColor = colorOfTheDay;
      break;
    case 3:
      wednesdayElement.style.backgroundColor = colorOfTheDay;
      break;
    case 4:
      thursdayElement.style.backgroundColor = colorOfTheDay;
      break;
    case 5:
      fridayElement.style.backgroundColor = colorOfTheDay;
      break;
    case 6:
      saturdayElement.style.backgroundColor = colorOfTheDay;
      break;
    default:
      break;
  }
}

/*********************/

/*Add Task Functions*/

function addTask() {

  messageBoxReset();
  const userDateValue = taskDateElement.value;
  userTaskValue = taskElement.value;
  const dateSelectedString = userDateValue + " 00:00:00";

  if(userDateValue != '' && userTaskValue != '') {
    const taskDateSelected = new Date(dateSelectedString);
    const dayNum = taskDateSelected.getDay();
    const monthNum = taskDateSelected.getMonth();
    const monthString = provideMonth(monthNum);
    const dateNum = taskDateSelected.getDate();
    userSelectedYear = taskDateSelected.getFullYear();
    const checkTaskString = monthString + ' ' + dateNum;
    const withinDateRange = checkTaskDate(checkTaskString);

    if(withinDateRange) {
      addTaskToCalendar(dayNum);
      //Reset Placeholder
      taskDateElement.value = '';
      taskElement.value = '';
    } else {
      messageBoxElement.innerHTML = 'Date selected not within this weekly calendar range';
      messageBoxButtonLeftElement.innerHTML = '';
      messageBoxButtonRightElement.innerHTML = '';
    }
  } else {
    messageBoxElement.innerHTML = 'Please enter both a task and a task date';
    messageBoxButtonLeftElement.innerHTML = '';
    messageBoxButtonRightElement.innerHTML = '';
  }
}

function addTaskToCalendar(dayOfWeekString) {
  switch (dayOfWeekString) {
    case 0:
      updateSundayArray();
      break;
    case 1:
      updateMondayArray();
      break;
    case 2:
      updateTuesdayArray();
      break;
    case 3:
      updateWednesdayArray();
      break;
    case 4:
      updateThursdayArray();
      break;
    case 5:
      updateFridayArray();
      break;
    case 6:
      updateSaturdayArray();
      break;
    default:
      break;
  }
}

function checkTaskDate(checkTaskString) {
  let tempCheckTaskString = checkTaskString;
  let matched = false;

  //Check if the year match first
  if(userSelectedYear != thisYear) {
    userSelectedYear = '';
    return matched;
  }

  for(let i = 0; i < weekDateRef.length; i++) {
    if(weekDateRef[i] === tempCheckTaskString) {
      matched = true;
      break;
    }
  }
  userSelectedYear = '';
  return matched;
}

/*********************/

/*Update Memory & HTML Functions*/

function updateSundayArray() {
  sundayTask.push(userTaskValue);
  updateSundayMemory();
  updateSundayHTML();
}

function updateMondayArray() {
  mondayTask.push(userTaskValue);
  updateMondayMemory();
  updateMondayHTML();
}

function updateTuesdayArray() {
  tuesdayTask.push(userTaskValue);
  updateTuesdayMemory();
  updateTuesdayHTML();
}

function updateWednesdayArray() {
  wednesdayTask.push(userTaskValue);
  updateWednesdayMemory();
  updateWednesdayHTML();
}

function updateThursdayArray() {
  thursdayTask.push(userTaskValue);
  updateThursdayMemory();
  updateThursdayHTML();
}

function updateFridayArray() {
  fridayTask.push(userTaskValue);
  updateFridayMemory();
  updateFridayHTML();
}

function updateSaturdayArray() {
  saturdayTask.push(userTaskValue);
  updateSaturdayMemory();
  updateSaturdayHTML();
}

function updateSundayMemory() {
  localStorage.removeItem('Sunday');
  const jsonArrayString = JSON.stringify(sundayTask);
  localStorage.setItem('Sunday',jsonArrayString);
}

function updateMondayMemory() {
  localStorage.removeItem('Monday');
  const jsonArrayString = JSON.stringify(mondayTask);
  localStorage.setItem('Monday',jsonArrayString);
}

function updateTuesdayMemory() {
  localStorage.removeItem('Tuesday');
  const jsonArrayString = JSON.stringify(tuesdayTask);
  localStorage.setItem('Tuesday',jsonArrayString);
}

function updateWednesdayMemory() {
  localStorage.removeItem('Wednesday');
  const jsonArrayString = JSON.stringify(wednesdayTask);
  localStorage.setItem('Wednesday',jsonArrayString);
}

function updateThursdayMemory() {
  localStorage.removeItem('Thursday');
  const jsonArrayString = JSON.stringify(thursdayTask);
  localStorage.setItem('Thursday',jsonArrayString);
}

function updateFridayMemory() {
  localStorage.removeItem('Friday');
  const jsonArrayString = JSON.stringify(fridayTask);
  localStorage.setItem('Friday',jsonArrayString);
}

function updateSaturdayMemory() {
  localStorage.removeItem('Saturday');
  const jsonArrayString = JSON.stringify(saturdayTask);
  localStorage.setItem('Saturday',jsonArrayString);
}

function updateSundayHTML() {
  let sundayTaskArrayLength = sundayTask.length;
  let sundaytaskHTML = '';
  if(sundayTaskArrayLength != 0) {
    for (let i=0; i< sundayTaskArrayLength; i++) {
      const html = `
        <div class="taskBox">
          <div class="taskBox-text">
            ${sundayTask[i]}
          </div>
          <div class="taskBox-button">
            <button onclick="
              sundayTask.splice(${i},1);
              updateSundayMemory();
              updateSundayHTML();
            " class="deleteTaskButton">x</button>
          </div>
        </div>
      `;
      sundaytaskHTML += html;
    }
  }
  sundayTaskElement.innerHTML = sundaytaskHTML;
}

function updateMondayHTML() {
  let mondayTaskArrayLength = mondayTask.length;
  let mondaytaskHTML = '';
  if(mondayTaskArrayLength != 0) {
    for (let i=0; i< mondayTaskArrayLength; i++) {
      const html = `
        <div class="taskBox">
          <div class="taskBox-text">
            ${mondayTask[i]}
          </div>
          <div class="taskBox-button">
            <button onclick="
              mondayTask.splice(${i},1);
              updateMondayMemory();
              updateMondayHTML();
            " class="deleteTaskButton">x</button>
          </div>
        </div>
      `;
      mondaytaskHTML += html;
    }
  }
  mondayTaskElement.innerHTML = mondaytaskHTML;
}

function updateTuesdayHTML() {
  let tuesdayTaskArrayLength = tuesdayTask.length;
  let tuesdaytaskHTML = '';
  if(tuesdayTaskArrayLength != 0) {
    for (let i=0; i< tuesdayTaskArrayLength; i++) {
      const html = `
        <div class="taskBox">
          <div class="taskBox-text">
            ${tuesdayTask[i]}
          </div>
          <div class="taskBox-button">
            <button onclick="
              tuesdayTask.splice(${i},1);
              updateTuesdayMemory();
              updateTuesdayHTML();
            " class="deleteTaskButton">x</button>
          </div>
        </div>
      `;
      tuesdaytaskHTML += html;
    }
  }
  tuesdayTaskElement.innerHTML = tuesdaytaskHTML;
}

function updateWednesdayHTML() {
  let wednesdayTaskArrayLength = wednesdayTask.length;
  let wednesdaytaskHTML = '';
  if(wednesdayTaskArrayLength != 0) {
    for (let i=0; i< wednesdayTaskArrayLength; i++) {
      const html = `
        <div class="taskBox">
          <div class="taskBox-text">
            ${wednesdayTask[i]}
          </div>
          <div class="taskBox-button">
            <button onclick="
              wednesdayTask.splice(${i},1);
              updateWednesdayMemory();
              updateWednesdayHTML();
            " class="deleteTaskButton">x</button>
          </div>
        </div>
      `;
      wednesdaytaskHTML += html;
    }
  }
  wednesdayTaskElement.innerHTML = wednesdaytaskHTML;
}

function updateThursdayHTML() {
  let thursdayTaskArrayLength = thursdayTask.length;
  let thursdaytaskHTML = '';
  if(thursdayTaskArrayLength != 0) {
    for (let i=0; i< thursdayTaskArrayLength; i++) {
      const html = `
        <div class="taskBox">
          <div class="taskBox-text">
            ${thursdayTask[i]}
          </div>
          <div class="taskBox-button">
            <button onclick="
              thursdayTask.splice(${i},1);
              updateThursdayMemory();
              updateThursdayHTML();
            " class="deleteTaskButton">x</button>
          </div>
        </div>
      `;
      thursdaytaskHTML += html;
    }
  }
  thursdayTaskElement.innerHTML = thursdaytaskHTML;
}

function updateFridayHTML() {
  let fridayTaskArrayLength = fridayTask.length;
  let fridaytaskHTML = '';
  if(fridayTaskArrayLength != 0) {
    for (let i=0; i< fridayTaskArrayLength; i++) {
      const html = `
        <div class="taskBox">
          <div class="taskBox-text">
            ${fridayTask[i]}
          </div>
          <div class="taskBox-button">
            <button onclick="
              fridayTask.splice(${i},1);
              updateFridayMemory();
              updateFridayHTML();
            " class="deleteTaskButton">x</button>
          </div>
        </div>
      `;
      fridaytaskHTML += html;
    }
  }
  fridayTaskElement.innerHTML = fridaytaskHTML;
}

function updateSaturdayHTML() {
  let saturdayTaskArrayLength = saturdayTask.length;
  let saturdaytaskHTML = '';
  if(saturdayTaskArrayLength != 0) {
    for (let i=0; i< saturdayTaskArrayLength; i++) {
      const html = `
        <div class="taskBox">
          <div class="taskBox-text">
            ${saturdayTask[i]}
          </div>
          <div class="taskBox-button">
            <button onclick="
              saturdayTask.splice(${i},1);
              updateSaturdayMemory();
              updateSaturdayHTML();
            " class="deleteTaskButton">x</button>
          </div>
        </div>
      `;
      saturdaytaskHTML += html;
    }
  }
  saturdayTaskElement.innerHTML = saturdaytaskHTML;
}

function resetAllDateDisplay() {
  const day = new Date();
  let dayOfWeek = day.getDay();
  let monNum = 0;
  let tuesNum = 0;
  let wedNum = 0;
  let thursNum = 0;
  let friNum = 0;
  let satNum = 0;
  let sunNum = 0;
  let monMonth = '';
  let tuesMonth = '';
  let wedMonth = '';
  let thursMonth = '';
  let friMonth = '';
  let satMonth = '';
  let sunMonth = '';
  switch (dayOfWeek) {
    case 0:
      for(let i=0; i < 7; i++) {
        let today = new Date();
        if(i === 0) {
          sunNum = today.getDate();
          sunMonth = provideMonth(today.getMonth());
          sundayNumElement.innerHTML = `${sunMonth} ${sunNum}`;
          weekDate[i] = sundayNumElement.innerHTML;
        } else if(i === 1) {
          today.setDate(day.getDate() + 1);
          monNum = today.getDate();
          monMonth = provideMonth(today.getMonth());
          mondayNumElement.innerHTML = `${monMonth} ${monNum}`;
          weekDate[i] = mondayNumElement.innerHTML;
        } else if(i === 2) {
          today.setDate(day.getDate() + 2);
          tuesNum = today.getDate();
          tuesMonth = provideMonth(today.getMonth());
          tuesdayNumElement.innerHTML = `${tuesMonth} ${tuesNum}`;
          weekDate[i] = tuesdayNumElement.innerHTML;
        } else if(i === 3) {
          today.setDate(day.getDate() + 3);
          wedNum = today.getDate();
          wedMonth = provideMonth(today.getMonth());
          wednesdayNumElement.innerHTML = `${wedMonth} ${wedNum}`;
          weekDate[i] = wednesdayNumElement.innerHTML;
        } else if(i === 4) {
          today.setDate(day.getDate() + 4);
          thursNum = today.getDate();
          thursMonth = provideMonth(today.getMonth());
          thursdayNumElement.innerHTML = `${thursMonth} ${thursNum}`;
          weekDate[i] = thursdayNumElement.innerHTML;
        } else if(i === 5) {
          today.setDate(day.getDate() + 5);
          friNum = today.getDate();
          friMonth = provideMonth(today.getMonth());
          fridayNumElement.innerHTML = `${friMonth} ${friNum}`;
          weekDate[i] = fridayNumElement.innerHTML;
        } else if(i === 6) {
          today.setDate(day.getDate() + 6);
          satNum = today.getDate();
          satMonth = provideMonth(today.getMonth());
          saturdayNumElement.innerHTML = `${satMonth} ${satNum}`;
          weekDate[i] = saturdayNumElement.innerHTML;
        }
      }
      updateWeekDateMemory();
      break;
    case 1:
      for(let i=0; i < 7; i++) {
        let today = new Date();
        if(i === 0) {
          today.setDate(day.getDate() - 1);
          sunNum = today.getDate();
          sunMonth = provideMonth(today.getMonth());
          sundayNumElement.innerHTML = `${sunMonth} ${sunNum}`;
          weekDate[i] = sundayNumElement.innerHTML;
        } else if(i === 1) {
          monNum = today.getDate();
          monMonth = provideMonth(today.getMonth());
          mondayNumElement.innerHTML = `${monMonth} ${monNum}`;
          weekDate[i] = mondayNumElement.innerHTML;
        } else if(i === 2) {
          today.setDate(day.getDate() + 1);
          tuesNum = today.getDate();
          tuesMonth = provideMonth(today.getMonth());
          tuesdayNumElement.innerHTML = `${tuesMonth} ${tuesNum}`;
          weekDate[i] = tuesdayNumElement.innerHTML;
        } else if(i === 3) {
          today.setDate(day.getDate() + 2);
          wedNum = today.getDate();
          wedMonth = provideMonth(today.getMonth());
          wednesdayNumElement.innerHTML = `${wedMonth} ${wedNum}`;
          weekDate[i] = wednesdayNumElement.innerHTML;
        } else if(i === 4) {
          today.setDate(day.getDate() + 3);
          thursNum = today.getDate();
          thursMonth = provideMonth(today.getMonth());
          thursdayNumElement.innerHTML = `${thursMonth} ${thursNum}`;
          weekDate[i] = thursdayNumElement.innerHTML;
        } else if(i === 5) {
          today.setDate(day.getDate() + 4);
          friNum = today.getDate();
          friMonth = provideMonth(today.getMonth());
          fridayNumElement.innerHTML = `${friMonth} ${friNum}`;
          weekDate[i] = fridayNumElement.innerHTML;
        } else if(i === 6) {
          today.setDate(day.getDate() + 5);
          satNum = today.getDate();
          satMonth = provideMonth(today.getMonth());
          saturdayNumElement.innerHTML = `${satMonth} ${satNum}`;
          weekDate[i] = saturdayNumElement.innerHTML;
        }
      }
      updateWeekDateMemory();
      break;
    case 2:
      for(let i=0; i < 7; i++) {
        let today = new Date();
        if(i === 0) {
          today.setDate(day.getDate() - 2);
          sunNum = today.getDate();
          sunMonth = provideMonth(today.getMonth());
          sundayNumElement.innerHTML = `${sunMonth} ${sunNum}`;
          weekDate[i] = sundayNumElement.innerHTML;
        } else if(i === 1) {
          today.setDate(day.getDate() - 1);
          monNum = today.getDate();
          monMonth = provideMonth(today.getMonth());
          mondayNumElement.innerHTML = `${monMonth} ${monNum}`;
          weekDate[i] = mondayNumElement.innerHTML;
        } else if(i === 2) {
          tuesNum = today.getDate();
          tuesMonth = provideMonth(today.getMonth());
          tuesdayNumElement.innerHTML = `${tuesMonth} ${tuesNum}`;
          weekDate[i] = tuesdayNumElement.innerHTML;
        } else if(i === 3) {
          today.setDate(day.getDate() + 1);
          wedNum = today.getDate();
          wedMonth = provideMonth(today.getMonth());
          wednesdayNumElement.innerHTML = `${wedMonth} ${wedNum}`;
          weekDate[i] = wednesdayNumElement.innerHTML;
        } else if(i === 4) {
          today.setDate(day.getDate() + 2);
          thursNum = today.getDate();
          thursMonth = provideMonth(today.getMonth());
          thursdayNumElement.innerHTML = `${thursMonth} ${thursNum}`;
          weekDate[i] = thursdayNumElement.innerHTML;
        } else if(i === 5) {
          today.setDate(day.getDate() + 3);
          friNum = today.getDate();
          friMonth = provideMonth(today.getMonth());
          fridayNumElement.innerHTML = `${friMonth} ${friNum}`;
          weekDate[i] = fridayNumElement.innerHTML;
        } else if(i === 6) {
          today.setDate(day.getDate() + 4);
          satNum = today.getDate();
          satMonth = provideMonth(today.getMonth());
          saturdayNumElement.innerHTML = `${satMonth} ${satNum}`;
          weekDate[i] = saturdayNumElement.innerHTML;
        }
      }
      updateWeekDateMemory();
      break;
    case 3:
      for(let i=0; i < 7; i++) {
        let today = new Date();
        if(i === 0) {
          today.setDate(day.getDate() - 3);
          sunNum = today.getDate();
          sunMonth = provideMonth(today.getMonth());
          sundayNumElement.innerHTML = `${sunMonth} ${sunNum}`;
          weekDate[i] = sundayNumElement.innerHTML;
        } else if(i === 1) {
          today.setDate(day.getDate() - 2);
          monNum = today.getDate();
          monMonth = provideMonth(today.getMonth());
          mondayNumElement.innerHTML = `${monMonth} ${monNum}`;
          weekDate[i] = mondayNumElement.innerHTML;
        } else if(i === 2) {
          today.setDate(day.getDate() - 1);
          tuesNum = today.getDate();
          tuesMonth = provideMonth(today.getMonth());
          tuesdayNumElement.innerHTML = `${tuesMonth} ${tuesNum}`;
          weekDate[i] = tuesdayNumElement.innerHTML;
        } else if(i === 3) {
          wedNum = today.getDate();
          wedMonth = provideMonth(today.getMonth());
          wednesdayNumElement.innerHTML = `${wedMonth} ${wedNum}`;
          weekDate[i] = wednesdayNumElement.innerHTML;
        } else if(i === 4) {
          today.setDate(day.getDate() + 1);
          thursNum = today.getDate();
          thursMonth = provideMonth(today.getMonth());
          thursdayNumElement.innerHTML = `${thursMonth} ${thursNum}`;
          weekDate[i] = thursdayNumElement.innerHTML;
        } else if(i === 5) {
          today.setDate(day.getDate() + 2);
          friNum = today.getDate();
          friMonth = provideMonth(today.getMonth());
          fridayNumElement.innerHTML = `${friMonth} ${friNum}`;
          weekDate[i] = fridayNumElement.innerHTML;
        } else if(i === 6) {
          today.setDate(day.getDate() + 3);
          satNum = today.getDate();
          satMonth = provideMonth(today.getMonth());
          saturdayNumElement.innerHTML = `${satMonth} ${satNum}`;
          weekDate[i] = saturdayNumElement.innerHTML;
        }
      }
      updateWeekDateMemory();
      break;
    case 4:
      for(let i=0; i < 7; i++) {
        let today = new Date();
        if(i === 0) {
          today.setDate(day.getDate() - 4);
          sunNum = today.getDate();
          sunMonth = provideMonth(today.getMonth());
          sundayNumElement.innerHTML = `${sunMonth} ${sunNum}`;
          weekDate[i] = sundayNumElement.innerHTML;
        } else if(i === 1) {
          today.setDate(day.getDate() - 3);
          monNum = today.getDate();
          monMonth = provideMonth(today.getMonth());
          mondayNumElement.innerHTML = `${monMonth} ${monNum}`;
          weekDate[i] = mondayNumElement.innerHTML;
        } else if(i === 2) {
          today.setDate(day.getDate() - 2);
          tuesNum = today.getDate();
          tuesMonth = provideMonth(today.getMonth());
          tuesdayNumElement.innerHTML = `${tuesMonth} ${tuesNum}`;
          weekDate[i] = tuesdayNumElement.innerHTML;
        } else if(i === 3) {
          today.setDate(day.getDate() - 1);
          wedNum = today.getDate();
          wedMonth = provideMonth(today.getMonth());
          wednesdayNumElement.innerHTML = `${wedMonth} ${wedNum}`;
          weekDate[i] = wednesdayNumElement.innerHTML;
        } else if(i === 4) {
          thursNum = today.getDate();
          thursMonth = provideMonth(today.getMonth());
          thursdayNumElement.innerHTML = `${thursMonth} ${thursNum}`;
          weekDate[i] = thursdayNumElement.innerHTML;
        } else if(i === 5) {
          today.setDate(day.getDate() + 1);
          friNum = today.getDate();
          friMonth = provideMonth(today.getMonth());
          fridayNumElement.innerHTML = `${friMonth} ${friNum}`;
          weekDate[i] = fridayNumElement.innerHTML;
        } else if(i === 6) {
          today.setDate(day.getDate() + 2);
          satNum = today.getDate();
          satMonth = provideMonth(today.getMonth());
          saturdayNumElement.innerHTML = `${satMonth} ${satNum}`;
          weekDate[i] = saturdayNumElement.innerHTML;
        }
      }
      updateWeekDateMemory();
      break;
    case 5:
      for(let i=0; i < 7; i++) {
        let today = new Date();
        if(i === 0) {
          today.setDate(day.getDate() - 5);
          sunNum = today.getDate();
          sunMonth = provideMonth(today.getMonth());
          sundayNumElement.innerHTML = `${sunMonth} ${sunNum}`;
          weekDate[i] = sundayNumElement.innerHTML;
        } else if(i === 1) {
          today.setDate(day.getDate() - 4);
          monNum = today.getDate();
          monMonth = provideMonth(today.getMonth());
          mondayNumElement.innerHTML = `${monMonth} ${monNum}`;
          weekDate[i] = mondayNumElement.innerHTML;
        } else if(i === 2) {
          today.setDate(day.getDate() - 3);
          tuesNum = today.getDate();
          tuesMonth = provideMonth(today.getMonth());
          tuesdayNumElement.innerHTML = `${tuesMonth} ${tuesNum}`;
          weekDate[i] = tuesdayNumElement.innerHTML;
        } else if(i === 3) {
          today.setDate(day.getDate() - 2);
          wedNum = today.getDate();
          wedMonth = provideMonth(today.getMonth());
          wednesdayNumElement.innerHTML = `${wedMonth} ${wedNum}`;
          weekDate[i] = wednesdayNumElement.innerHTML;
        } else if(i === 4) {
          today.setDate(day.getDate() - 1);
          thursNum = today.getDate();
          thursMonth = provideMonth(today.getMonth());
          thursdayNumElement.innerHTML = `${thursMonth} ${thursNum}`;
          weekDate[i] = thursdayNumElement.innerHTML;
        } else if(i === 5) {
          friNum = today.getDate();
          friMonth = provideMonth(today.getMonth());
          fridayNumElement.innerHTML = `${friMonth} ${friNum}`;
          weekDate[i] = fridayNumElement.innerHTML;
        } else if(i === 6) {
          today.setDate(day.getDate() + 1);
          satNum = today.getDate();
          satMonth = provideMonth(today.getMonth());
          saturdayNumElement.innerHTML = `${satMonth} ${satNum}`;
          weekDate[i] = saturdayNumElement.innerHTML;
        }
      }
      updateWeekDateMemory();
      break;
    case 6:
      for(let i=0; i < 7; i++) {
        let today = new Date();
        if(i === 0) {
          today.setDate(day.getDate() - 6);
          sunNum = today.getDate();
          sunMonth = provideMonth(today.getMonth());
          sundayNumElement.innerHTML = `${sunMonth} ${sunNum}`;
          weekDate[i] = sundayNumElement.innerHTML;
        } else if(i === 1) {
          today.setDate(day.getDate() - 5);
          monNum = today.getDate();
          monMonth = provideMonth(today.getMonth());
          mondayNumElement.innerHTML = `${monMonth} ${monNum}`;
          weekDate[i] = mondayNumElement.innerHTML;
        } else if(i === 2) {
          today.setDate(day.getDate() - 4);
          tuesNum = today.getDate();
          tuesMonth = provideMonth(today.getMonth());
          tuesdayNumElement.innerHTML = `${tuesMonth} ${tuesNum}`;
          weekDate[i] = tuesdayNumElement.innerHTML;
        } else if(i === 3) {
          today.setDate(day.getDate() - 3);
          wedNum = today.getDate();
          wedMonth = provideMonth(today.getMonth());
          wednesdayNumElement.innerHTML = `${wedMonth} ${wedNum}`;
          weekDate[i] = wednesdayNumElement.innerHTML;
        } else if(i === 4) {
          today.setDate(day.getDate() - 2);
          thursNum = today.getDate();
          thursMonth = provideMonth(today.getMonth());
          thursdayNumElement.innerHTML = `${thursMonth} ${thursNum}`;
          weekDate[i] = thursdayNumElement.innerHTML;
        } else if(i === 5) {
          today.setDate(day.getDate() - 1);
          friNum = today.getDate();
          friMonth = provideMonth(today.getMonth());
          fridayNumElement.innerHTML = `${friMonth} ${friNum}`;
          weekDate[i] = fridayNumElement.innerHTML;
        } else if(i === 6) {
          satNum = today.getDate();
          satMonth = provideMonth(today.getMonth());
          saturdayNumElement.innerHTML = `${satMonth} ${satNum}`;
          weekDate[i] = saturdayNumElement.innerHTML;
        }
      }
      updateWeekDateMemory();
      break;
    default:
      console.log('Error: resetAllDateDisplay function error');
      break;
  }
}

function updateWeekDateMemory() {
  localStorage.removeItem('weekDate');
  const jsonArrayString = JSON.stringify(weekDate);
  localStorage.setItem('weekDate',jsonArrayString);
  //Reset weekDateRef
  weekDateRef = [];
  for(let i = 0; i < weekDate.length; i++) {
    weekDateRef[i] = weekDate[i];
  }
}

function updateWeekDateHTML() {
  if(localStorage.getItem('weekDate') != null) {
    weekDate = JSON.parse(localStorage.getItem('weekDate'));
    sundayNumElement.innerHTML = weekDate[0];
    mondayNumElement.innerHTML = weekDate[1];
    tuesdayNumElement.innerHTML = weekDate[2];
    wednesdayNumElement.innerHTML = weekDate[3];
    thursdayNumElement.innerHTML = weekDate[4];
    fridayNumElement.innerHTML = weekDate[5];
    saturdayNumElement.innerHTML = weekDate[6];
  } else {
    console.log('Error: local storage for weekDate is empty, updateWeekDateHTML function error');
  }
}

function provideMonth(monthNum) {
  const monthNumber = monthNum;
  let month = '';
  switch (monthNumber) {
    case 0:
      month = 'Jan';
      return month;
    case 1:
      month = 'Feb';
      return month;
    case 2:
      month = 'March';
      return month;
    case 3:
      month = 'April';
      return month;
    case 4:
      month = 'May';
      return month;
    case 5:
      month = 'June';
      return month;
    case 6:
      month = 'July';
      return month;
    case 7:
      month = 'Aug';
      return month;
    case 8:
      month = 'Sept';
      return month;
    case 9:
      month = 'Oct';
      return month;
    case 10:
      month = 'Nov';
      return month;
    case 11:
      month = 'Dec';
      return month;
    default:
      console.log('Error: provideMonth function error');
      return month;
  }
}

/*********************/

/*Reset and Remove Task Functions*/

function resetCalendar() {
  messageBoxElement.innerHTML = 'Are you sure you want to delete all of the existing tasks and reset the calendar to this week?';
  messageBoxButtonRightElement.innerHTML = '<button class="resetConfirmButton" onclick="resetConfirmHTMLReset();">Confirm</button>';
  messageBoxButtonLeftElement.innerHTML = '<button class="resetCancelButton" onclick="resetCancelHTMLReset();">Cancel</button>';
}

function resetConfirmHTMLReset() {
  resetAllDateDisplay();
  messageBoxElement.innerHTML = 'Calendar Reset';
  messageBoxButtonRightElement.innerHTML = '';
  messageBoxButtonLeftElement.innerHTML = '';
  resetAllDateArray();
}

function resetCancelHTMLReset() {
  messageBoxElement.innerHTML = 'Reset Cancelled';
  messageBoxButtonRightElement.innerHTML = '';
  messageBoxButtonLeftElement.innerHTML = '';
}

function resetAllDateArray() {
  sundayTask = [];
  updateSundayMemory();
  updateSundayHTML();

  mondayTask = [];
  updateMondayMemory();
  updateMondayHTML();

  tuesdayTask = [];
  updateTuesdayMemory();
  updateTuesdayHTML();

  wednesdayTask = [];
  updateWednesdayMemory();
  updateWednesdayHTML();

  thursdayTask = [];
  updateThursdayMemory();
  updateThursdayHTML();

  fridayTask = [];
  updateFridayMemory();
  updateFridayHTML();

  saturdayTask = [];
  updateSaturdayMemory();
  updateSaturdayHTML();
}

function initiateRemoveAllTasks() {
  messageBoxElement.innerHTML = 'Are you sure you want to delete all of the existing tasks?';
  messageBoxButtonRightElement.innerHTML = '<button class="removeTaskConfirmButton" onclick="removeAllTaskExecute();">Confirm</button>';
  messageBoxButtonLeftElement.innerHTML = '<button class="removeTaskCancelButton" onclick="removeAllTaskCancelledHTMLReset();">Cancel</button>';
}

function removeAllTaskExecute() {
  messageBoxElement.innerHTML = 'All existing tasks removed.';
  messageBoxButtonRightElement.innerHTML = '';
  messageBoxButtonLeftElement.innerHTML = '';
  resetAllDateArray();
}

function removeAllTaskCancelledHTMLReset() {
  messageBoxElement.innerHTML = 'Action Cancelled';
  messageBoxButtonRightElement.innerHTML = '';
  messageBoxButtonLeftElement.innerHTML = '';
}

/*********************/





