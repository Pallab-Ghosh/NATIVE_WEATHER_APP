import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LocationObject } from 'expo-location'
 
import * as Location from 'expo-location';
const Base_url = `https://api.openweathermap.org/data/2.5/weather?lat=22.8010&lon=88.3699&appid=202df2cc776dd5986ec378b81f3013bd&units=metric`

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
const base_url = 'https://api.openweathermap.org/data/2.5/weather'
const api = process.env.EXPO_PUBLIC_api_key

const Weather = () => {
  
    const [weather , setweather] = useState<weathrprops>();
    const lat ="22.8010"
    const long = "88.3699"

    const [location, setLocation] = useState<Location.LocationObject>();
    const [errorMsg, setErrorMsg] = useState('');

  const fetchweather = async()=>{
     const result = await fetch(`${base_url}?lat=${lat}&lon=${long}&appid=${api}&units=metric`);
     const data = await result.json()
     setweather(data)
     console.log(data)
  }

  useEffect(()=>{
    fetchweather();
  },[])

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location)
      setLocation(location);
    })();
  }, []);


if(!weather)
{
    return <ActivityIndicator/>
}

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
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
        
        fontSize:30
    },
    temp:{
         
        fontSize:150,
        color:'gray'
    }
})