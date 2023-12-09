import { Heading, VStack, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const ExchangeCard = (props) => {
    const shadowColor = useColorModeValue('rgba(160, 174, 192, 1)', 'rgba(160, 174, 192, 0.25)');

    return (

        <a href={props.url} target={"blank"}>
            <VStack w={"52"}
                // shadow={"xl"}
                boxShadow={`0px 4px 12px 0px ${shadowColor}`} // Set boxShadow
                p={"8"} borderRadius={"lg"} transition={"all 0.3s"}
                m={"4"}

                css={{
                    "&:hover": {
                        transform: "scale(1.2)"
                    }
                }}>
                <Image
                    src={props.img}
                    w={"10"}
                    h={"10"}
                    objectFit={"contain"}
                    alt={"Exchange"} />
                <Heading size={"md"} noOfLines={1}>
                    {props.rank}
                </Heading>
                <Text noOfLines={1}>{props.name}</Text>
                <Text fontSize={"xs"}>{props.year}</Text>

            </VStack>

        </a>
    )
}

export default ExchangeCard