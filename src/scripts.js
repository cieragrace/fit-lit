import './css/styles.css'
import { getAPIData, updateActivityData, updateHydrationData, updateSleepData } from './apiCalls'
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
let hoursSleptInput = document.querySelector("#hoursSleptInput")
let qualitySleepInput = document.querySelector("#qualitySleepInput")
let userHydrationInput = document.querySelector("#userHydrationInput")
let userMinsActiveInput = document.querySelector("#userMinsActiveInput")
let userStepsInput = document.querySelector("#userStepsInput")
let userFlightsInput = document.querySelector("#userFlightsInput")
let userInfoSubmitButton = document.querySelector("#userInfoSubmitButton")
let weeklyActiveMins = document.querySelector("#minsActive-h2")
let weeklyUserSteps = document.querySelector("#weeklySteps-h2")
let weeklyUserFlights = document.querySelector("#weeklyFlights-h2")


// Event Listeners
window.addEventListener('load', getAllData)
userInfoSubmitButton.addEventListener('click', function() {
  postSleepData()
  postActivityData()
  postHydrationData()
})

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
Promise.resolve(updateSleepData(newData))
Promise.resolve(updateActivityData(newData))
Promise.resolve(updateHydrationData(newData))
  .then(data => console.log(data))
  // .then(data => console.log('data', data))
  .catch(error => console.log('POST error', error)) 
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
  } else if (property === 'flightsOfStairs') {
    goal = 100
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

function displayWeeklyActivity(info, property, container) {
  container.innerText += `${currentUser.getWeeklyActiveMinutes(info, property)}`
}

function enableSubmitButton() {
  if (hoursSleptInput.value || qualitySleepInput.value || userHydrationInput.value || userMinsActiveInput.value || userStepsInput.value || userFlightsInput.value ) {
    userInfoSubmitButton.disabled = false
    } else {
      userInfoSubmitButton.disabled = true
    }    
  }

function postSleepData(event) {
  event.preventDefault()
  const newData = {'userID': currentUser.id, 'date': Date.now(), 'hoursSlept': currentUser.sleepData.sleepData.hoursSlept, 'sleepQuality': currentUser.sleepData.sleepData.sleepQuality}
  updateData(newData)
}

function postActivityData(event) {
  event.preventDefault()
  const newData = {'userID': currentUser.id, 'date': Date.now(), 'flightsOfStairs': currentUser.activityData.activityData.flightsOfStairs, 
  'minutesActive': currentUser.activityData.activityData.minutesActive, 'numSteps': currentUser.activityData.activityData.numSteps}
  updateData(newData) 
}

function postHydrationData(event) {
  event.preventDefault()
  const newData = {'userID': currentUser.id, 'date': Date.now(), 'numOunces': currentUser.activityData.activityData.numOunces}
  updateData(newData)
}
 
function loadPage() {
  getUser(sleep, hydration)
  displayUserInfo()
  displayOtherUsersInfo()
  displayMilesWalked()
  displayWelcomeName()
  // enableSubmitButton()
  displayWeeklyActivity("activityData", 'minutesActive', weeklyActiveMins)
  displayWeeklyActivity("activityData", 'numSteps', weeklyUserSteps)
  displayWeeklyActivity("activityData", 'flightsOfStairs', weeklyUserFlights)
  currentUser.getWeeklyInfo("activityData", "flightsOfStairs")
  currentUser.getWeeklyInfo("activityData", "numSteps")
  loadCharts(displayStepGoal(),
    displayInfo('2019/06/15', 'hydrationData', 'numOunces'),
    displayInfo('2019/06/15', 'sleepData', 'hoursSlept'),
    displayInfo('2019/06/15', 'sleepData', 'sleepQuality'),
    displayLast7DaysInfo('sleepData', 'hoursSlept'),
    displayLast7DaysInfo('sleepData', 'sleepQuality'),
    displayLast7DaysInfo('hydrationData', 'numOunces'),
    displayAllTimeSleepData(),
    displayInfo('2019/06/15', 'activityData', 'flightsOfStairs')
    )
}
