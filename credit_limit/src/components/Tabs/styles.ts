import { css } from "@emotion/react";

export const tabsCx = css`
.tab-panel-component {
    padding: 15px;
}

.MuiTab-root {
    text-transform: none;
}

.MuiTab-textColorInherit {
    font-size: 0.875rem;
    color: #757575;
    font-weight: bold;

    &.Mui-selected {
        color: #008AC0;

    }
}

.PrivateTabIndicator-colorSecondary-3 {
    border: 1px solid #008AC0;
    background-color: #008AC0;
}

.MuiTouchRipple-root {
    border-bottom: 1px solid #EDEDED;
}

`;