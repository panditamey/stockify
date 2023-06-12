import {
  ChakraProvider,
  Heading,
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
} from "@chakra-ui/react";
import React from 'react';
import axios from "axios";
import { useState } from "react";
import Plot from 'react-plotly.js';
import { parse } from 'json2csv';



function Hero() {
    const [prompt, updatePrompt] = useState<any | null>(null);
    const [data, setData] = useState<any | null>(null);
    const [loading, updateLoading] = useState<any | null>(null);



    const generate = async () => {
      updateLoading(true);
        const result = await axios.post('https://panditamey-stockify-back.hf.space/stock_data', { "stock_symbol":"ICICIBANK.BO" });
        console.log(result.data)
        const csv = parse(result.data,{delimiter: ' ', header: true });
        console.log(csv);
        setData(result.data);
        updateLoading(false);
    };

    var trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers',
      name: 'Scatter'
    };
    
    var trace2 = {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: 'lines',
      name: 'Lines'
    };
    
    var trace3 = {
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers',
      name: 'Scatter + Lines'
    };
    
    var dataa = [ trace1, trace2, trace3 ];
    
    var layout = {
      title:'Adding Names to Line and Scatter Plot'
    };
    return (
        <>
        <Container>
        <Heading>Stable Diffusion</Heading>


        <Wrap marginBottom={"10px"}>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"768px"}
          ></Input>
          <Button onClick={(e) => {
            console.log("Clicked")
            generate();
            }} colorScheme={"yellow"}>
            Generate
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : data ? (
          // "DATA LOADED SUCCESSFULLY"
          <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            marker: {color: 'red'},
          },
        ]}
        layout={{width: 320, height: 240, title: 'A Fancy Plot'}}
      />
        ) : null}
      </Container>
        </>
    )
}

export default Hero