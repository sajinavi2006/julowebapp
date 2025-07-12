import { css } from '@emotion/react';

export const sidebarCx = css`
  display: flex;
  flex-direction: column;

  position: fixed;
  left: 0;

  background-color: #ffffff;

  width: 100%;
  height: 100%;
  max-width: 15.5rem;

  font-weight: bold;
  color: #404040;

  @media (max-width: 992px) {
    display: none;
  }

  .sidebar-main-menu {
    position: relative;
    flex: 1;

    a:hover {
      text-decoration: none;
    }

    .logout-menu {
      position: absolute;
      width: 100%;
      bottom: 4.5rem;
    }
  }
`;

export const sidebarMenuCx = css`
  cursor: pointer;

  width: 100%;

  display: flex;
  align-items: center;

  padding: 0.75rem 1rem;

  border-radius: 0;

  background-color: #ffffff;

  color: #ffffff;

  transition-duration: 0.2s;

  .menu-icon {
    width: 1.5rem;
    height: 1.5rem;

    margin-right: 2rem;
  }

  &:hover {
    background-color: #008ac0;
  }

  &:not(.selected, :hover) {
    color: #404040;
  }

  &.selected {
    background-color: #006790;
  }
`;
