import React,{useState} from 'react';
import {
    Container,
    ProfileContainer,
    EditContainer,
    Group,
    Title,
    Name,
    UserName,
    Image,
    ImageContainer,
    Input,
    DisplayImage
} from '../styled-components/styledEditUser';
import Location from '@mui/icons-material/LocationOn';
import Badge from '@mui/icons-material/Badge';
import Email from '@mui/icons-material/Email';
import DateRange from '@mui/icons-material/DateRange';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../redux/apiCall';
const EditUser = () => {
    const user = useSelector(state => state.user.currentUser.user)
    const [image, setImage] = useState(user.image);
    const [username, setUserName ] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();


    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];
        TransformFile(file);
    }

    //hien thi image truoc khi dua len mongoose
    const TransformFile = (file) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setImage(reader.result)
            }
        } else {
            setImage('')
        }
    }

    //update profile
    const handleUpdate = (e) => {
        e.preventDefault();
        update(dispatch, {
            id: user._id,
            email,
            username,
            password,
            // image
         })
    }

    return (
        <Container>
            <ProfileContainer>
                <Group>
                    <ImageContainer>
                        <Image src={user.image} />
                    </ImageContainer>
                    <UserName>{user.username}</UserName>
                </Group>
                <Group>
                    <Location />
                    <Name>K104/6A, Mai Lao Bang, Thuan Phuoc, Hai Chau, Da Nang.</Name>
                </Group>
                <Group>
                    <Badge />
                    <Name>Doan Ngoc Phu Quoc</Name>
                </Group>
                <Group>
                    <Email />
                    <Name>{user.email}</Name>
                </Group>
                <Group>
                    <DateRange />
                    <Name>15 - 06 - 2001</Name>
                </Group>
            </ProfileContainer>
            <EditContainer>
                <form>
                    <Title>UserName</Title>
                    <Input placeholder='Quoc Doan' />
                    <Title>Email</Title>
                    <Input
                        type='email'
                        placeholder='quocdoan@gmail.com' />
                    <Title>Password</Title>
                    <Input type='password' />
                    <button
                        onClick={handleUpdate}
                        style={{ display: 'block', width: '100px', padding: '10px', letterSpacing: '2px', fontWeight: '600', marginTop: '1.2rem', outLine: 'none' }}>Update</button>
                </form>
                <div style={{display :'flex',gap : '0.5rem', alignItems:"center"}}>
                    <DisplayImage>
                        <Image src={image && image} />
                    </DisplayImage>
                
                    <input 
                        type="file"
                        accept='image/png, image/jpg, image/jpeg'
                        required
                        onChange={handleProductImageUpload}/>
                </div>
            </EditContainer>
        </Container>
    );
};

export default EditUser;