import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const carousel = css`
  overflow: hidden;
`;

export const carouselItem = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

export const inner = css`
  white-space: nowrap;
  transition: transform 0.3s;
`;

export const indicators = css`
  display: flex;
  justify-content: center;
`;

export const OnBoardingWrapper = styled.div`
  .carousel-root {
    height: 100%;
  }

  .onboarding-header {
    font-weight: bold;
    color: #5e5e5e;
    font-size: 16px;
  }
  .onboarding-title {
    font-weight: bold;
    color: #5e5e5e;
    font-size: 14px;
  }
  .onboarding-description {
    color: #5e5e5e;
    font-size: 14px;
  }
`;
