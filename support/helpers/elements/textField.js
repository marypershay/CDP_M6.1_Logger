'use strict';

const CustomElement = require('./customElement');

class TextField extends CustomElement {

    constructor(cssSelector) {
        super(cssSelector);
    }

    setTextInputByValue(value) {
        const  log = `setTextInputByValue textInput: value: ${value}`;
        loggerHelper.info(log);
        return this.getElement().clear().then(() => {
        }).then(() => {
            return this.getElement().sendKeys(value);
        }).then(() => {
            return this.loseFocus(this.getElement());
        });
    }

    loseFocus() {
        const log = `loseFocus textInput`;
        loggerHelper.info(log);
        return element.all(by.css('h2')).filter((el) => {
            return el.isDisplayed();
        }).first().click().then(() => {
            browser.ignoreSynchronization = false;
        }, () => {
            return this.sendKeys(protractor.Key.TAB).then(() => {
                browser.ignoreSynchronization = false;
            }, (err) => {
                const errMess = `Error trying to lose focus: ${err.toString()}. Stacktrace: ${err.stack.toString()}`;
                throw errMess;
            });
        });
    }

}
module.exports = TextField;