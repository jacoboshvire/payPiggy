/** @format */

const BASE_URL = "http://localhost:3000";
const TEST_EMAIL = "ejirojacob2000@gmail.com";
const TEST_PASSWORD = "yourpassword";

// ----------------------
// AUTH FLOWS
// ----------------------
describe("Register Flow", () => {
  it("should show error on missing fields", () => {
    cy.visit(`${BASE_URL}/auth/register`);
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });

  it("should show error on duplicate email", () => {
    cy.visit(`${BASE_URL}/auth/register`);
    cy.get("input[name=name]").type("Test User");
    cy.get("input[name=email]").type(TEST_EMAIL);
    cy.get("input[name=password]").type(TEST_PASSWORD);
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });

  it("should register successfully and redirect to otp-options", () => {
    cy.visit(`${BASE_URL}/auth/register`);
    cy.get("input[name=name]").type("New Test User");
    cy.get("input[name=email]").type(`testuser${Date.now()}@test.com`);
    cy.get("input[name=password]").type("TestPass123");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/auth/otp-options");
  });
});

describe("Login Flow", () => {
  it("should show error on missing fields", () => {
    cy.visit(`${BASE_URL}/auth/login`);
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });

  it("should show error on wrong password", () => {
    cy.visit(`${BASE_URL}/auth/login`);
    cy.get("input[name=email]").type(TEST_EMAIL);
    cy.get("input[name=password]").type("wrongpassword");
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });

  it("should show attempts remaining on failed login", () => {
    cy.visit(`${BASE_URL}/auth/login`);
    cy.get("input[name=email]").type(TEST_EMAIL);
    cy.get("input[name=password]").type("wrongpassword");
    cy.get("button[type=submit]").click();
    cy.get(".attemptsWarning").should("be.visible");
  });

  it("should login successfully and redirect to otp-options", () => {
    cy.visit(`${BASE_URL}/auth/login`);
    cy.get("input[name=email]").type(TEST_EMAIL);
    cy.get("input[name=password]").type(TEST_PASSWORD);
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/auth/otp-options");
  });
});

describe("OTP Options Page", () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}/auth/login`);
    cy.get("input[name=email]").type(TEST_EMAIL);
    cy.get("input[name=password]").type(TEST_PASSWORD);
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/auth/otp-options");
  });

  it("should show all 3 OTP channels", () => {
    cy.get(".channel_option").should("have.length", 3);
  });

  it("should select email channel and redirect to verification", () => {
    cy.get(".channel_option").first().click();
    cy.url().should("include", "/auth/verification");
  });
});

describe("OTP Verification Page", () => {
  it("should show error on invalid OTP", () => {
    cy.visit(`${BASE_URL}/auth/verification`);
    cy.get("input").each(($el) => cy.wrap($el).type("0"));
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });

  it("should show error on incomplete OTP", () => {
    cy.visit(`${BASE_URL}/auth/verification`);
    cy.get("input").first().type("1");
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });
});

describe("Forgot Password Flow", () => {
  it("should show error on invalid email", () => {
    cy.visit(`${BASE_URL}/auth/forgot-password`);
    cy.get("input[name=email]").type("nonexistent@test.com");
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });

  it("should send OTP and redirect on valid email", () => {
    cy.visit(`${BASE_URL}/auth/forgot-password`);
    cy.get("input[name=email]").type(TEST_EMAIL);
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/auth/otp-options");
  });
});

describe("Reset Password Page", () => {
  it("should show error on password mismatch", () => {
    cy.visit(`${BASE_URL}/auth/reset-password`);
    cy.get("input[name=password]").type("NewPass123");
    cy.get("input[name=confirmPassword]").type("DifferentPass123");
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });

  it("should show error on short password", () => {
    cy.visit(`${BASE_URL}/auth/reset-password`);
    cy.get("input[name=password]").type("short");
    cy.get("input[name=confirmPassword]").type("short");
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });
});

// ----------------------
// DASHBOARD FLOWS
// ----------------------
describe("Dashboard — Home", () => {
  beforeEach(() => {
    // Set auth token in localStorage
    cy.window().then((win) => {
      win.localStorage.setItem("token", Cypress.env("TEST_TOKEN"));
      win.localStorage.setItem("accountId", Cypress.env("TEST_ACCOUNT_ID"));
    });
    cy.setCookie("token", Cypress.env("TEST_TOKEN"));
    cy.visit(`${BASE_URL}/dashboard?home=true`);
  });

  it("should show welcome message with user name", () => {
    cy.get(".Home_welcomeMsg").should("be.visible");
  });

  it("should show account balance card", () => {
    cy.get(".card").should("be.visible");
  });

  it("should show payment history", () => {
    cy.get(".paymentHistory").should("be.visible");
  });

  it("should show Add, Move and Pay buttons", () => {
    cy.contains("Add").should("be.visible");
    cy.contains("Move").should("be.visible");
    cy.contains("Pay").should("be.visible");
  });
});

describe("Dashboard — Payment/Transfer", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", Cypress.env("TEST_TOKEN"));
      win.localStorage.setItem("accountId", Cypress.env("TEST_ACCOUNT_ID"));
    });
    cy.setCookie("token", Cypress.env("TEST_TOKEN"));
    cy.visit(`${BASE_URL}/dashboard?payment=true`);
  });

  it("should show payment form", () => {
    cy.get(".payment_form").should("be.visible");
  });

  it("should show error on missing fields", () => {
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });

  it("should show error on invalid receiver", () => {
    cy.get("input[name=accountNumber]").type("00000000");
    cy.get("input[name=sortCode]").type("00-00-00");
    cy.get("input[name=firstName]").type("Fake");
    cy.get("input[name=lastName]").type("User");
    cy.get("input[name=amount]").type("10");
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });

  it("should show error on amount over transfer limit", () => {
    cy.get("input[name=accountNumber]").type("28788642");
    cy.get("input[name=sortCode]").type("69-17-14");
    cy.get("input[name=firstName]").type("Ejiro");
    cy.get("input[name=lastName]").type("Oshevire");
    cy.get("input[name=amount]").type("99999");
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });

  it("should show OTP input for under 18 users sending over £500", () => {
    cy.get("input[name=accountNumber]").type("28788642");
    cy.get("input[name=sortCode]").type("69-17-14");
    cy.get("input[name=firstName]").type("Ejiro");
    cy.get("input[name=lastName]").type("Oshevire");
    cy.get("input[name=amount]").type("500");
    cy.get("button[type=submit]").click();
    cy.get("input[id=otp]").should("be.visible");
  });
});

describe("Dashboard — Wallet/Vault", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", Cypress.env("TEST_TOKEN"));
      win.localStorage.setItem("accountId", Cypress.env("TEST_ACCOUNT_ID"));
    });
    cy.setCookie("token", Cypress.env("TEST_TOKEN"));
    cy.visit(`${BASE_URL}/dashboard?wallet=true`);
  });

  it("should show vault information", () => {
    cy.get(".wallet").should("be.visible");
  });

  it("should show vault balance", () => {
    cy.get(".vault_balance").should("be.visible");
  });
});

describe("Dashboard — Add Money", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", Cypress.env("TEST_TOKEN"));
      win.localStorage.setItem("accountId", Cypress.env("TEST_ACCOUNT_ID"));
    });
    cy.setCookie("token", Cypress.env("TEST_TOKEN"));
    cy.visit(`${BASE_URL}/dashboard?add=true`);
  });

  it("should show add money form", () => {
    cy.get("input[name=amount]").should("be.visible");
  });

  it("should show error on missing amount", () => {
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });

  it("should show error on negative amount", () => {
    cy.get("input[name=amount]").type("-100");
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });
});

describe("Dashboard — Account Details", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", Cypress.env("TEST_TOKEN"));
      win.localStorage.setItem("accountId", Cypress.env("TEST_ACCOUNT_ID"));
    });
    cy.setCookie("token", Cypress.env("TEST_TOKEN"));
    cy.visit(`${BASE_URL}/dashboard?account=true&account_details=true`);
  });

  it("should show account details", () => {
    cy.get(".accountDetail").should("be.visible");
  });

  it("should show account number", () => {
    cy.get(".accountDetail_value").should("be.visible");
  });

  it("should copy account number to clipboard", () => {
    cy.get(".copy").first().click();
    cy.get(".copy_success").should("be.visible");
  });
});

describe("Dashboard — Personal Details", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", Cypress.env("TEST_TOKEN"));
      win.localStorage.setItem("accountId", Cypress.env("TEST_ACCOUNT_ID"));
    });
    cy.setCookie("token", Cypress.env("TEST_TOKEN"));
    cy.visit(`${BASE_URL}/dashboard?account=true&personal_details=true`);
  });

  it("should show personal details", () => {
    cy.get(".accountDetail").should("be.visible");
  });

  it("should show phone number", () => {
    cy.contains("Phone").should("be.visible");
  });

  it("should show date of birth", () => {
    cy.contains("Date of Birth").should("be.visible");
  });

  it("should show address", () => {
    cy.contains("Address").should("be.visible");
  });
});

describe("Dashboard — Settings", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", Cypress.env("TEST_TOKEN"));
      win.localStorage.setItem("accountId", Cypress.env("TEST_ACCOUNT_ID"));
    });
    cy.setCookie("token", Cypress.env("TEST_TOKEN"));
    cy.visit(`${BASE_URL}/dashboard?account=true&settings=true`);
  });

  it("should show settings sections", () => {
    cy.get(".settings_section").should("have.length", 3);
  });

  it("should expand change password section", () => {
    cy.contains("Change Password").click();
    cy.get(".settings_section_body").should("be.visible");
  });

  it("should show OTP step before password change", () => {
    cy.contains("Change Password").click();
    cy.get(".settings_otp").should("be.visible");
  });

  it("should expand change account names section", () => {
    cy.contains("Change Account Names").click();
    cy.get(".settings_section_body").should("be.visible");
  });

  it("should expand update profile section", () => {
    cy.contains("Update Profile").click();
    cy.get(".settings_section_body").should("be.visible");
  });

  it("should show profile fields", () => {
    cy.contains("Update Profile").click();
    cy.get("input[type=tel]").should("be.visible");
    cy.get("input[type=date]").should("be.visible");
  });

  it("should show avatar picker on image click", () => {
    cy.get(".settings_avatar_wrapper").click();
    cy.get(".avatar_modal").should("be.visible");
  });

  it("should switch between choose and upload avatar tabs", () => {
    cy.get(".settings_avatar_wrapper").click();
    cy.contains("Upload Photo").click();
    cy.get("input[type=file]").should("exist");
  });
});

describe("Dashboard — Transfer to Vault", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", Cypress.env("TEST_TOKEN"));
      win.localStorage.setItem("accountId", Cypress.env("TEST_ACCOUNT_ID"));
    });
    cy.setCookie("token", Cypress.env("TEST_TOKEN"));
    cy.visit(`${BASE_URL}/dashboard?vault=true`);
  });

  it("should show transfer to vault form", () => {
    cy.get("input[name=amount]").should("be.visible");
  });

  it("should show error on missing amount", () => {
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });
});

describe("Dashboard — Withdraw from Vault", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", Cypress.env("TEST_TOKEN"));
      win.localStorage.setItem("accountId", Cypress.env("TEST_ACCOUNT_ID"));
    });
    cy.setCookie("token", Cypress.env("TEST_TOKEN"));
    cy.visit(`${BASE_URL}/dashboard?withdraw-vault=true`);
  });

  it("should show withdraw from vault form", () => {
    cy.get(".withdrawVault").should("be.visible");
  });
});

// ----------------------
// WELCOME FLOW
// ----------------------
describe("Welcome Flow", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", Cypress.env("TEST_TOKEN"));
      win.localStorage.setItem("accountId", Cypress.env("TEST_ACCOUNT_ID"));
    });
    cy.setCookie("token", Cypress.env("TEST_TOKEN"));
    cy.setCookie("isNewUser", "true");
  });

  it("should show name form on welcome page", () => {
    cy.visit(`${BASE_URL}/auth/welcome?Account=true`);
    cy.get("input[name=firstName]").should("be.visible");
    cy.get("input[name=lastName]").should("be.visible");
  });

  it("should show error on missing name fields", () => {
    cy.visit(`${BASE_URL}/auth/welcome?Account=true`);
    cy.get("button[type=submit]").click();
    cy.get(".error").should("be.visible");
  });

  it("should show avatar picker on choose image page", () => {
    cy.visit(`${BASE_URL}/auth/welcome?ChooseImage=true`);
    cy.get(".avatar_grid").should("be.visible");
  });

  it("should show skip link on choose image page", () => {
    cy.visit(`${BASE_URL}/auth/welcome?ChooseImage=true`);
    cy.get(".skipLink").should("be.visible");
  });

  it("should skip to dashboard when skip is clicked", () => {
    cy.visit(`${BASE_URL}/auth/welcome?ChooseImage=true`);
    cy.get(".skipLink").click();
    cy.url().should("include", "/dashboard");
  });
});

// ----------------------
// BLOCKED PAGE
// ----------------------
describe("Blocked Page", () => {
  it("should show blocked message", () => {
    cy.visit(`${BASE_URL}/blocked`);
    cy.get(".blocked_content").should("be.visible");
    cy.contains("Access Denied").should("be.visible");
  });

  it("should show go back button", () => {
    cy.visit(`${BASE_URL}/blocked`);
    cy.get("button").should("be.visible");
  });
});

// ----------------------
// ROUTE PROTECTION
// ----------------------
describe("Route Protection", () => {
  it("should redirect to login when accessing dashboard without token", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}/dashboard?home=true`);
    cy.url().should("include", "/auth/login");
  });

  it("should redirect to dashboard when accessing login with token", () => {
    cy.setCookie("token", Cypress.env("TEST_TOKEN"));
    cy.visit(`${BASE_URL}/auth/login`);
    cy.url().should("include", "/dashboard");
  });

  it("should redirect to login when accessing verification without userId", () => {
    cy.clearCookies();
    cy.visit(`${BASE_URL}/auth/verification`);
    cy.url().should("include", "/auth/login");
  });
});
