import styled from 'styled-components'
export const Container = styled.div`
    width: 100%;
    height : 100vh;
    display: flex;
    overflow: hidden;
    position : relative;
`;

export const Arrow = styled.div`
    width: 3rem;
    height : 3rem;
    background-color:grey;
    border-radius:50%;
    display: flex;
    align-items:center;
    justify-content:center;
    position : absolute;
    top:0;
    bottom : 0;
    margin:auto;
    left :${props => props.direction === "left" && "1rem"};
    right :${({ direction }) => direction === "right" && "1rem"};
    cursor: pointer;
    opacity : 0.5;
    z-index:2;
    &:hover{
        border : 2px solid black;
    }
`;

export const Wrapper = styled.div`
    height : 100%;
    display: flex;
    transform: translateX(${({ slideIndex }) => slideIndex * -100}vw);
    transition : all 0.5s ease-in;
`;
export const Img = styled.img`
    height: 85%;
`;
export const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${(props) => props.bg};
`;
export const ImageContainer = styled.div`
    flex : 1;
    height:100%;
`;
export const InfoContainer = styled.div`
    flex : 1;
    padding:50px;
`;

export const Title = styled.h1`
    font-size:70px;
`;
export const Desc = styled.p`
    margin:50px 0;
    font-size:20px;
    font-weight: 550;
    letter-spacing:3px;
`;
export const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`;

