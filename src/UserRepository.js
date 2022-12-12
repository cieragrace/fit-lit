//import User from './User';

class UserRepository {
  constructor(data) {
    this.data = data;
  }

  getData(userID) {
    return this.data.userData.find(currentUser => currentUser.id === userID);
  }

  stepGoalAverage() {
    let sum = this.data.userData.reduce((acc, user) => {
      acc += user.dailyStepGoal;
      return acc;
    }, 0);
    return parseInt(sum / this.data.userData.length);
  }
}

export default UserRepository;