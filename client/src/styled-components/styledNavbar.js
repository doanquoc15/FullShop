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


//Info
export const Info = styled.div`
    display: flex;
    align-items: center;
    margin:0 30px;
    gap:0.6rem;
    position: relative;

    &>:nth-child(2){
        display:${({drop}) => !drop && "none"};
    }
    transition : all 0.5s ease;
`;

export const ImgContainer = styled.div`
    width : 30px; 
    height :30px;
    border-radius: 50%;
    overflow: hidden;
    border:1px solid grey;
`;

export const Image = styled.img`
    object-fit: cover;
    height: 100%;
`;
export const Name = styled.span`
    font-weight:600;
    color : grey;
`;

//drop down
export const DropContainer = styled.div`
    display : flex;
    & a{
        padding : 10px 30px;
        background-color: #ececec;
        text-decoration: none;
        font-weight: 500;
        color: black;
    }

    & a:hover{
        background-color: grey;
        color: white;
    }
    flex-direction:column;
    z-index:10;
    position: absolute;
    bottom : -8rem;
`;