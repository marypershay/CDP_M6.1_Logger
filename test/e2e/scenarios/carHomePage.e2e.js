const CarHomePage = require('./carHomePage.po.js'),
    ElementHelper = require('../../../support/helpers/elementHelper'),
    BrowserHelper = require('../../../support/helpers/browserHelper');

describe(`Car Home page - Integration Test - ${browser.profile}`, function () {
    let page,
        elementHelper,
        browserHelper;

    const newsTitles = [
        'CAR INSURANCE GUIDES',
        'MOTORING NEWS',
        'YOU & YOUR CAR',
        'STREETWISE'
    ];

    beforeAll(() => {
        page = new CarHomePage();
        elementHelper = new ElementHelper;
        browserHelper = new BrowserHelper;
        browserHelper.pageLoad('http://www.ci1-cms.gb.moneysupermarket.com/car-insurance/');
    });

    beforeEach(() => {
        page.signInLink.scrollAndWaitAndClick();
        page.emailInput.setTextInputByValue('active@msm.com');
        page.passwordInput.setTextInputByValue('pass1234');
        page.signInButton.scrollAndWaitAndClick();
        expect(page.userNameLink.getText()).toEqual('Hi Active');
    });

    afterEach(() => {
        page.signOutLink.scrollAndWaitAndClick();
        page.notYouLink.scrollAndWaitAndClick();
        elementHelper.highlighingElement(page.signInLink.getElement());
    });

    it('should have possible to go to result page', () => {
        elementHelper.waitForVisibilityOf(page.signOutLink.getElement());
        elementHelper.waitForVisibilityOf(page.activeQuotesTable);
        page.seeResultsButton.scrollAndWaitAndClick();
        browserHelper.waitForUrlContains('car-insurance/results', 5000);
        elementHelper.waitForVisibilityOf(page.naturalLanguageSection);
        elementHelper.waitForInVisibilityOf(page.updateButton.getElement());
        page.moreButton.scrollAndWaitAndClick(600);
        page.goToSiteButton.scrollAndWaitAndClick();
        browser.ignoreSynchronization = true;
        expect(browserHelper.getCountTab()).toBe(2);
        browserHelper.switchToTab(1);
        browserHelper.waitForUrlContains('go-to-site', 5000);
        browserHelper.switchToTab(0);
        browser.ignoreSynchronization = false;
        browserHelper.navigateBack();
        browserHelper.waitForUrlContains('car-insurance/results', 5000);
    });

    it('should display news section', () => {
        elementHelper.waitForVisibilityOf(page.newsSection);
        newsTitles.forEach((item, index) => {
            expect(page.newsSectionTitle.get(index).getText()).toEqual(item);
        });
    });

    it('should display 3 quotes on landing page', () => {
        elementHelper.waitForVisibilityOf(page.paginationSection);
        elementHelper.waitForVisibilityOf(page.paginationPrevButton.getElement());
        elementHelper.waitForVisibilityOf(page.paginationNextButton.getElement());
        expect(page.paginationPoints.count()).toBe(5);
    });

});