import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    justify-content: space-around;
`

export const LogoArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 152px;
        height: 142px;
    }

    p {
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 21px;
        text-align: center;
        color: #000000;
    }
`

export const FormArea = styled.div`
    width: 100%;
`
