import './css/styles.css'
import { getAPIData } from './apiCalls'
import User from '../src/User'
import UserRepository from './UserRepository'
import loadCharts from './charts'

// Global Variables
let users
let sleep
let hydration
let currentUser
let activity

//Query Selectors
let activityTrackerTitle = document.querySelector('h1')
let userInfoList = document.querySelector("#userInfoList")
let allUsersSteps = document.querySelector("#allUsersSteps")
let allUsersFlights = document.querySelector("#allUsersFlights")
let allUsersMins = document.querySelector("#allUsersMins")
let milesWalked = document.querySelector("#milesWalked")
let weeklyActiveMins = document.querySelector("#minsActive-h2")
let weeklyUserSteps = document.querySelector("#weeklySteps-h2")
let weeklyUserFlights = document.querySelector("#weeklyFlights-h2")

// Event Listeners
window.addEventListener('load', getAllData)

//Event Handlers
function getAllData() {
  Promise.all([getAPIData('users'), getAPIData('sleep'), getAPIData('hydration'), getAPIData('activity')])
    .then((data) => {
      users = new UserRepository(data[0])
      sleep = data[1]
      hydration = data[2]
      activity = data[3]
      loadPage()
    })
    .catch(err => console.log('To err is human', err))
}

function updateData(newData) {
  fetch(`http://localhost:3001/api/v1/${data}`, {
    method: 'POST',
    body: JSON.stringify({newData}), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log('data', data))
  .catch(error => console.log(error)) 
}

function displayUserInfo() {
  console.log(currentUser.activityData)
  userInfoList.innerHTML += `<li>${currentUser.userData.name}</li>
  <li>${currentUser.userData.address}</li> 
  <li>${currentUser.userData.email}</li>
  <li>Stride Length: ${currentUser.userData.strideLength}</li>
  <li>Daily Step Goal: ${currentUser.userData.dailyStepGoal}</li>
  <li>Active Mins Today: ${currentUser.getInfoByDay('2019/06/15', 'activityData', 'minutesActive')}</li>
  <li>Friends: ${getUserFriends()}</li>`
}

function displayOtherUsersInfo() {
  allUsersSteps.innerText += currentUser.getOverallData("2022/01/22", 'activityData', 'numSteps')
  allUsersFlights.innerText += currentUser.getOverallData("2022/01/22", 'activityData', 'flightsOfStairs')
  allUsersMins.innerText += currentUser.getOverallData("2022/01/22", 'activityData', 'minutesActive')
}

function displayWelcomeName() {
  activityTrackerTitle.innerText += ` ${currentUser.getFirstName()}`
}

function displayMilesWalked() {
  milesWalked.innerText += currentUser.getDailyMiles(currentUser, "2022/01/22", 'activityData', 'numSteps')
}

function displayStepGoal() {
  return [currentUser.userData.dailyStepGoal, (users.stepGoalAverage() - currentUser.userData.dailyStepGoal)]
}

// Functions
function getUser(sleep, hydration) {
  let randomIndex = Math.floor(Math.random() * users.data.userData.length)
  let randomUser = users.data.userData[randomIndex]
  currentUser = new User(randomUser, sleep, hydration, activity)
}

function getUserFriends() {
  return currentUser.userData.friends
    .map(friend => users.getData(friend).name)
    .join(', ')
}

function displayInfo(date, data, property) {
  let dailyInfo = currentUser.getInfoByDay(date, data, property)
  let goal = 0
  if (property === 'numOunces') {
    goal = 96
  } else if (property === 'sleepQuality') {
    goal = 5
  } else if (property === 'hoursSlept') {
    goal = 12
  }
  return [dailyInfo, goal - dailyInfo]
}

function displayLast7DaysInfo(info, property) {
  return currentUser
    .getWeeklyInfo(info, property)
    .map(current => Object.values(current)[0])
}

function displayAllTimeSleepData() {
  return [currentUser.getUserOverallAvgInfo('sleepQuality'), currentUser.getUserOverallAvgInfo('hoursSlept')]
}

function getUserDailyActivityInfo(date, data, property) {
   currentUser.getInfoByDay(date, data, property)
}

function displayWeeklyActivity(info, property, container) {
  console.log('container: ', container)
  container.innerText += `${currentUser.getWeeklyActiveMinutes(info, property)}`
  // weeklyUserSteps.innerText += currentUser.getWeeklyInfo(info, property)
  // weeklyUserFlights.innerText += currentUser.getWeeklyInfo(info, property)
}


function loadPage() {
  getUser(sleep, hydration)
  displayUserInfo()
  displayOtherUsersInfo()
  displayMilesWalked()
  displayWelcomeName()
  displayWeeklyActivity("activityData", 'minutesActive', weeklyActiveMins)
  displayWeeklyActivity("activityData", 'numSteps', weeklyUserSteps)
  displayWeeklyActivity("activityData", 'flightsOfStairs', weeklyUserFlights)
  getWeeklyInfo("activityData", "flightsOfStairs")
  getWeeklyInfo("activityData", "numSteps")
  loadCharts(displayStepGoal(),
    displayInfo('2019/06/15', 'hydrationData', 'numOunces'),
    displayInfo('2019/06/15', 'sleepData', 'hoursSlept'),
    displayInfo('2019/06/15', 'sleepData', 'sleepQuality'),
    displayLast7DaysInfo('sleepData', 'hoursSlept'),
    displayLast7DaysInfo('sleepData', 'sleepQuality'),
    displayLast7DaysInfo('hydrationData', 'numOunces'),
    displayAllTimeSleepData())
}