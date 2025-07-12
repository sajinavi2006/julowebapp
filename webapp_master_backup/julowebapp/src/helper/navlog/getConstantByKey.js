export default key => {
  let constant = false;
  // the commented one is inactive or no needed for constant
  const constMap = {
    address_street_num: "alamat",
    address_provinsi: "province",
    address_kabupaten: "regency",
    address_kecamatan: "village",
    address_kelurahan: "subdistrict",
    address_kodepos: "postalcode",
    bank_name: "bankName",
    bank_branch: "bankBranch",
    bank_account_number: "accNum",
    //birth_place: 'birthPlace',
    close_kin_name: "parentsName",
    close_kin_mobile_phone: "parentsNo",
    company_name: "companyName",
    company_phone_number: "companyNo",
    college: "college",
    dob: "dob",
    dialect: "language",
    dependent: "dependencyNum",
    fullname: "name",
    gender: "sex",
    gpa: "gpa",
    graduation_year: "graduationYear",
    home_status: "domicileStatus",
    // income_1: ,
    // income_2: ,
    // income_3: ,
    is_own_phone: "isPersonalPhone",
    job_start: "startWorkingDate",
    job_type: "jobType",
    job_industry: "jobField",
    job_description: "job",
    kin_name: "nameOfKin",
    kin_mobile_phone: "kinNo",
    kin_relationship: "relation",
    // loan_amount_request: ,
    // loan_duration_request: ,
    loan_purpose: "loanPurposeCategory",
    loan_purpose_desc: "loanPurposeDescription",
    last_education: "lastEducation",
    major: "major",
    marketing_source: "knowJULOfrom",
    mobile_phone_1: "hpnum",
    mobile_phone_2: "hpnum2",
    monthly_income: "totalMonthlyIncome",
    monthly_expenses: "totalMonthlySpending",
    monthly_housing_cost: "totalHouseRentPerMonth",
    marital_status: "civilStatus",
    name_in_bank: "accName",
    occupied_since: "occupiedSince",
    payday: "payrollDate",
    // product_line: ,
    referral_code: "referralCode",
    spouse_name: "spouseName",
    spouse_dob: "dobSpouse",
    spouse_mobile_phone: "spouseNo",
    total_current_debt: "totalMonthlyDebt",
    vehicle_type_1: "vehicle",
    vehicle_ownership_1: "ownership"
  };
  //reverse from constmap
  const additionalConstMap = {
    //birthPlaceSearch: 'birth_place',
    companiesSearch: "company_name",
    collegeSearch: "college",
    bankSearch: "bank_name",
    majorsHead: "major",
    //sigin page
    username: "username",
    password: "password",
    //signup page
    ktp: "ktp",
    //otp section
    otp: "otp"
  };
  for (let i in constMap) {
    if (constMap[i] == key) {
      constant = i;
    }
  }
  if (!constant) {
    constant = additionalConstMap[key];
  }
  return constant;
};
