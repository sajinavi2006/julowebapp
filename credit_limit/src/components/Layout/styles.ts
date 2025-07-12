import { css } from '@emotion/css';
import styled from '@emotion/styled';

import { MAX_WIDTH, MIN_WIDTH } from 'constant';

export const Content = styled.div`
  height: 100%;
  .layout-wrapper {
    padding-top: 20px;
  }
`;

export const fluid = css`
  min-width: 100%;
  max-width: 100%;
`;

export const defaultWidth = css`
  min-width: ${MIN_WIDTH}px;
  max-width: ${MAX_WIDTH}px;
`;
