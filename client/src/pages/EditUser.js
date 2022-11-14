import React, { useState } from 'react';
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
import moment from 'moment';
import Loading from './Loading/Loading'

const EditUser = () => {
    const user = useSelector(state => state.user.currentUser.user)
    const user1 = useSelector(state => state.user)
    console.log('a', user1)
    const [image, setImage] = useState(user?.image);
    const [username, setUserName] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [password, setPassword] = useState('123456');
    const [fullname, setFullName] = useState(user?.fullname);
    const [address, setAddress] = useState(user?.address);
    const [date, setDate] = useState(user?.date);
    const [phone, setPhone] = useState(user?.phone);
    const [loading, setLoading] = useState(false);

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
    const userUpdate = {
        ...user,
        // id: user._id,
        email,
        username,
        password,
        fullname,
        address,
        date: moment(date).format('YYYY-MM-DD'),
        phone,
        image

    }
    console.log('update', userUpdate)
    //update profile
    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true)
        update(dispatch,userUpdate)
        setLoading(false)
    }

    return (
        <Container>
            {loading ? <Loading /> : <>
                <ProfileContainer>
                    <Group>
                        <ImageContainer>
                            <Image src={user.image} />
                        </ImageContainer>
                        <UserName>{user.username}</UserName>
                    </Group>
                    <Group>
                        <Location />
                        <Name>{user.address}</Name>
                    </Group>
                    <Group>
                        <Badge />
                        <Name>{user.fullname}</Name>
                    </Group>
                    <Group>
                        <Email />
                        <Name>{user.email}</Name>
                    </Group>
                    <Group>
                        <DateRange />
                        <Name>{moment(user.date).format('YYYY-MM-DD')}</Name>
                    </Group>
                </ProfileContainer>
                <EditContainer>
                    <form>
                        <Title>Full name</Title>
                        <Input
                            value={fullname}
                            onChange={e => setFullName(e.target.value)}
                            placeholder='Quoc Doan' />
                        <Title>Address</Title>
                        <Input
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder='104 Mai Lao bang ...' />
                        <Title>Phone number</Title>
                        <Input
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder='096 495 35305' />
                        <Title>Date Of Birth</Title>
                        <Input
                            value={moment(date).format('YYYY-MM-DD')}
                            onChange={e => setDate(e.target.value)}
                            placeholder='15/06/2001' type='date' />
                        <Title>UserName</Title>
                        <Input
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                            placeholder='Quoc Doan' />
                        <Title>Email</Title>
                        <Input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type='email'
                            placeholder='quocdoan@gmail.com' />
                        <Title>Password</Title>
                        <Input
                            onChange={e => setPassword(e.target.value)}
                            type='password' />
                        <button
                            onClick={handleUpdate}
                            style={{ display: 'block', width: '100px', padding: '10px', letterSpacing: '2px', fontWeight: '600', marginTop: '1.2rem', outLine: 'none' }}>Update</button>
                    </form>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: "center" }}>
                        <DisplayImage>
                            <Image src={image && image} />
                        </DisplayImage>

                        <input
                            type="file"
                            accept='image/png, image/jpg, image/jpeg'
                            required
                            onChange={handleProductImageUpload} />
                    </div>
                </EditContainer></>}
        </Container>
    );
};

export default EditUser;