import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from "../index";
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import Loader from './Loader';
import CoinCard from './CoinCard';
import Error from "./Error"


const Coins = () => {

  const [Coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false)
  const [page, setPage] = useState(1)
  const [Currency, setCurrency] = useState("inr")

  const currencySymbol = Currency === "inr" ? "₹" : Currency === "usd" ? "$" : "€";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }

  const btns = new Array(113).fill(1);

  useEffect(() => {
    const fetchEchanges = async () => {
      try {

        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${Currency}&page=${page}`);

        // console.log(data)
        setCoins(data);
        setLoading(false);


      } catch (error) {
        setLoading(false);
        seterror(true);
      }
    };
    fetchEchanges();

  }, [Currency, page]);


  if (error) return <Error msg={"SOMETHING WENT WRONG WHILE FETCHING COINS"} />

  return (
    <Container maxW={"container.xl"}>
      {
        loading ? <Loader /> : <>

          <RadioGroup value={Currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"6"} m={"6"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"} >USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>


          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {
              Coins.map((i) => (
                <CoinCard
                  key={i.id}
                  name={i.name}
                  id={i.id}
                  img={i.image}
                  symbol={i.symbol}
                  price={i.current_price}
                  currencySymbol={currencySymbol}
                />
              ))
            }
          </HStack>


          <HStack width={"full"} overflowX={'auto'} p={'8'}>
            {
              btns.map((items, index) => (
                < Button
                  key={index}
                  bgColor={"blackAlpha.800"} color={"white"} onClick={() => changePage(index + 1)}>
                  {index + 1}
                </Button>
              ))}
          </HStack>

        </>
      }
    </Container >
  )
}


export default Coins