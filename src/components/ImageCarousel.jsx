import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Image, Text } from '@chakra-ui/react';


const ImageCarousel = () => {
    const [coinData, setCoinData] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&page=1');
                const data = await response.json();
                setCoinData(data);
            } catch (error) {
                console.error('Error fetching coin data:', error);
            }
        };

        fetchCoinData();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '60px',
        autoplay: true,
        autoplaySpeed: 1500,
        cssEase: 'linear',
        variableWidth: true,
        // centerPadding: '50px',
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                },
            },
        ],
        afterChange: (current) => {
            setActiveSlide(current);
        },
    };

    const scale = (index) => {
        return index === activeSlide ? 'scale(2.9)' : 'scale(0.7)';
    };


    console.clear();
    return (
        <Box maxWidth="100vw" maxH={"100vh"} overflow="hidden"

        >
            <Slider {...settings}>
                {coinData.map((coin, index) => (
                    <Box
                        key={index}
                        textAlign="center"
                        padding="5px"
                        bgColor={"rgba(0,0,0,0.85)"}

                    >
                        <Image
                            transition="transform 0.3s ease"
                            transform={scale(index)}
                            src={coin.image}
                            alt={`Coin Image ${index}`}
                            borderRadius="full"
                            boxSize="200px"
                            margin="40px"
                            padding="50px"
                        />
                        <Text color={"white"} mt="60px" fontWeight="bold" >{coin.name}</Text>
                    </Box>
                ))}
            </Slider>

        </Box>
    );
};

export default ImageCarousel;
