import styled from '@emotion/styled';
import { css } from '@emotion/css';


export const cardIdentity = css`
    // border-bottom: 1px solid  #e0e0e0;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const cardTakePhoto = css`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;


export const AreaPhoto = styled.div`
    width: 100%;
    padding: 0 6rem;
`;

export const AreaItem = styled.div`
    border: 1px solid #e0e0e0;
    width: 100%;
    height: 150px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const textHeading = css`
    color: #5e5e5e
`;

export const paperInfo = css`
    background-color: #f5fcff;
    border: 1px solid #00acf0;
    border-style: dashed;
    color: #00acf0;
    padding: 1rem;
    border-radius: 10px;
    font-size: 10px
`;

export const IdentityInfo = styled.div`
color: #31b1cc;
display: flex;
font-weight: 500;
align-items: flex-start;
margin-bottom: 25px;

img.icon {
    margin-right: 10px;
    padding-top: 4px;
}
`;

export const Subtitle = styled.span`
color: #13637b;
font-size: 20px;
font-weight: 700;
margin-bottom: 25px;
display: block;
`;