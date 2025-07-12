// 여기에 실제 커맨드를 구현
Cypress.Commands.add("loginAsTestUser", () => {
  cy.visit("/login");
  cy.get("#studentNo").type("202123456");
  cy.get("#captcha").type("0000");
  cy.contains("확인").click();
});
