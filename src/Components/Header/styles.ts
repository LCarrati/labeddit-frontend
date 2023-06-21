import styled from "styled-components";

type CancelButtonProps = {
    isVisible: string;
};

export const Container = styled.header`
    height: 50px;
    background: #EDEDED;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 32px;
    margin-right: 0;
`

export const ElementDiv = styled.div`
    width: 63px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const CancelButton = styled.img<CancelButtonProps>`
    width: 25.6px;
    height: 24px;
    cursor: pointer;
    visibility: ${(props) => props.isVisible};
`

export const MiniLogo = styled.img`
    width: 28.02px;
    height: 27.28px;
`

export const MenuText = styled.p`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: #4088CB;
    cursor: pointer;
`