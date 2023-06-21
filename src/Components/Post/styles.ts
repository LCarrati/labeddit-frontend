import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 9px 10px;
    gap: 18px;

    max-width: 515px;
    width: 90%;
    min-height: 121px;

    background: #FBFBFB;
    border: 1px solid #E0E0E0;
    border-radius: 12px;
    position: relative;
    margin: 0 auto 10px;
`

export const Author = styled.div`
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #6F6F6F;
`

export const Message = styled.div`
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;
    color: #000000;
    line-break: anywhere;
    margin-bottom: 50px;
    text-align: justify;
`

export const InteractionsContainer = styled.div`
    display: flex;
    width: 174.33px;
    height: 28px;
    position: absolute;
    bottom: 10px;
    gap: 15px;
`

export const Votes = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4.66667px;
    border: 0.796748px solid #ECECEC;
    border-radius: 28px;
    width: 98px;
    height: 28px;

    p {
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 700;
        font-size: 9.56098px;
        line-height: 12px;
        text-align: center;
        color: #6F6F6F;
    }

    img {
        width: 21px;
        height: 20px;
        cursor: pointer;
    }
`

export const CommentCount = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 4.66667px;
    border: 0.793333px solid #ECECEC;
    border-radius: 28px;
    width: 65px;
    height: 28px;
    cursor: pointer;

    p {
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 9.56098px;
        line-height: 12px;
        text-align: center;
        color: #6F6F6F;
    }
`