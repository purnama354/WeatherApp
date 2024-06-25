import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { BASE_URL, API_KEY } from "../constant"

const WeatherInfo = ({ city }) => { // Add city as a prop
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}`) // Use city prop
        const data = await response.json()
        setWeatherData(data)
      } catch (error) {
        console.error("Failed to fetch weather data:", error)
      }
    }

    fetchWeatherData()
  }, [city]) // Add city to dependency array

  if (!weatherData) return <View><Text>Loading...</Text></View>
  const { name, main, weather, visibility, wind } = weatherData
  const temperatureCelsius = (main.temp - 273.15).toFixed(2) // Convert from Kelvin to Celsius
  const iconUri = `https://openweathermap.org/img/w/${weather[0].icon}.png`

  return (
      <View style={styles.marginTop20}>
        <Text style={styles.text}>The weather in {name}</Text>
        <Text style={[styles.temperature, styles.marginTop20]}>
          {temperatureCelsius} °C
        </Text>
        <View style={[styles.rowContainer, styles.marginTop20]}>
          <Image source={{ uri: iconUri }} style={styles.weatherIcon} />
          <Text style={[styles.text, styles.bold]}>{weather[0].main}</Text>
        </View>
        <Text style={styles.text}>{weather[0].description}</Text>
        <View style={[styles.rowContainer, styles.marginTop20]}>
          <Text style={[styles.text, styles.bold]}>Visibility :</Text>
          <Text style={[styles.text, styles.marginLeft15]}>
            {visibility / 1000} km
          </Text>
        </View>
        <View style={[styles.rowContainer, styles.marginTop20]}>
          <Text style={[styles.text, styles.bold]}>Wind Speed :</Text>
          <Text style={[styles.text, styles.marginLeft15]}>{wind.speed} m/s</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  marginTop20: {
    marginTop: 20,
  },
  marginLeft15: {
    marginLeft: 15,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
  bold: {
    fontWeight: "700",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  temperature: {
    fontWeight: "700",
    fontSize: 80,
    textAlign: "center",
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
})

export default WeatherInfo