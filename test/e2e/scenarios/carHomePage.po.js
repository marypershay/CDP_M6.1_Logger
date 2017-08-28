'use strict';

const TextField = require('./../../../support/helpers/elements/textField'),
    Button = require('./../../../support/helpers/elements/button');

class carHomePage {

    constructor() {
        this.signInLink = new Button('.header__sign-in-nav-button--username');
        this.emailInput = new TextField('[data-ng-model="signInData.email"]');
        this.passwordInput = new TextField('[data-ng-model="signInData.password"]');
        this.signInButton = new Button('.sign-in-button');
        this.userNameLink = element(by.linkText('Hi Active'));
        this.goToSiteButton = new Button('#mobile-redirect-a');
        this.signOutLink = new Button('.header__sign-in-nav-button--sign-out-link');
        this.notYouLink = new Button('.header__sign-in-nav-button--recognized-not-you');
        this.activeQuotesTable = element(by.css('.active-insurance'));
        this.naturalLanguageSection = element(by.className('natural-language-panel__greeting'));
        this.updateButton = new Button('[data-msm-interaction-id="updateResults"]');
        this.moreButton = new Button('button.result-table__provider-image-button');
        this.goToSiteButton = new Button('#mobile-redirect-a');
        this.newsSection = element(by.css('.aem-Grid.container.msm-collapsible-content-section'));
        this.newsSectionTitle = this.newsSection.all(by.css('.msm-collapsible-content-section__container-title'));
        this.paginationSection = element(by.css('.msm-collapsible-content-section-guides-paginator'));
        this.paginationPoints = this.paginationSection.all(by.css('.msm-collapsible-content-section-guides-paginator__items'));
        this.paginationPrevButton = new Button('.msm-collapsible-content-section-guides-paginator__nav--prev');
        this.paginationNextButton = new Button('.msm-collapsible-content-section-guides-paginator__nav--next');
        this.seeResultsButton = new Button('#btn_see_all_your_results');
    }
}
module.exports = carHomePage;