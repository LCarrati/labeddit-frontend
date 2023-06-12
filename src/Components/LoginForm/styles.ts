import styled from 'styled-components';

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const InputField = styled.input`
    max-width: 363px;
    width: 90%;
    height: 60px;
    background: #FFFFFF;
    border: 1px solid #D5D8DE;
    border-radius: 4px;
    margin-bottom: 8px;
    padding: 16px;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    opacity: 0.8;
    color: #323941;

    ::placeholder {
        font-family: 'Noto Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #323941;
        opacity: 0.8;
    }

    :focus {
        outline: none;
        border-image-source: linear-gradient(to right, #FF6489 0%, #F9B24E 100%);
        /* border-image-source: linear-gradient(to right, rgb(249, 50, 252) 0%, rgb(188, 38, 191) 10%, rgb(125, 185, 232) 41%, rgb(133, 247, 143) 61%, rgb(239, 244, 132) 81%, rgb(255, 140, 142) 100%); */
        border-image-width: 2px;
        border-image-repeat: stretch;
        border-image-slice: 2;
        background-clip: content-box, border-box;
        border-radius: 4px;
        background-origin: border-box;
        background-image: linear-gradient(white, white), linear-gradient(to right, white, white);
        padding: 16px;
        color: #323941;
        font-family: 'Noto Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        opacity: 0.8;
    }
`;

export const ButtonLogin = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 145px;
    max-width: 365px;
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
    margin-top: 56px;
`;

export const ButtonSignup = styled.button`
    /* padding: 13px 133px; */
    max-width: 365px;
    width: 90%;
    height: 51px;
    border: 1px solid #FE7E02;
    border-radius: 27px;
    color: #FE7E02;
    background-color: white;
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
`;

export const BottonLine = styled.div`
    max-width: 365px;
    width: 90%;
    height: 0px;
    /* border: 1px linear-gradient(90deg, #FF6489 0%, #F9B24E 100%);
     */
    border: 1px solid;
    border-image: linear-gradient(90deg, #FF6489 0%, #F9B24E 100%);
    border-image-slice: 1;
    margin-top: 18px;
    margin-bottom: 18px;
`