import styled from 'styled-components'

export const Info = styled.div`
    opacity:0;
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left: 0;
    background-color:rgba(0,0,0,0.2);  
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.6s ease;
`;

export const Container = styled.div`
    /* flex : 1; */
    min-width:280px;
    display:flex;
    height:350px;
    box-shadow: 3px 5px 10px lightgrey;
    justify-content: center;
    align-items:center;
    position: relative;
    background: #ffff;
    flex-wrap: wrap;
    &:hover ${Info}{
        opacity:1;
    }
`;
export const Circle = styled.div`
    width:200px;
    height:200px;
    background: lightcyan;
    border-radius : 50%;
    position : absolute;
    z-index:0;
`;

export const Image = styled.img`
    height:75%;
    object-fit: contain;
    z-index:0;
`;
export const Icon = styled.div`
    cursor:pointer;
    height:40px;
    display: flex;
    justify-content:center;
    align-items: center;
    width:40px;
    border-radius: 50%;
    margin:1rem;
    background-color: white;

    &:hover{
        background-color: #FF9933;
        transform:scale(1.1);
    }
    transition : all 0.2s ease;
`;
// gg
export const FilterContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    width : 100%;
    gap : 2rem;
    padding : 3rem;
    flex-direction: column;

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
export const FilterColor = styled.div`
    border :1px solid ${({ color }) => color};
    width : 20px;
    height : 20px;
    margin-right : 20px;
    border-radius:50%;
    background: ${({ color }) => color};
`;
export const FilterSize = styled.select`
    outline:none;
    padding: 5px;
`;
export const FilterSizeOption = styled.option`
`;