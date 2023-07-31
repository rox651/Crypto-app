import styled from '@emotion/styled'
import React from 'react'


const Container = styled.div`
    color: #fff;
    font-family: "Lato", sans-serif;
    display: flex;
    align-items: center;
    column-gap: 1rem;
    margin-top: 30px;
`

const Image = styled.img`
    display: block;
    width: 120px;
`

const Text = styled.p`
    font-size: 18px;
    span{
        font-weight:700;
    }
`

const Price = styled.p`
    font-size: 24px;
    span{
        font-weight:700;
    }
`

export default function Trade({trade}) {

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = trade
  return (
    <Container>
        <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="crypto-img" />
        <div>
            <Price>Price: <span>{PRICE}</span></Price>
            <Text>Price more high today: <span>{HIGHDAY}</span></Text>
            <Text>Price more low today: <span>{LOWDAY}</span></Text>
            <Text>Change last 24 hours: <span>{CHANGEPCT24HOUR}</span></Text>
            <Text>Last Update: <span>{LASTUPDATE}</span></Text>
        </div>
  
    </Container>
  )
}
