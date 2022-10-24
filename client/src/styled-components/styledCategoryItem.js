import styled from 'styled-components'
export const Container = styled.div`
    flex:1;
    margin:0.25rem;
    height: 70vh;
    position: relative;
    overflow:hidden;
`;
export const Image = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
`;
export const Info = styled.div`
    position : absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display: flex;  
    justify-content:center;
    align-items:center;
    flex-direction:column;
`;
export const Title = styled.h1`
    color :whitesmoke;
    margin-bottom:20px;
    fill:black;
    &:hover{
        text-shadow:1px 2px 3px red;
    }
    transition:all 0.5s ease;
`;
export const Button = styled.button`
    padding:10px 20px;
    border:  none;
    outline:none;
    cursor:pointer;
`;