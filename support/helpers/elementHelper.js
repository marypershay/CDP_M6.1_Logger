'use strict';

class ElementHelper {

    waitForVisibilityOf(element, timeOut) {
        const timeoutMs = timeOut || browser.params.defaultTimeOut,
            log = `waitForVisibilityOf element: ${element}; timeOut: ${timeoutMs}`;
        loggerHelper.info(log);
        return browser.wait(protractor.ExpectedConditions.visibilityOf(element), timeoutMs,
            `Waiting for visibilityOf of ${element.locator()} failed`);
    }

    waitForInVisibilityOf(element, timeOut) {
        const timeoutMs = timeOut || browser.params.defaultTimeOut,
            log = `waitForInVisibilityOf element: ${element}; timeOut: ${timeoutMs}`;
        loggerHelper.info(log);
        return browser.wait(protractor.ExpectedConditions.invisibilityOf(element), timeoutMs,
            `Waiting for invisibilityOf of ${element.locator()} failed`);
    }

    scrollAndWaitAndClick(element, top, timeOut) {
        const timeOutMs = timeOut || browser.params.defaultTimeOut,
            log = `scrollAndWaitAndClick textInput: ${element.locator()}; top: ${top}; timeOut: ${timeOutMs}`;
        loggerHelper.info(log);
        return this.waitForVisibilityOf(element, 5000).then(() => {
            return element.getLocation().then((navDivLocation2) => {
                let currTop = navDivLocation2.y;
                const currLeft = navDivLocation2.x;
                currTop -= top || 400;
                return browser.executeScript(`window.scrollTo(${currLeft}, ${currTop});`);
            });
        }).then(() => {
            return browser.wait(protractor.ExpectedConditions.elementToBeClickable(element), timeOutMs,
                `Waiting for element to be clickable of ${element.locator()} failed`);
        }).then(() => {
            return element.click();
        });
    }

    highlighingElement(element) {
        const log = `highlighingElement element: ${element.locator()}`;
        loggerHelper.info(log);
        browser.executeScript("arguments[0].setAttribute('style', arguments[1]);",
            element, "color: Red; border: 2px solid red;");
    }
}
module.exports = ElementHelper;