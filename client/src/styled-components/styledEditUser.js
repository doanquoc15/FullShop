import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding : 3rem 2rem;
    display: flex;
    gap :1rem;
`;
export const ProfileContainer = styled.div`
    flex : 1.5;
`;

export const EditContainer = styled.div`
    flex : 2;
    display:flex;
    align-items: center;
    gap : 4rem;
`;

export const Group = styled.div`
    display:flex;
    align-items: center;
    gap : 0.5rem;
    margin-bottom: 1rem;
    &>:nth-child(1){
        color : grey;
    }
`;

export const Name = styled.div`

`;
export const UserName = styled.div`
    font-weight: 550;
    font-size: 22px;
`;
export const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit:cover;
`;
export const ImageContainer = styled.div`
    width : 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
`;

// edit
export const ContainerGroup = styled.div`

`;
export const DisplayImage = styled.div`
    width : 170px;
    height : 200px;
    border : 0.5px solid lightgrey;
    overflow:hidden;
`;
export const Title = styled.div`
    letter-spacing : 2px;
    font-weight: 550;
    font-size : 15px;
    margin-top: 1rem;
    margin-top: 0.8rem;
`;
export const Input = styled.input`
    min-width: 300px;
    padding : 3px;
    outline : none;
`;
