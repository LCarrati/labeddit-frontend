import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TextField = styled.textarea`
    max-width: 515px;
    width: 90%;
    height: 131px;
    background: #EDEDED;
    border-radius: 12px;
    margin-bottom: 12px;
    padding-top: 18px;
    padding-left: 17px;
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;
    color: #6F6F6F;
    border: none;
    resize: none;
    outline: none;
    padding-right: 17px;
    padding-bottom: 10px;
`

export const NewPostButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 145px;
    max-width: 359px;
    width: 90%;
    height: 47px;
    background: linear-gradient(90deg, #FF6489 0%, #F9B24E 100%), #4088CB;
    border-radius: 12px;
    border: none;
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: #FFFFFF;
    cursor: pointer;
`

export const BottonLine = styled.div`
    max-width: 358px;
    width: 90%;
    height: 0px;
    /* border: 1px linear-gradient(90deg, #FF6489 0%, #F9B24E 100%);
     */
    border: 1px solid;
    border-image: linear-gradient(90deg, #FF6489 0%, #F9B24E 100%);
    border-image-slice: 1;
    margin-top: 16px;
    margin-bottom: 36px;
`