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
  Select,
  Text
} from "@chakra-ui/react";
import React from 'react';
import axios from "axios";
import { useState } from "react";
// import Plot from 'react-plotly.js';
import { parse } from 'json2csv';
import flatten from "json2csv/transforms/flatten";
// var Plot = require('react-plotly.js').default;
// import ReactApexChart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });




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

  const options1 = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: date
    }
  };
  const series1 = [
    {
      name: "price",
      data: price
    }
  ]
  const options2 = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: date
    }
  };
  const series2 = [
    {
      name: "lowest",
      data: trend_lower
    }
  ]
  const options3 = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: date
    }
  };
  const series3 = [
    {
      name: "highest",
      data: trend_upper
    }
  ]
  const options4 = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: date
    }
  };
  const series4 = [
    {
      name: "price",
      data: price
    }
  ]
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
          {loading ? null :
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
          }

        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : date ? (
          // "DATA LOADED SUCCESSFULLY"
          <>
          <Text fontSize='xl'  as='b'>Forecasted data {Math.round(parseFloat(years) * 365)} days</Text>
            <ReactApexChart
              type="line"
              options={options1}
              series={series1}
              height={350}
            />
            <Text fontSize='xl'  as='b'>Possible Low Trends of {Math.round(parseFloat(years) * 365)} days</Text>
            <ReactApexChart
              type="line"
              options={options2}
              series={series2}
              height={350}
            />
            <Text fontSize='xl'  as='b'>Possible High Trends of {Math.round(parseFloat(years) * 365)} days</Text>
            <ReactApexChart
              type="line"
              options={options3}
              series={series3}
              height={350}
            />
            {/* <Text fontSize='xl'  as='b'>Forecasted Histogram of {Math.round(parseFloat(years) * 365)} days</Text> */}
            {/* <ReactApexChart
              type="bar"
              options={options1}
              series={series1}
              height={350}
            /> */}
          </>
        ) : null}
      </Container>
    </>
  )
}

export default Hero