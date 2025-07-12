import { css } from '@emotion/css';

import {
    MAX_WIDTH,
    MAX_WINDOW_WIDTH
} from 'constant';

export const createNavbar = css`
    background-color: #00acf0;
    display: flex;
    flex-direction: row;
    color: #ffffff;
    align-items: center;
    padding: 1rem 2rem;
`;

export const mapSearch = css`
    position: fixed;
    padding: 0.5rem 0;
    width: ${MAX_WINDOW_WIDTH}px;
    max-width: ${MAX_WIDTH}px;
    background-color: #ffffff;
    z-index: 30;
`;

export const dropdownContainer = css`
    line-height: 20px;
    z-index: 30;
    max-height: 250px;
    overflow-y: auto;
`;

export const itemDropdown = css`
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
`;

export const searchInput = css`
    width: 100%;
`;

export const centeredIcon = css`
    z-index: 20;
    position: absolute;
    top: 50%;
    left: 50%
`;

export const centeredButton = css`
    z-index: 20;
    position: absolute;
    top: 45%;
    left: 43%
`;

export const addressDiv = css`
    background-color: #ffffff;
    z-index: 20;
    position: fixed;
    bottom: 1px;
    width: ${MAX_WINDOW_WIDTH}px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 20%;
    text-align: center;
    padding: 1rem;
`;

export const floatingDiv = css`
    position: fixed;
    top: 0;
    z-index: 20;
    width: ${MAX_WINDOW_WIDTH}px;
`;