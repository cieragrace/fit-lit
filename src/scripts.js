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

//Query Selectors
let activityTrackerTitle = document.querySelector('h1')
let userInfoList = document.querySelector("#userInfoList")

// Event Listeners
window.addEventListener('load', getAllData)

//Event Handlers
function getAllData() {
  Promise.all([getAPIData('users'), getAPIData('sleep'), getAPIData('hydration')])
    .then((data) => {
      users = new UserRepository(data[0])
      sleep = data[1]
      hydration = data[2]
      loadPage()
    })
    .catch(err => console.log('To err is human', err))
}

function displayUserInfo() {
  userInfoList.innerHTML += `<li>${currentUser.userData.name}</li>
  <li>${currentUser.userData.address}</li> 
  <li>${currentUser.userData.email}</li>
  <li>Stride Length: ${currentUser.userData.strideLength}</li>
  <li>Daily Step Goal: ${currentUser.userData.dailyStepGoal}</li>
  <li>Friends: ${getUserFriends()}</li>`
}

function displayWelcomeName() {
  activityTrackerTitle.innerText += ` ${currentUser.getFirstName()}`
}

function displayStepGoal() {
  return [currentUser.userData.dailyStepGoal, (users.stepGoalAverage() - currentUser.userData.dailyStepGoal)]
}

// Functions
function getUser(sleep, hydration) {
  let randomIndex = Math.floor(Math.random() * users.data.userData.length)
  let randomUser = users.data.userData[randomIndex]
  currentUser = new User(randomUser, sleep, hydration)
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
  return [currentUser.getOverallQualityAvg(), currentUser.getAverageDailySleep()]
}

function loadPage() {
  getUser(sleep, hydration)
  displayUserInfo()
  displayWelcomeName()
  loadCharts(displayStepGoal(),
    displayInfo('2019/06/15', 'hydrationData', 'numOunces'),
    displayInfo('2019/06/15', 'sleepData', 'hoursSlept'),
    displayInfo('2019/06/15', 'sleepData', 'sleepQuality'),
    displayLast7DaysInfo('sleepData', 'hoursSlept'),
    displayLast7DaysInfo('sleepData', 'sleepQuality'),
    displayLast7DaysInfo('hydrationData', 'numOunces'),
    displayAllTimeSleepData());
}