import { css } from "@emotion/react";

export const headerCx = css`
  color: #FFFFFF;
  z-index: 1000;

  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 4rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0 1.75rem;

  background-color: #00ACF0;

  border-bottom: 1px solid #EDEDED;

  .nav-brand {
    display: flex;
  }

  .profile {
    margin-left: auto;

    display: flex;
    flex-direction: row;
    align-items: center;

    max-width: 20%;
    min-width: 8.375rem;

    .profile-picture {
      display: flex;
      margin-right: 1.5rem;
    }

    .profile-info {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #E6E7E8;

      > * {
        white-space: inherit;
        text-overflow: inherit;
        overflow: inherit;
      }
      .profile-name {
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.4rem;
      }
      .profile-id {
        font-weight: 400;
        font-size: 0.85rem;
        line-height: 0.938rem;
      }
    }
  }
`;
