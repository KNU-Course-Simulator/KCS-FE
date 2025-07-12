// cypress/support/global.d.ts

/// <reference types="cypress" />

/**
 * Cypress 전역 네임스페이스 확장
 */
declare namespace Cypress {
  interface Chainable {
    /**
     * 테스트용 자동 로그인
     * @example cy.loginAsTestUser()
     */
    loginAsTestUser(): Chainable<void>;
  }
}
