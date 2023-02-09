import 'jest';
import { WebCrawlerController } from "../../classes/WebCrawlerController";

const assert = require('assert');

const it = (desc, fn) => {
    try {
        fn();
        console.log('\x1b[32m%s\x1b[0m', `\u2714 ${desc}`);
    } catch (error) {
        console.log('\n');
        console.log('\x1b[31m%s\x1b[0m', `\u2718 ${desc}`);
        console.error(error);
    }
};

const testData = [
    ["Doe", "John", "1982/10/08"],
    ["Wayne", "Bruce", "1965/01/30"],
    ["Gaga", "Lady", "1986/03/28"],
    ["Mark", "Curry", "1988/02/29"],
    ["Shaw", "Tim", "2020/01/01"],
    ["Smith", "Luke", "1990/02/28"],
    ["Owen", "Jim", "1975/03/28"],
    ["Mason", "Frank", "2020/02/29"],
    ["Carry", "Erika", "1977/11/26"],
    ["Smith", "Jane", "1960/04/16"],
    ["Jacob", "Bob", "1988/03/28"]
]

it('should return true for leap year', () => {
    assert.strictEqual(birthdayLogic.isLeapYear('2020'), true);
});

it('should return false for leap year', () => {
    assert.strictEqual(birthdayLogic.isLeapYear('2022'), false);
});

it('should return the indexes of each birthday found', () => {
    assert.deepEqual(birthdayLogic.findTodaysBirthdays(testData, '2020/03/28', true), [2,6,10]);
});

it('should return the indexes of person(s) born on Feb 29th during leap year', () => {
    assert.deepEqual(birthdayLogic.findTodaysBirthdays(testData, '2020/02/29', true), [3,7]);
});

it('should consider a person born on Feb 29th to be Feb 28th during a non-leap year ', () => {
    assert.deepEqual(birthdayLogic.findTodaysBirthdays(testData, '2022/02/28', false), [3,5,7]);
});

it('should return an empty list for birthdays found', () => {
    assert.deepEqual(birthdayLogic.findTodaysBirthdays(testData, '2020/12/25', true), []);
});

it('should return an empty list for birthdays found (todays date misformatted)', () => {
    assert.deepEqual(birthdayLogic.findTodaysBirthdays(testData, '2020/1/1', true), []);
});






