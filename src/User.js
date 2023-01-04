class User {
  constructor(userData, sleepData, hydrationData, activityData) {
    this.userData = userData
    this.sleepData = sleepData
    this.hydrationData = hydrationData
    this.activityData = activityData
  }

  getFirstName() {
    return this.userData.name.split(' ')[0]
  }

  // Dynamic
  getInfoByDay(date, data, property) {
    return this[data][data]
      .filter(user => user.date === date)
      .reduce((acc, curr) => {
        if (curr.userID === this.userData.id) {
          acc = curr[property]
        }
        return acc
      }, 0);
  }

  getWeeklyInfo(info, property) {
    return this[info][info]
      .filter(user => user.userID === this.userData.id)
      .slice(-7)
      .map(user => {
        return { [user.date]: user[property] };
      });
  }

  // Hydration

  getAvgDailyWater(userID) {
    let matchedIDS = this.hydrationData.hydrationData.filter(user => user.userID === userID)
    let avg = matchedIDS.reduce((acc, curr) => {
      acc += curr.numOunces
      return acc
    }, 0)
    return avg / matchedIDS.length
  }

  // Sleep

  getUserSleepData() {
    return this.sleepData.sleepData.filter(user => user.userID === this.userData.id)
  }

  getUserOverallAvgInfo(property) {
    let specificUserInfo = this.getUserSleepData()
    let totalInfo = specificUserInfo.reduce((acc, user) => {
      acc += user[property]
      return acc;
    }, 0);
    let averageInfo = totalInfo / specificUserInfo.length
    return Number(averageInfo.toFixed(2))
  }

  averageSleepQuality() {
    let totalQuality = this.sleepData.sleepData.reduce((acc, user) => {
      acc += user.sleepQuality
      return acc
    }, 0)
    let averageQuality = totalQuality / this.sleepData.sleepData.length
    return Number(averageQuality.toFixed(2))
  }

  // Activity

  getDailyMiles(user, date, data, property) {
    let numSteps = this.getInfoByDay(date, data, property);
    let totalFeet = numSteps * user.userData.strideLength;
    return Number((totalFeet / 5280).toFixed(2))
  }

  getWeeklyActiveMinutes(info, property) {
    let weeklyMinutes = this.getWeeklyInfo(info, property);

    let totalMinutes = weeklyMinutes.reduce((sum, min) => {
      let minuteValue = Object.values(min)
      sum += minuteValue[0]
      return sum
    }, 0)

    return Number((totalMinutes / weeklyMinutes.length).toFixed(2))
  }
}

export default User;