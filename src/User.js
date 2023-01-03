class User {
  constructor(userData, sleepData, hydrationData) {
    this.userData = userData;
    this.sleepData = sleepData;
    this.hydrationData = hydrationData;
  }

  getFirstName() {
    return this.userData.name.split(' ')[0];
  }

  getAvgDailyWater(userID) {
    let matchedIDS = this.hydrationData.hydrationData.filter(user => user.userID === userID)
    let avg = matchedIDS.reduce((acc, curr) => {
      acc += curr.numOunces
      return acc
    }, 0)
    return avg / matchedIDS.length
  }

  getWaterPerDay(date) {
    return this.hydrationData.hydrationData
      .filter(user => user.date === date)
      .reduce((acc, curr) => {
        if (curr.userID === this.userData.id) {
          acc = curr.numOunces;
        }
        return acc;
      }, 0);
  }

  // Sleep
  getAverageDailySleep() {
    let specificUserSleepData = this.getUserSleepData();
    let totalHours = specificUserSleepData.reduce((acc, user) => {
      acc += user.hoursSlept;
      return acc;
    }, 0);
    let averageHours = totalHours / specificUserSleepData.length;
    return Number(averageHours.toFixed(2));
  }

  getUserSleepData() {
    return this.sleepData.sleepData.filter(user => user.userID === this.userData.id);
  }

  getOverallQualityAvg() {
    let specificUserSleepQuality = this.getUserSleepData();
    let totalQuality = specificUserSleepQuality.reduce((acc, user) => {
      acc += user.sleepQuality;
      return acc;
    }, 0);
    let averageQuality = totalQuality / specificUserSleepQuality.length;
    return Number(averageQuality.toFixed(2));
  }

  sleepOnSpecificDate(date) {
    return this.sleepData.sleepData
      .filter(user => user.date === date)
      .reduce((acc, curr) => {
        if (curr.userID === this.userData.id) {
          acc = curr.hoursSlept;
        }
        return acc;
      }, 0);
  }

  sleepQualityOnSpecificDate(date) {
    return this.sleepData.sleepData
      .filter(user => user.date === date)
      .reduce((acc, curr) => {
        if (curr.userID === this.userData.id) {
          acc = curr.sleepQuality;
        }
        return acc;
      }, 0);
  }

  // givenWeekSleepDataByDay() {
  //   return this.sleepData.sleepData
  //     .filter(user => user.userID === this.userData.id)
  //     .slice(-7)
  //     .map(user => {
  //       return { [user.date]: user.hoursSlept }
  //     });
  // }

  // givenWeeksSleepQualityByDay() {
  //   return this.sleepData.sleepData
  //     .filter(user => user.userID === this.userData.id)
  //     .slice(-7)
  //     .map(user => {
  //       return { [user.date]: user.sleepQuality };
  //     });
  // }

  // getWeeklyConsumption() {
  //   return this.hydrationData.hydrationData
  //     .filter(user => user.userID === this.userData.id)
  //     .slice(-7)
  //     .map(user => {
  //       let both = {};
  //       both[user.date] = user.numOunces;
  //       return both;
  //     });
  // }

  getWeeklyInfo(info, property) {
    return this[info][info]
      .filter(user => user.userID === this.userData.id)
      .slice(-7)
      .map(user => {
        return { [user.date]: user[property] };
      });
  }

  averageSleepQuality() {
    let totalQuality = this.sleepData.sleepData.reduce((acc, user) => {
      acc += user.sleepQuality;
      return acc;
    }, 0)
    let averageQuality = totalQuality / this.sleepData.sleepData.length;
    return Number(averageQuality.toFixed(2));
  }
}

export default User;