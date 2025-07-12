import styled from '@emotion/styled';

export const SPHPWrapper = styled.div`
  padding-top: 0rem;
  p,
  b,
  a,
  li,
  th,
  td {
    font-size: 12px;
    color: #5e5e5e;
  }

  h4 {
    font-size: 12px;
  }

  .sphp-title {
    color: #00acf0;
    font-weight: bold;
    text-align: center;
    font-size: 12px;
  }

  .sphp-identity {
    margin: auto;
    width: 50%;
  }

  .sphp-credit-term {
    margin: auto;
    width: 60%;
    .title {
      font-weight: bold;
      border-top: 1px solid #5e5e5e;
      border-bottom: 1px solid #5e5e5e;
      text-align: center;
      padding-top: 5px;
      padding-bottom: 5px;
      margin-bottom: 20px;
    }

    .terms-list {
      line-height: 7px;
    }

    .terms-detail {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .sphp-terms-conditions-text {
    color: #00acf0;
  }
  .navbar-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding: 1rem 0rem;
    z-index: 500;
  }
  .agree-wrapper {
    p {
      margin: 0;
      padding: 0 8px;
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;

    .MuiCheckbox-colorSecondary.Mui-checked {
      color: #00acf0;
    }
    .MuiIconButton-root {
      padding: 0;
    }
  }
`;
