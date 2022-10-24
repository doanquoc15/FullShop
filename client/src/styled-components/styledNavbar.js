import styled from 'styled-components'

export const Container = styled.div`
    height: 60px;
`;

export const Wrapper = styled.div`
    padding : 10px 20px;
    display: flex;
    justify-content:space-between;
    align-items: center;
`;

export const Left = styled.div`
    flex: 1;
    display: flex;
    align-items : center;
`;
// content of left
export const Language = styled.div`
    font-size: 14px;
    cursor: pointer;
`;
export const SearchContainer = styled.div`
    border: 0.5px solid lightgrey;
    display: flex;
    align-items : center;
    margin-left:25px;
    padding:5px;
`;
export const Input = styled.input`
    border : none;
    outline:none;
`;
export const Logo = styled.h1`
    font-weight:bold;
    cursor: pointer;
    sup{
        font-size : 12px;
    }
`;

export const Center = styled.div`
    flex: 1;
    text-align: center;
`;
// content of center


export const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content : flex-end;
    align-items: center;
`;
//content of right
export const MenuItem = styled.div`
    font-size : 14px;
    cursor: pointer;
    margin-left:25px;
`;


