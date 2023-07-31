import styled from "@emotion/styled"
import useSelectCoin from "../hooks/useSelectCoin"
import { coins } from "../data/coins"
import { useEffect, useState } from "react"
import Error from "./Error"

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: .4s;
    margin-top: 30px;
    &:hover{
        background-color: #7A7DFE;
    }
`

export default function Form({setCoins}) {

  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  useEffect(()=>{
    const getData = async ()=>{
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"

        const response = await fetch(url)
        const result = await response.json()

        const arrayCriptos = result.Data.map(cripto => {

            const object = {
                id: cripto.CoinInfo.Name,
                name: cripto.CoinInfo.FullName
            }


            return object;
        })

        setCriptos(arrayCriptos)
    }

    getData()
  },[])



  const [coin, SelectCoin] = useSelectCoin("Choise your coin", coins)
  const [cryptosCoins, SelectCryptos] = useSelectCoin("Choise your coin", criptos)

  const handleSubmit = e=>{
    e.preventDefault()

    if([coin,cryptosCoins].includes("")){
        setError(true)
        return;
    }

    setError(false)
    setCoins({
        coin,
        cryptosCoins
    })
  }
  return (
    <>
    {error && <Error>Todos los campos son obligatorios</Error>}
    <form action="" onSubmit={handleSubmit}>
        <SelectCoin/>
        <SelectCryptos/>
        
        <InputSubmit 
            type="submit" 
            value="Trade" 
        />
    </form>
    </>
  )
}
