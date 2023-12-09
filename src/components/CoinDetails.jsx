import { Box, Container, HStack, Radio, RadioGroup, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { server } from '..';
import axios from 'axios';
import Error from './Error';
import Chart from "./ChartCard"

const CoinDetails = () => {
  const { id } = useParams();
  const [Coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false)
  const [Currency, setCurrency] = useState("inr")
  const currencySymbol = Currency === "inr" ? "₹" : Currency === "usd" ? "$" : "€";

  const btns = ["24h", "7d", "14d", "30d", "60d", "100d", "1Y", "max"]

  const [selectedIdx, setSelectedIdx] = useState(-1); // Initially no button is selected

  const handleButtonClick = (index) => {
    setSelectedIdx(index === selectedIdx ? -1 : index); // Toggle selection on button click
  };

  const [days, setdays] = useState("24h");
  const [chartArray, setchartArray] = useState([])

  const switchChartStats = (key) => {

    switch (key) {
      case "24h":
        setdays(key);
        setLoading(true);
        break;
      case "7d":
        setdays(key);
        setLoading(true);
        break;
      case "14d":
        setdays(key);
        setLoading(true);
        break;
      case "30d":
        setdays(key);
        setLoading(true);
        break;
      case "60d":
        setdays(key);
        setLoading(true);
        break;
      case "100d":
        setdays(key);
        setLoading(true);
        break;
      case "1Y":
        setdays("365d");
        setLoading(true);
        break;

      case "max":
        setdays(key);
        setLoading(true);
        break;

      default:
        setdays("24h");
        setLoading(true);
        break;

    }
  }

  useEffect(() => {

    const fetchCoin = async () => {
      try {

        const { data } = await axios.get(`${server}/coins/${id}`);

        const { data: chartData } = await axios.get(`${server}/coins/${id}/market_chart?vs_currency=${Currency}&days=${days}`);
        setCoin(data);
        // console.log(chartData)
        setchartArray(chartData.prices);
        setLoading(false);

      } catch (error) {
        setLoading(false);
        seterror(true);
      }
    };
    fetchCoin();

  }, [id, Currency, days]);

  if (error) return <Error msg={"SOMETHING WENT WRONG WHILE FETCHING COINS"} />

  return (<Container maxW={["100%", "container.xl"]} p={["1", "0"]} fontSize={["smaller"]}>
    {
      loading ? <Loader /> : (
        <>
          {/* box chart goes here */}

          <VStack maxW={"70vw"} maxH={"70vh"} borderWidth={1} m="5">
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </VStack>

          {/* buttons for changing graph */}

          <HStack p={"4"} wrap={"wrap"}>
            {btns.map((i, index) => (
              <Button
                bg={selectedIdx === index ? 'teal' : ''}
                color={selectedIdx === index ? 'white' : ''}

                _hover={{
                  bg: 'teal',
                  color: 'black',
                }}
                variant={"outline"}
                key={index}
                onClick={() => {
                  handleButtonClick(index);
                  switchChartStats(i);
                }}
              >
                {i}
              </Button>
            ))}
          </HStack>

          {/* for changing the currency state with radio option */}
          < RadioGroup value={Currency} onChange={setCurrency} p={"8"} mb={"0"}>
            <HStack spacing={"6"} m={"6"}>
              <Radio colorScheme='teal' value={"inr"}>INR</Radio>
              <Radio colorScheme="teal" value={"usd"} >USD</Radio>
              <Radio colorScheme="teal" value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          {/* after radio */}
          <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
            {/* {for creating time text and updating time on the basis of market-data.last_update} */}

            <Text fontSize={"small"} alignSelf="center" opacity={0.7}>Last Updated On {Date(Coin.market_data.last_updated).split("G")[0]}</Text>

            {/* for the image and other market details */}
            <Image src={Coin.image.large} w={"16"} h={"16"} objectFit={"contain"} />

            <Stat>
              <StatLabel> {Coin.name}
              </StatLabel>
              <StatNumber>
                {/* here 
                a={b:"sad"}
                here b can be accessed by a.b or  by string 
                a["b"] in the below we use string method
                */}
                {currencySymbol}{Coin.market_data.current_price[Currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={Coin.market_data.price_change_percentage_24h_in_currency[Currency] > 0 ? "increase" : "decrease"} />

                {Coin.market_data.price_change_percentage_24h_in_currency[Currency]}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"} >
              {`#${Coin.market_cap_rank}`}
            </Badge>

            {/* custombar based on low and high in last 24 hour */}

            <CustomBar high={Coin.market_data.high_24h[Currency]} low={Coin.market_data.low_24h[Currency]} currentPrice={Coin.market_data.current_price[Currency]}
              currencySymbol={currencySymbol} />

            <Box w={"full"} p={"4"} >
              <Item title={"Max Supply"} value={Coin.market_data.max_supply == null ? "N/A" : Coin.market_data.max_supply} />

              <Item title={"Circulating Supply"} value={Coin.market_data.circulating_supply == null ? "N/A" : Coin.market_data.circulating_supply} />

              <Item title={"Market Cap "} value={`${currencySymbol} ${Coin.market_data.market_cap[Currency]}` == null ? "N/A" : `${currencySymbol} ${Coin.market_data.market_cap[Currency]}`} />

              <Item title={"All Time High"} value={`${currencySymbol} ${Coin.market_data.ath[Currency]}` == null ? "N/A" : `${currencySymbol} ${Coin.market_data.ath[Currency]}`} />

              <Item title={"All Time Low"} value={`${currencySymbol} ${Coin.market_data.atl[Currency]}` == null ? "N/A" : `${currencySymbol} ${Coin.market_data.atl[Currency]}`} />

            </Box>
          </VStack>

        </>
      )
    }
  </Container >
  );
};

// Item code

const Item = ({ title, value }) => {
  return (

    <HStack justifyContent={"space-between"} w={"full"} my={"5"} fontSize={["12", "20"]} >
      <Text fontWeight={"700"} letterSpacing={"wider"}>{title}</Text>
      <Text fontWeight={"700"} letterSpacing={"widest"}>{value}</Text>
    </HStack>
  )
}


// custombar code
const CustomBar = ({ high, low, currentPrice, currencySymbol }) => {

  // Calculating the progress percentage based on the range of values
  const range = high - low;
  const valueRelativeToRange = currentPrice - low;
  const calculatedPercentage = (valueRelativeToRange / range) * 100;

  return (
    <VStack w="full">
      {/* Passing  the calculated percentage to the Progress component */}
      <Progress value={calculatedPercentage} colorScheme="teal" w="full" />

      {/* Displaying the 24H range values */}
      <HStack justifyContent="space-between" w="full">
        {/* 1st part */}
        <VStack> <Badge children={`${currencySymbol} ${low}`} colorScheme="red" />
          <Text fontSize="sm" fontWeight={"bold"}>Low(In 24H)</Text></VStack>
        {/* middle part */}
        <Text fontSize="sm" fontWeight={"semibold"}>24H Range</Text>
        {/* last part */}
        <VStack>
          <Badge children={`${currencySymbol} ${high}`}
            colorScheme="green" />
          <Text fontSize="sm" fontWeight={"bold"}>High(In 24H)</Text>
        </VStack>

      </HStack>
    </VStack>
  );
};

export default CoinDetails