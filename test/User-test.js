import { expect } from 'chai';
import User from '../src/User'

describe('User', () => {
	let user1, user2, user3, hydrationData, sleepData, activityData
	beforeEach(() => {
		hydrationData = {
			hydrationData: [
				{
					userID: 1,
					date: "2019/06/15",
					numOunces: 37
				},
				{
					userID: 2,
					date: "2019/06/15",
					numOunces: 75
				},
				{
					userID: 3,
					date: "2019/06/15",
					numOunces: 47
				},
				{
					userID: 1,
					date: "2019/06/16",
					numOunces: 85
				},
				{
					userID: 2,
					date: "2019/06/16",
					numOunces: 42
				},
				{
					userID: 2,
					date: "2019/06/17",
					numOunces: 19
				},
				{
					userID: 2,
					date: "2019/06/18",
					numOunces: 42
				},
				{
					userID: 2,
					date: "2019/06/19",
					numOunces: 42
				},
				{
					userID: 2,
					date: "2019/06/20",
					numOunces: 33
				},
				{
					userID: 2,
					date: "2019/06/21",
					numOunces: 51
				},
				{
					userID: 2,
					date: "2019/06/22",
					numOunces: 87
				},
				{
					userID: 2,
					date: "2019/06/23",
					numOunces: 23
				}
			]
		}

		sleepData = {
			sleepData: [{
				userID: 1,
				date: "2019/06/15",
				hoursSlept: 6.1,
				sleepQuality: 2.2
			},
			{
				userID: 2,
				date: "2019/06/15",
				hoursSlept: 7,
				sleepQuality: 4.7
			},
			{
				userID: 3,
				date: "2019/06/15",
				hoursSlept: 10.8,
				sleepQuality: 4.7
			},
			{
				userID: 1,
				date: "2019/06/16",
				hoursSlept: 5.4,
				sleepQuality: 3
			},
			{
				userID: 2,
				date: "2019/06/16",
				hoursSlept: 4.1,
				sleepQuality: 3.6
			},
			{
				userID: 2,
				date: "2019/06/17",
				hoursSlept: 4.1,
				sleepQuality: 3.6
			},
			{
				userID: 2,
				date: "2019/06/18",
				hoursSlept: 4.1,
				sleepQuality: 3.6
			},
			{
				userID: 2,
				date: "2019/06/19",
				hoursSlept: 4.1,
				sleepQuality: 3.6
			},
			{
				userID: 2,
				date: "2019/06/20",
				hoursSlept: 6.5,
				sleepQuality: 1.1
			},
			{
				userID: 2,
				date: "2019/06/21",
				hoursSlept: 4.1,
				sleepQuality: 3.6
			},
			{
				userID: 2,
				date: "2019/06/22",
				hoursSlept: 3.9,
				sleepQuality: 5.4
			}

			]
		}

		activityData = {
			activityData: [{
				userID: 1,
				date: "2019/06/15",
				numSteps: 3577,
				minutesActive: 140,
				flightsOfStairs: 16
			},
			{
				userID: 2,
				date: "2019/06/15",
				numSteps: 4294,
				minutesActive: 138,
				flightsOfStairs: 10
			},
			{
				userID: 3,
				date: "2019/06/15",
				numSteps: 7402,
				minutesActive: 116,
				flightsOfStairs: 33
			},
			{
				userID: 1,
				date: "2019/06/16",
				numSteps: 6637,
				minutesActive: 175,
				flightsOfStairs: 36
			},
			{
				userID: 2,
				date: "2019/06/16",
				numSteps: 4112,
				minutesActive: 220,
				flightsOfStairs: 37
			},
			{
				userID: 3,
				date: "2019/06/16",
				numSteps: 12304,
				minutesActive: 152,
				flightsOfStairs: 8
			}
			]
		}

		user1 = new User({
			"id": 1,
			"name": "Luisa Hane",
			"address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
			"email": "Diana.Hayes1@hotmail.com",
			"strideLength": 4.3,
			"dailyStepGoal": 10000,
			"friends": [
				16,
				4,
				8
			]
		}, sleepData, hydrationData, activityData);

		user2 = new User({
			"id": 2,
			"name": "Jarvis Considine",
			"address": "30086 Kathryn Port, Ciceroland NE 07273",
			"email": "Dimitri.Bechtelar11@gmail.com",
			"strideLength": 4.5,
			"dailyStepGoal": 5000,
			"friends": [
				9,
				18,
				24,
				19
			]
		}, sleepData, hydrationData, activityData);

		user3 = new User({
			"id": 3,
			"name": "Herminia Witting",
			"address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
			"email": "Elwin.Tromp@yahoo.com",
			"strideLength": 4.4,
			"dailyStepGoal": 5000,
			"friends": [
				19,
				11,
				42,
				33
			]
		}, sleepData, hydrationData, activityData);
	})

	it('should be a function', function () {
		expect(User).to.be.a('function');
	});

	it('should instantiate a new User', function () {
		expect(User).to.be.a('function');
	})

	it('should have a Userdata parameter', function () {
		expect(user1.userData).to.deep.equal({
			"id": 1,
			"name": "Luisa Hane",
			"address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
			"email": "Diana.Hayes1@hotmail.com",
			"strideLength": 4.3,
			"dailyStepGoal": 10000,
			"friends": [
				16,
				4,
				8
			]
		});
	})

	it('should have an id', function () {
		expect(user1.userData.id).to.equal(1);
	})

	it('should have a name', function () {
		expect(user1.userData.name).to.equal("Luisa Hane");
	})

	it('should have an address', function () {
		expect(user1.userData.address).to.equal("15195 Nakia Tunnel, Erdmanport VA 19901-1697");
	})

	it('should have an email', function () {
		expect(user1.userData.email).to.equal("Diana.Hayes1@hotmail.com");
	})

	it('should have a strideLength', function () {
		expect(user1.userData.strideLength).to.equal(4.3);
	})

	it('should have a step goal', function () {
		expect(user1.userData.dailyStepGoal).to.equal(10000);
	})

	it('should have friends', function () {
		expect(user1.userData.friends).to.deep.equal([16, 4, 8]);
	})

	it('should have a Userdata parameter', function () {
		expect(user1.userData).to.deep.equal({
			"id": 1,
			"name": "Luisa Hane",
			"address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
			"email": "Diana.Hayes1@hotmail.com",
			"strideLength": 4.3,
			"dailyStepGoal": 10000,
			"friends": [
				16,
				4,
				8
			]
		});
	});

	it('should return users first name', function () {
		expect(user1.getFirstName()).to.equal("Luisa");
	})

	// Hydration
	it('should output the average fluid ounces of water consumed daily', function () {
		expect(user1.getAvgDailyWater(1)).to.equal(61);
	})

	it('should identify how many ounces of water a user consumed on a specific day', function () {
		expect(user2.getInfoByDay("2019/06/15", "hydrationData", "numOunces")).to.equal(75);
		expect(user3.getInfoByDay("2019/06/15", "hydrationData", "numOunces")).to.equal(47);
	})

	it('should calculate average ounces consumed daily over the course of one week', function () {
		expect(user2.getWeeklyInfo('hydrationData', 'numOunces')).to.deep.equal([
			{ '2019/06/17': 19 },
			{ '2019/06/18': 42 },
			{ '2019/06/19': 42 },
			{ '2019/06/20': 33 },
			{ '2019/06/21': 51 },
			{ '2019/06/22': 87 },
			{ '2019/06/23': 23 }
		]);
	})

	// Sleep
	it('should return a users overall average number of hours of sleep per day', function () {
		expect(user1.getUserOverallAvgInfo('hoursSlept')).to.equal(5.75);
	})

	it('Should return a users overall average sleep quality', function () {
		expect(user1.getUserOverallAvgInfo('sleepQuality')).to.equal(2.6);
	})

	it('Should give hours slept on a specific date', function () {
		expect(user2.getInfoByDay("2019/06/15", "sleepData", "hoursSlept")).to.equal(7);
		expect(user3.getInfoByDay("2019/06/15", "sleepData", "hoursSlept")).to.equal(10.8);
	})

	it('Should provide users sleep quality on specific date', function () {
		expect(user2.getInfoByDay("2019/06/15", "sleepData", "sleepQuality")).to.equal(4.7);
		expect(user1.getInfoByDay("2019/06/15", "sleepData", "sleepQuality")).to.equal(2.2);
	})

	it('Should provide daily sleep data for any given week', function () {
		expect(user2.getWeeklyInfo('sleepData', 'hoursSlept')).to.deep.equal([
			{ '2019/06/16': 4.1 },
			{ '2019/06/17': 4.1 },
			{ '2019/06/18': 4.1 },
			{ '2019/06/19': 4.1 },
			{ '2019/06/20': 6.5 },
			{ '2019/06/21': 4.1 },
			{ '2019/06/22': 3.9 }
		]);
	})

	it('Should provide daily sleep quality for any given week', function () {
		expect(user2.getWeeklyInfo('sleepData', 'sleepQuality')).to.deep.equal([
			{ '2019/06/16': 3.6 },
			{ '2019/06/17': 3.6 },
			{ '2019/06/18': 3.6 },
			{ '2019/06/19': 3.6 },
			{ '2019/06/20': 1.1 },
			{ '2019/06/21': 3.6 },
			{ '2019/06/22': 5.4 }
		]);
	})

	it('Should average overall sleep quality for all users', function () {
		expect(user1.averageSleepQuality()).to.equal(3.55);
	})

	// Activity
	it('should have a activityData parameter', function () {
		expect(user1.activityData).to.deep.equal(activityData);
	})

	it('should return miles user walked on a specific date', function () {
		expect(user1.getDailyMiles(user1, "2019/06/15", 'activityData', 'numSteps')).to.equal(2.91);
	})

	it.only('should return how many minutes a user was active on a specific date', function () {
		expect(user1.getInfoByDay("2019/06/15", 'activityData', 'minutesActive')).to.equal(140)
	})
})