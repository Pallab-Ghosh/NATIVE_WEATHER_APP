import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const url = `https://api.openweathermap.org/data/2.5/weather?lat=22.8010&lon=88.3699&appid=202df2cc776dd5986ec378b81f3013bd&units=metric`



const Weather = () => {
  
    const [weather , setweather] = useState({});


  const fetchweather = async()=>{
     const result = await  fetch(url);
     const data = await result.json()
     setweather(data)
     console.log(data)
  }

  useEffect(()=>{
    fetchweather();
  },[])


if(!weather)
{
    return <ActivityIndicator/>
}

  return (
    <View>
      <Text>{weather.name}</Text>
    </View>
  )
}

export default Weather

const styles = StyleSheet.create({})