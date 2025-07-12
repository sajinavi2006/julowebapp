import { css } from "@emotion/react";

export const mainCx = css`
background-color: #F5F5F5;
  margin-top: 4rem;
  margin-left: 15.5rem;
  min-height: calc(100vh - 4rem);

  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;

  overflow-x: auto;

  @media (max-width: 992px) {
    margin-left: 0;
  }

  &[data-sidebar-visible="false"] {
    margin-left: unset;
  }

  > * {
    flex: 1;
  }
`;

export const merchantCx = css`
    padding: 20px 50px;
`;
