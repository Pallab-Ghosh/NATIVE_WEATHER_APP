import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const url = `https://api.openweathermap.org/data/2.5/weather?lat=22.8010&lon=88.3699&appid=202df2cc776dd5986ec378b81f3013bd&units=metric`

type weathrprops={
    name:string,
    main:{
    temp:number,
    feels_like :number,
    temp_min:number,
    temp_max:number,
    pressure:number,
    humidity:number,
    sea_level:number,
    grnd_level:number
    }
}

const Weather = () => {
  
    const [weather , setweather] = useState<weathrprops>();


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
    <View style={styles.container}>
      <Text style={styles.location}>{weather.name}</Text>
      <Text style={styles.temp}>{weather.main.temp}° </Text>
    </View>
  )
}

export default Weather

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    location:{
        fontFamily :'Inter',
        fontSize:30
    },
    temp:{
         
        fontSize:70,
        color:'gray'
    }
})