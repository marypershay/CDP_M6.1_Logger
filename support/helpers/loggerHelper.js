'use strict';
const log4js = require('log4js'),
    logDir = 'log',
    date = new Date(),
    timeStamp = date.getFullYear() + "-" + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();

log4js.configure({
    appenders: {
        file: {type: 'file', filename: "./" + logDir + "/" + "log_" + timeStamp + ".log"},
        console: {type: 'console'}
    },
    categories: {default: {appenders: ['file', 'console'], level: 'debug'}}
});

class LoggerHelper {

    constructor() {
        this.profile = `[${browser.profile}]`;
        this.logger = log4js.getLogger(this.profile);
    }

    spec(log) {
        browser.controlFlow().execute(() => this.logger.info(log));
    }

    info(log) {
        browser.controlFlow().execute(() => this.logger.debug(log));
    }

    passed(log) {
        browser.controlFlow().execute(() => this.logger.info(log));
    }

    failed(log) {
        browser.controlFlow().execute(() => this.logger.error(log));
    }

    warning(log) {
        browser.controlFlow().execute(() => this.logger.warn(log));
    }

}

module.exports = LoggerHelper;
