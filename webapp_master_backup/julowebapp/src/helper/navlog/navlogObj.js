export default (routeName, action) => {
  //mapping pageId
  let pageId = false;
  switch (routeName) {
    case "signup":
      pageId = "PreSignupFragment";
      break;
    case "newPassword":
      pageId = "SignupFragment";
      break;
    case "signIn":
      pageId = "SigninFragment";
      break;
    case "formHead":
      pageId = "FormSectionFragment";
      break;
    case "form1":
      pageId = "FormBiodataFragment";
      break;
    case "form2":
      pageId = "FormFamilyFragment";
      break;
    case "form3":
      pageId = "FormWorkEduFragment";
      break;
    case "form4":
      pageId = "FormFinancialFragment";
      break;
    case "reviewForm":
      pageId = "FormReviewFragment";
      break;
    case "product":
      pageId = "ProductDetailActivity";
      break;
    case "document":
      pageId = "DocSectionActivity";
      break;
    case "loanActivity":
      pageId = "LoanInstallmentFragment";
      break;
    case "verification":
    case "bfi":
    case "lastStep":
      pageId = "LoanHomeFragment";
      break;
  }

  if (!pageId) {
    pageId = routeName;
  }

  return {
    // costumer_id:
    //   localStorage.custId,
    // application_id:
    //   localStorage.appId,
    // app_id:
    //   localStorage.webv,
    page_id: pageId || "",
    action,
    nav_log_ts: new Date()
  };
};
