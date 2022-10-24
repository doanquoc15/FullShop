import styled from 'styled-components'

export const Container = styled.div`

`;
export const Wrapper = styled.div`
    padding : 20px;
`;
export const Title = styled.div`
    font-size: 30px;
    text-align: center;
    font-weight: 400;
    letter-spacing:3px;
`;
export const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;
`;
export const TopButton = styled.button`
    padding: 8px 10px;
    letter-spacing : 2px;
    font-weight : 600;
    outline: none;
    border : 0.3px solid grey;
    border-radius: 2px;
    cursor: pointer;
    &:nth-child(1){
        background-color : black;
        color : white;
    }
    &:nth-child(2){
        background-color : lightgrey;
        color : black;
    }
`;
export const TopTexts = styled.div`
    cursor: pointer;
`;
export const TopText = styled.span`
    text-decoration: underline;
    font-weight: 400;
    margin: 0 20px;
`;

export const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 3rem 0;
`;

export const Info = styled.div`
    flex : 3;
`;


export const Product = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0px;
`;
export const ProductDetail = styled.div`
    flex : 2;
    display: flex;;
`;

export const Image = styled.img`
    width: 200px;
    object-fit: contain;
`;
export const PriceDetail = styled.div`
    flex : 1;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content: space-between;
`;

export const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    &>span>{
        width: fit-content;  
        display: flex;
    }
    b{
        width: 4rem;
    }

`;
export const ProductName = styled.span`
    font-weight:400;
    font-size: 16px;
    gap: 1rem;
    display: flex;

`;
export const ProductId = styled.span`
    font-weight:400;
    font-size: 16px;
    gap: 1rem;
    display: flex;
   
`;
export const ProductColor = styled.div`
    width : 20px; 
    height: 20px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
`;
export const ProductSize = styled.span`
    
    font-weight:400;
    font-size: 16px;
    gap: 1rem;
    display: flex;
`;
export const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;
export const ProductAmount = styled.span`
    font-size: 20px;
    font-weight: 500;
`;
export const ProductPrice = styled.span`
    font-size: 22px;
    font-weight: 700;
    margin-top: 20px;
`;
export const Hr = styled.hr`
    border:none;
    background-color: #eee;
    height : 1px;
    width: 94%;
`;

export const Summary = styled.div`
    flex : 1;
    border : .5px solid lightgrey;
    padding: 20px;
    border-radius: 10px;
    box-shadow: -5px 6px 20px grey;
    height : fit-content;
`;

export const SummaryTitle = styled.h2`
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    letter-spacing: 3px;
`;
export const SummaryItem = styled.div`
    margin : 30px 0px;
    display: flex;
`;
export const SummaryTitleText = styled.span`
    flex : 3.3;
    font-weight:550;
`;
export const SummaryTitlePrice = styled.span`
    flex : 1;
`;
export const Button = styled.button`
    text-transform: uppercase;  
    padding: 6px 10px;
    border-radius: 2px;
    outline: none;
    border: 0.5px solid lightgrey;
    color : red;
    letter-spacing: 2px;
    cursor: pointer;
    background-color: #eef;
`;
export const Clean = styled.button`
    margin-top: 20px;
    border : 0.5px solid lightgrey;
    background-color:lightgrey;
    padding : 5px 8px;
    letter-spacing:1.5px;
    cursor: pointer;
`;