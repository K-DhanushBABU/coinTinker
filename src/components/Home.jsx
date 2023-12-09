import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import ImageCarousel from './ImageCarousel';
import backImgsrc from "../assets/backgroundimage.jpg";

const Home = () => {
  return (
    <Box position="relative" w="100vw" h="100vh" overflow="hidden">
      {/* Background Image */}
      <Image
        position="absolute"
        top="0"
        left="0"
        zIndex="-1"
        w="100%"
        h="100%"
        objectFit="cover"
        src={backImgsrc}
        alt="Background Image"
        filter={"grayscale(1)"}
      />

      {/* Carousel */}
      <Box position="relative"
        top={"25%"}
        zIndex="1">
        <ImageCarousel />
      </Box>
    </Box>
  );
};

export default Home;
