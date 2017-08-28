'use strict';

const fs = require('fs'),
    path = require('path'),
    Jasmine2ScreenShotReporter = require('protractor-jasmine2-screenshot-reporter'),
    reportDir = 'report/screenshots',
    reportFile = 'report.html';

const reporter = new Jasmine2ScreenShotReporter({
    dest: reportDir,
    filename: reportFile,
    userCss: '../report-style.css',
    showSummary: true,
    inlineImages: true,
    reportTitle: "Report e2e test",
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: true
});

const ReportHelper = {

    getReporter() {
        return reporter;
    },

    beforeLaunch() {
        return new Promise((resolve) => {
            reporter.beforeLaunch(resolve);
        });
    },

    afterLaunch() {
        return new Promise((resolve) => {
            reporter.afterLaunch(resolve);
        });
    },

    specDone(result) {
        if (result.status === 'passed') {
            loggerHelper.passed(`=> it ${result.status}`);
        } else if (result.status === 'pending') {
            loggerHelper.warning(`=> it ${result.status}`);
        } else {
            loggerHelper.failed(`=> it ${result.status}`);
        }
    },

    specStarted (result) {
        loggerHelper.spec(`=> it: ${result.description}`);
    }

};

module.exports = ReportHelper;
