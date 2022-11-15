import styled from 'styled-components'

export const Container = styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
export const Title = styled.h1`
    font-size: 70px;
    margin-bottom:20px;
    letter-spacing: 4px;
`;
export const Description = styled.div`
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 20px;
    word-spacing: 3px;
`;
export const InputContainer = styled.form`
    width:50%;
    height:40px;
    background-color:white;
    display: flex;
    justify-content: space-between;
`;
export const Input = styled.input`
    width:100%;
    border:none;
    padding-left:10px;
    outline:none;
`;
export const Button = styled.button`
    outline:none;
    border:none;
    width:20%;
    background-color: #3CB371;
`;