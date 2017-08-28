'use strict';

const CustomElement = require('./customElement.js'),
    ElementHelper = require('../elementHelper');

const elementHelper = new ElementHelper();

class Button extends CustomElement {

    constructor(cssSelector) {
        super(cssSelector);
    }

    scrollAndWaitAndClick(top, timeOut) {
        const timeOutMs = timeOut || browser.params.defaultTimeOut,
            log = `scrollAndWaitAndClick textInput: top: ${top}; timeOut: ${timeOutMs}`;
        loggerHelper.info(log);
        return elementHelper.waitForVisibilityOf(this.getElement(), 5000).then(() => {
            return this.getElement().getLocation().then((navDivLocation2) => {
                let currTop = navDivLocation2.y;
                const currLeft = navDivLocation2.x;
                currTop -= top || 400;
                return browser.executeScript(`window.scrollTo(${currLeft}, ${currTop});`);
            });
        }).then(() => {
            return browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.getElement()), timeOutMs,
                `Waiting for element to be clickable of ${this.getElement().locator()} failed`);
        }).then(() => {
            return this.getElement().click();
        });
    }
}
module.exports = Button;