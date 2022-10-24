import styled from 'styled-components';

export const Container = styled.div`

`;
export const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`;
export const Image = styled.img`
    width:100%;
    height:75vh;
    object-fit: contain;
`;
export const ImageContainer = styled.p`
    flex:1;
    padding:0 50px;
`;
export const InfoContainer = styled.div`
    flex:1;
`;
export const Title = styled.h1`
    font-weight: 200;
    text-transform:uppercase;
`;
export const Description = styled.p`
    margin:20px 0;
    word-spacing:2px;
`;
export const Price = styled.p`
    font-weight: 400;
    font-size:40px;
`;
//
export const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width : 60%;
    margin:40px 0;
`;
export const Filter = styled.div`
    display: flex;
    align-items:center;
`;
export const FilterTitle = styled.span`
    margin-right:10px;
    font-size:20px;
    font-weight:300;
`;
export const Border = styled.div`
    width : 25px;
    height : 25x;
    display: flex;
    justify-content: center;
    align-items: center;
    
    margin : 0 15px;
    /* border-radius:50%; */
    & .active{
        border :3px solid red;
    }
`;
export const FilterColor = styled.div`
    border :1px solid ${({ color }) => color};
    width : 20px;
    height : 20px;
    border-radius:50%;
    background: ${({ color }) => color};
`;
export const FilterSize = styled.select`
    outline:none;
    padding: 5px;
`;
export const FilterSizeOption = styled.option`
`;
export const AddContainer = styled.div`
    display: flex;
    align-items: center;
    width : 60%;
    justify-content: space-between;
    margin-top: 100px;
`;
export const AmountContainer = styled.div`
    display: flex;
    gap : 2rem;
    align-items: center;
`;

export const Amount = styled.p`
    font-size:23px;
    border-radius: 10px;
    height : 35px;
    width : 60px;
    border:1px solid green;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
`;
export const Button = styled.button`
    padding:10px 15px;
    border: 02px solid green;
    border-radius:3px;
    font-weight:600;
    &:hover{
        background-color: lightgrey;
    }
`;

