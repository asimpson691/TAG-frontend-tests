const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

const FRIDAY = 'Friday';

function isItFriday(today: string) {
    return today === FRIDAY ? 'Yes' : 'No';
}

Given('today is {string}', function (today: string) {
    this.today = today;
});

When('I ask whether it\'s Friday yet', function () {
    this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer: string) {
    assert.strictEqual(this.actualAnswer, expectedAnswer)
});