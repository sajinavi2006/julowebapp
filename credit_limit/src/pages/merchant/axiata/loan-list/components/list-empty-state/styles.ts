import { css } from "@emotion/react";

export const emptyCx = css`
display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 30rem;
    justify-content: center;
    font-size: 16px;

    span:nth-of-type(1) {
        font-weight: 700;
        color: #00ACF0;
        margin-top: 15px;
    }

    span {
        font-size: 16px;
        font-weight: 400;
        color: #616161;
    }
`;