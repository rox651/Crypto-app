import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import CryptoImg from "./assets/img/imagen-criptos.png"
import Form from "./components/Form"
import Trade from "./components/Trade"
import Spinner from "./components/Spinner"

const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    width: 90%;
    @media (min-width: 992px){
      display: grid;
      grid-template-columns: repeat(2,1fr);
      column-gap: 2rem;
    }
`

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34;

  &::after{
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [coins, setCoins] = useState({})
  const [trade, setTrade] = useState({})
  const [charging, setCharging] = useState(false)


  useEffect(()=>{
    if(Object.keys(coins).length > 0){
      const {coin,cryptosCoins} = coins;
      const tradeCrypto = async ()=>{
        setCharging(true)
        setTrade({})
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptosCoins}&tsyms=${coin}`

        const response =  await fetch(url)
        const result = await response.json()

        setTrade(result.DISPLAY[cryptosCoins][coin])
        setCharging(false)

        window.scrollTo(0,document.body.scrollHeight);
      }

      tradeCrypto()
    }
  },[coins])

  return (
    <Container>
      <Image src={CryptoImg}/>

      <div>
        <Heading>Trade Cryptocurrencies Instantly</Heading>
        <Form
        setCoins={setCoins}
        />


        {charging && <Spinner/>}
        {trade.PRICE && <Trade trade={trade}/>}
      </div>
    </Container>
  )
}

export default App
