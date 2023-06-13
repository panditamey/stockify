"use client"
import {
  ChakraProvider,
  Heading,
  useToast,
  Container,
  // Text,
  Input,
  Button,
  Wrap,
  Stack,
  Image,
  // Link,
  SkeletonCircle,
  SkeletonText,
  Select
} from "@chakra-ui/react";
import React from 'react';
import axios from "axios";
import { useState } from "react";
// import Plot from 'react-plotly.js';
import { parse } from 'json2csv';
import flatten from "json2csv/transforms/flatten";
var Plot = require('react-plotly.js').default;




function Hero() {
  const [prompt, updatePrompt] = useState<any | null>(null);
  const [years, setYears] = useState<any | null>(null);
  const [date, setDate] = useState<any | []>(null);
  const [price, setPrices] = useState<any | []>(null);
  const [trend_lower, setLow] = useState<any | []>(null);
  const [trend_upper, setUp] = useState<any | []>(null);
  const [loading, updateLoading] = useState<any | null>(null);
  const toast = useToast()



  const generate = async (prompt: any) => {
    updateLoading(true);
    const result = await axios.post('https://panditamey-stockify-back.hf.space/stock_data',
      {
        "stock_symbol": prompt,
        "years": years
      }
    );
    var dates = result.data["dates"]
    var prices = result.data["prices"]
    var trend_lower = result.data["trend_lower"]
    var trend_upper = result.data["trend_upper"]
    dates = dates.replace(/'/g, '"');
    dates = JSON.parse(dates);
    prices = prices.replace(/'/g, '"');
    prices = JSON.parse(prices);
    trend_lower = trend_lower.replace(/'/g, '"');
    trend_lower = JSON.parse(trend_lower);
    trend_upper = trend_upper.replace(/'/g, '"');
    trend_upper = JSON.parse(trend_upper);
    setDate(dates)
    setPrices(prices)
    setLow(trend_lower)
    setUp(trend_upper)
    updateLoading(false);
  };
  return (
    <>
      <Container mt={20}>
        <Heading mb={5}>Enter Stock Symbol</Heading>


        <Wrap >
          <Input mb={5}
            value={prompt}
            placeholder="ICICIBANK.BO"
            onChange={(e) => updatePrompt(e.target.value)}
            width={"768px"}
          ></Input>


          <Select mb={5} placeholder='Years Of Prediction' onChange={(e) => { setDate(null); setYears(e.target.value) }}>
            <option value='0.0168'>1 Week</option>
            <option value='0.084'>1 Month</option>
            <option value='0.504'>6 Month</option>
            <option value='1'>1 Year</option>
            <option value='2'>2 Years</option>
            <option value='3'>3 Years</option>
            <option value='4'>4 Years</option>
            <option value='5'>5 Years</option>
            <option value='6'>6 Years</option>
            <option value='7'>7 Years</option>
            <option value='8'>8 Years</option>
            <option value='9'>9 Years</option>
            <option value='10'>10 Years</option>
          </Select>

          <Button mb={5} onClick={(e) => {
            console.log("Clicked")
            if (years != null && prompt != null) {
              generate(prompt);
            }
            else if (prompt == null) {
              toast({
                title: 'Enter Stock Symbol',
                status: 'warning',
                duration: 5000,
                isClosable: false,
              })
            }
            else {
              toast({
                title: 'Kindly Select Years Of Prediction',
                status: 'warning',
                duration: 5000,
                isClosable: false,
              })
            }

            console.log(years)
          }} colorScheme={"yellow"}>
            Generate
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : date ? (
          // "DATA LOADED SUCCESSFULLY"
          <>
            <Plot
              data={[
                {
                  x: date,
                  y: price,
                  type: 'scatter',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: window.innerWidth > 1000 ? window.innerWidth / 2 : window.innerWidth / 1.2, height: window.innerHeight / 2, title: `Forecasted data ${Math.round(parseFloat(years) * 365)} days` }}
            />

            <Plot
              data={[
                {
                  x: date,
                  y: trend_lower,
                  mode: 'scatter',
                  autorange: false,
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: window.innerWidth > 1000 ? window.innerWidth / 2 : window.innerWidth / 1.2, height: window.innerHeight / 2, title: `Possible Low Trends ${Math.round(parseFloat(years) * 365)} days` }}
            />

            <Plot
              data={[
                {
                  x: date,
                  y: trend_upper,
                  mode: 'scatter',
                  autorange: false,
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: window.innerWidth > 1000 ? window.innerWidth / 2 : window.innerWidth / 1.2, height: window.innerHeight / 2, title: `Possible High Trends ${Math.round(parseFloat(years) * 365)} days` }}
            />
            <Plot
              data={[
                {
                  x: date,
                  y: price,
                  type: 'histogram',
                  marker: { color: 'blue' },
                },
              ]}
              layout={{ width: window.innerWidth > 1000 ? window.innerWidth / 2 : window.innerWidth / 1.2, height: window.innerHeight / 2, title: `Histogram of ${Math.round(parseFloat(years) * 365)} days` }}
            />
          </>
        ) : null}
      </Container>
    </>
  )
}

export default Hero