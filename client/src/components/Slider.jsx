import React, { useState } from 'react';
import { Arrow, Container, ImageContainer, InfoContainer, Wrapper, Img, Title, Desc, Button, Slide } from '../styled-components/styledSlider';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { sliderItems } from '../data.js'


const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction) => {
        if (direction === 'left') {
            if (slideIndex <= 0)
                setSlideIndex(sliderItems.length - 1)
                
            else
                setSlideIndex(slideIndex - 1)
        }
        if (direction === 'right') {
            if (slideIndex >= sliderItems.length - 1)
                setSlideIndex(0)
            else
                setSlideIndex(slideIndex + 1)
        }
    }
    return (
        <Container>
            <Arrow direction='left' onClick={() => handleClick('left')}>
                <ArrowLeft style={{
                    fill: 'black',
                   }}/>
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {
                    sliderItems.map(item => (
                        <Slide bg={item.bg} key={item.id}>
                            <ImageContainer>
                                <Img src={item.img} />
                            </ImageContainer>
                            <InfoContainer>
                                <Title>{item.title}</Title>
                                <Desc>{item.desc}</Desc>
                                <Button>SHOW NOW</Button>
                            </InfoContainer>
                        </Slide>
                    ))
                }
            </Wrapper>
            <Arrow direction='right' onClick={() => handleClick('right')}>
                <ArrowRight />
            </Arrow>
        </Container>
    );
};

export default Slider;