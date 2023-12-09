import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from "../index";
import { Container, HStack } from '@chakra-ui/react';
import Loader from './Loader';
import ExchangeCard from './ExchangeCard';
import Error from "./Error"

const Exchanges = () => {

  const [Exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false)

  useEffect(() => {
    const fetchEchanges = async () => {
      try {

        const { data } = await axios.get(`${server}/exchanges`);

        setExchanges(data);
        setLoading(false);


      } catch (error) {
        setLoading(false);
        seterror(true);
      }
    };
    fetchEchanges();

  }, []);


  if (error) return <Error msg={"SOMETHING WENT WRONG WHILE FETCHING EXCHANGES"} />

  return (
    <Container maxW={"container.xl"}>
      {loading ? <Loader /> : <>



        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {
            Exchanges.map((i) => (
              <ExchangeCard name={i.name}
                id={i.id}
                img={i.image}
                url={i.url}
                rank={i.trust_score_rank}
                year={i.year_established}
                key={i.id}

              />
            ))
          }
        </HStack>

      </>}
    </Container>
  )
}


export default Exchanges