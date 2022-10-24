import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    background: #2f2f2f;
`;
export const Left = styled.div`
    flex:1;
    display: flex;
    flex-direction:column;
    padding: 20px;
    color:white;
`;
export const Description = styled.p`
    margin: 20px 0;
`;
export const Logo = styled.h3`
    sup{
        font-size:10px;
    }
`;
export const SocialContainer = styled.div`
    display: flex;
`;
export const SocialIcon = styled.div`
    width:40px;
    height:40px;
    background-color: #${({ color }) => color};
    border-radius:50%;
    display: flex;
    justify-content:center;
    align-items: center;
    margin:0px 10px;
    cursor :pointer;
`;

export const Center = styled.div`
    flex:1;   
    color:white;
    padding: 20px;
`;
export const Title = styled.h3`
    margin-bottom: 20px;
`;
export const List = styled.ul`
    display: flex;
    flex-wrap:wrap;
    padding: 0;
    list-style-type: none;
    outline:none;
    margin: 20px 0;
`;
export const ListItem = styled.li`
    width:50%;
    margin-bottom:10px;
    &:hover{
        color: red;
    }
    cursor:pointer;
`;

export const Right = styled.div`
    color:white;
    flex:1;  
    padding: 20px; 
`;
export const ContactItem = styled.p`
    display: flex;
    align-items:center;
    margin-bottom:10px;
    &:hover{
        color:red;
    }
`;
export const Payment = styled.img`
    margin-top:15px;
    cursor:pointer;
`;