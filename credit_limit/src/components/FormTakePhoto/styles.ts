import styled from '@emotion/styled';

interface IStyledFormTakePhoto {
    disabled?: boolean;
}

// STYLE
export const StyledFormTakePhoto = styled.div<IStyledFormTakePhoto>`
    width: 100%;
    height: 195px;
    border-radius: 5px;
    border: solid 1px #c7c7c7;
    background-color: transparent;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    cursor: ${props => !props.disabled && 'pointer'};
    opacity: ${props => props.disabled ? '0.5' : '1'};
`;