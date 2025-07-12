// cypress/e2e/mainPage.spec.ts

describe("MainPage 주요 기능", () => {
  beforeEach(() => {
    // 로그인 커맨드 재사용
    cy.loginAsTestUser();
  });

  it("헤더 및 사용자 정보가 올바르게 표시된다", () => {
    cy.contains("경북대학교").should("be.visible");
    cy.contains("홍길동").should("be.visible"); // TopBar 닉네임
    cy.contains("학번").should("exist");
    cy.contains("성명").next().should("contain", "홍길동");
  });

  it("검색 탭에서 캡차와 확인 버튼이 보인다", () => {
    cy.contains("과목 검색").click();
    cy.get("#courseCode").should("exist");
    cy.get("#captcha").should("exist");
    cy.contains("확인").should("be.visible");
  });

  it("검색 → 신청 → 신청목록 추가 플로우가 동작한다", () => {
    cy.contains("과목 검색").click();
    cy.get("#courseCode").type("TEST1001");
    cy.get("#captcha").type("0000");
    cy.contains("확인").click();

    cy.contains("예시강의명")
      .parents("tr")
      .within(() => {
        cy.contains("신청").click();
      });

    cy.contains("수강신청목록 1건").should("be.visible");
    cy.contains("TEST1001").should("exist");
  });

  it("신청목록에서 삭제가 동작한다", () => {
    // 이미 하나 신청된 상태라 가정
    cy.contains("삭제").click();
    cy.contains("TEST1001").should("not.exist");
    cy.contains("수강신청목록 0건").should("be.visible");
  });
});
