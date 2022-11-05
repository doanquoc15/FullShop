import styled from 'styled-components'

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255,255,255,0.5),
            rgba(255,255,255,0.5)),
        url('https://img.freepik.com/premium-photo/black-friday-clothing-industry-concept-pink-background-flat-lay-with-pink-clothes-hanger-white-blouse-dress-with-heart-shape-hanger_371428-1622.jpg?w=2000')
        center;
        display: flex;
        justify-content: center;
        align-items: center;  
`;
export const Wrapper = styled.div`
`;
export const Title = styled.h3`
    font-weight:700;
    color: grey;
    font-size: 30px;
    margin-bottom: 3rem;
    text-align: center;
    letter-spacing: 2px;
    word-spacing: 3px;
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width : 400px;
    padding: 20px;
`;
export const Input = styled.input`
    flex: 1;
    padding: 7px 10px;
    margin: 10px 0;
    outline: none;
    border: 0.5px solid grey;
    border-radius: 1px;
`;
export const Agreement = styled.p`
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span{
        font-weight: bold;
    }
`;
export const Button = styled.button`
    background-color: #85d0fa;
    border : 0.1px solid green; outline: none;
    padding: 10px ;
    border-radius: 2px;
    word-spacing: 3px;
    margin-top: 20px;
    cursor : pointer;
`;
export const Group = styled.div`
    &>:nth-child(1){
        width: 50%;
    }
    &>:nth-child(2){
        width: 50%;
    }
`;


