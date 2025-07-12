/// <reference types="cypress" />

// cypress/e2e/login.spec.ts

describe("LoginPage 플로우", () => {
  beforeEach(() => {
    // /login 경로로 이동
    cy.visit("/login");
  });

  it("입력 필드와 라디오 버튼, 로그인 버튼이 모두 보인다", () => {
    cy.get("#studentNo").should("exist").and("have.attr", "required");
    cy.get("#systemId").should("exist").and("have.attr", "required");
    cy.get("#password").should("exist").and("have.attr", "required");
    cy.get('input[type=radio][value="수강신청"]').should("be.checked");
    cy.get('input[type=radio][value="변경"]').should("not.be.checked");
    cy.get("button[type=submit]").contains("로그인").should("be.visible");
  });

  it("라디오 버튼 전환이 동작한다", () => {
    cy.get('input[type=radio][value="변경"]').check().should("be.checked");
    cy.get('input[type=radio][value="수강신청"]').should("not.be.checked");
    cy.get('input[type=radio][value="수강신청"]').check().should("be.checked");
  });

  it("빈 칸이 있을 때는 제출되지 않는다", () => {
    cy.get("button[type=submit]").click();
    // HTML5 required 속성에 의해 아직 /main 으로 리다이렉션되지 않아야 함
    cy.url().should("include", "/login");
  });

  it("올바르게 입력하면 /main 으로 이동하고 MainPage가 정상적으로 표시된다", () => {
    cy.get("#studentNo").type("202123456");
    cy.get("#systemId").type("testuser");
    cy.get("#password").type("password123");
    cy.contains("로그인").click();

    // /main으로 리다이렉트 확인
    cy.url().should("include", "/main");

    // MainPage 요소 검증: 헤더, 사용자 정보
    cy.contains("경북대학교").should("be.visible");
    cy.contains("홍길동").should("be.visible");
    cy.contains("학번").should("exist");
    cy.contains("성명").next().should("contain", "홍길동");

    // 검색 탭 테스트
    cy.contains("과목 검색").click();
    cy.get("#courseCode").should("exist").and("have.value", "");
    cy.get("#captcha").should("exist");
    cy.contains("확인").should("be.visible");

    // 기본 탭인 꾸러미 신청목록 확인
    cy.contains("꾸러미 신청목록").click();
    cy.contains("수강신청목록").should("exist");
  });

  it("하단 도움말 링크들이 올바른 href를 가진다", () => {
    cy.contains("학번/통합정보시스템 ID 찾기")
      .should("have.attr", "href")
      .and("match", /^#/);
    cy.contains("비밀번호 찾기").should("have.attr", "href").and("match", /^#/);
  });
});

describe("MainPage 이후 플로우", () => {
  beforeEach(() => {
    // 로그인 수행
    cy.visit("/login");
    cy.get("#studentNo").type("202123456");
    cy.get("#systemId").type("testuser");
    cy.get("#password").type("password123");
    cy.contains("로그인").click();
    cy.url().should("include", "/main");
  });

  it("헤더 및 사용자 정보가 정상적으로 표시된다", () => {
    cy.contains("경북대학교").should("be.visible");
    cy.contains("홍길동").should("be.visible");
    cy.contains("학번").should("exist");
    cy.contains("성명").next().should("contain", "홍길동");
    cy.contains("수강신청가능학점").should("exist");
  });

  it("검색 탭에서 캡차와 확인 버튼이 보인다", () => {
    cy.contains("과목 검색").click();
    cy.get("#courseCode").should("exist");
    cy.get("#captcha").should("exist");
    cy.contains("확인").should("be.visible");
  });

  it("검색 → 신청 → 신청목록 추가 플로우가 작동한다", () => {
    cy.contains("과목 검색").click();
    cy.get("#courseCode").type("TEST1001");
    cy.get("#captcha").type("0000");
    cy.contains("확인").click();

    cy.contains("예시강의명")
      .closest("tr")
      .within(() => cy.contains("신청").click());

    cy.contains("수강신청목록 1건").should("be.visible");
    cy.contains("TEST1001").should("exist");
  });

  it("신청목록에서 삭제가 동작한다", () => {
    // 이미 신청된 상태라 가정
    cy.contains("삭제").click();
    cy.contains("TEST1001").should("not.exist");
    cy.contains("수강신청목록 0건").should("be.visible");
  });
});
