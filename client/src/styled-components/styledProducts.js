import styled from 'styled-components'
export const Container = styled.div`
    display: flex;
    padding:20px;
    flex-wrap:wrap;
    gap : 4rem 2rem;
    padding: 2.5rem 1rem 6rem 1rem;
    justify-content:center;
    flex-wrap:wrap;
    position:relative;        
`;
export const ContainerProduct = styled.div`
    background-color:#f7f7f1;
    padding: 2rem 1rem;
    margin:4rem 0;
`;

export const Image = styled.img`
    width:300px;
`

export const Button = styled.button`
    background-color: red;
    outline: none;
    padding : 0.7rem 3rem;
    cursor: pointer;
    position: absolute;
    bottom : 20px;
    letter-spacing : 2px;
    border : none;
    font-weight: bold;
    color : white;
`;
export const SearchContainer = styled.div`
    border: 0.5px solid lightgrey;
    display: flex;
    align-items : center;
    margin-left:25px;
    padding:5px;
    width : 30rem;
    background-color:white;
    margin : 0 auto;
`;
export const Input = styled.input`
    border : none;
    outline:none;
    width : 100%;
`;