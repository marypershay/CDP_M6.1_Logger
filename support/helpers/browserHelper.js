'use strict';

class BrowserHelper {

    pageLoad(page) {
        const log = `calling get Url: ${page}`;
        loggerHelper.info(log);
        return browser.get(page);
    }

    waitForUrlContains(text, timeOut) {
        const timeoutMs = timeOut || browser.params.defaultTimeOut;
        const log = `waiting for URL contains ${text} timeOut: ${timeoutMs}`;
        loggerHelper.info(log);
        return browser.wait(protractor.ExpectedConditions.urlContains(text), timeoutMs,
            `Waiting for URL contains ${text} failed`);
    }

    navigateBack() {
        const log = `waiting for navigate back`;
        loggerHelper.info(log);
        return browser.navigate().back();
    }

    getCountTab() {
        return browser.getAllWindowHandles().then((windowsId) => {
            const length = windowsId.length,
                log = `getCountTab length: ${length}`;
            loggerHelper.info(log);
            return length;
        }, (err) => {
            const errMess = `Error trying to getAllWindowHandles(): ${err.toString()}. Stacktrace: ${err.stack.toString()}`;
            throw errMess;
        });
    }

    switchToTab(number) {
        const log = `switchToTab number: ${number}`;
        loggerHelper.info(log);
        return browser.getAllWindowHandles().then((windowsId) => {
            return windowsId[number];
        }).then((tabId) => {
            return browser.switchTo().window(tabId);
        });
    }
}
module.exports = BrowserHelper;