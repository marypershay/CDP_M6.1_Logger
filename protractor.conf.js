'use strict';
const LoggerHelper = require('./support/helpers/loggerHelper');
const ReportHelper = require('./support/helpers/reportHelper');

const config = {
    params: {
        defaultTimeOut: 5000
    },
    getPageTimeout: 10000,
    allScriptsTimeout: 19000,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine2',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 40000,
        showTiming: true
    },
    multiCapabilities: [
        {
            name: 'fullScreen',
            browserName: 'chrome',
            maxInstances: 4,
            shardTestFiles: true,
            chromeOptions: {
                args: ['--window-size=1700,1024', '--disable-infobars']
            }
        },
        {
            name: 'tablet',
            browserName: 'chrome',
            maxInstances: 4,
            shardTestFiles: true,
            chromeOptions: {
                args: ['--window-size=1024,768', '--disable-infobars']
            }
        }
    ],

    specs: [
        'test/e2e/scenarios/*.e2e.js'
    ],

    onPrepare: function () {
        browser.runProfiles = exports.config.multiCapabilities.map((c) => c.name);
        browser.currentProfile = browser.getProcessedConfig().then((c) => browser.profile = c.capabilities.name);
        jasmine.getEnv().addReporter(ReportHelper.getReporter());
        return browser.getProcessedConfig().then((processedConfig) => {
            jasmine.getEnv().addReporter(ReportHelper);
            browser.profile = processedConfig.capabilities.name;
            global.loggerHelper = new LoggerHelper();
        });
    },
    beforeLaunch: function () {
        return ReportHelper.beforeLaunch();
    },

    seleniumServerJar: 'node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.4.0.jar'
};

exports.config = config;
