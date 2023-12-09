import { Box, Divider, HStack } from '@chakra-ui/react';
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Importing Font Awesome icons
import { Stack, VStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const iconStyle = {
        width: '45px',
        height: 'auto',
        marginLeft: "25px"
    };

    return (
        <Box
            bgColor={'blackAlpha.900'}
            color={'whiteAlpha.700'}
            minH={'50'}
            px={'16'}
            py={['16', '18']}
        >
            <Stack direction={['column', 'row']} h={'full'} alignItems={'center'}>
                <VStack w={'full'} alignItems={['center', 'flex-start']}>
                    <Text fontWeight={'bold'}>About Us</Text>
                    <Text
                        fontSize={'20'}
                        letterSpacing={'widest'}
                        textAlign={['center', 'left']}
                    >
                        We Are One Of The Crypto Guidance Provider Website At Your FingerTips
                    </Text>
                </VStack>

                <VStack w={'full'} h={'full'} alignItems={["center", "flex-end"]} m={["5"]} >
                    <HStack alignItems={"center"} w>
                        <Link
                            target="_blank"
                            to={'https://github.com/K-DhanushBABU'}
                        >
                            <FaGithub style={iconStyle} />
                        </Link>

                        <Link
                            target="_blank"
                            to={'https://www.linkedin.com/in/dhanush-babu-k-738b37232'}
                        >
                            <FaLinkedin style={iconStyle} />
                        </Link>
                    </HStack>
                </VStack>
            </Stack>
            <Divider m={["7", "10"]}></Divider>
            <VStack w={"full"} h={"full"} alignItems={"center"}><Text>Made By Dhanush</Text>
                <Text>@ Copyrigth 2023</Text></VStack>
        </Box>
    );
};

export default Footer;
