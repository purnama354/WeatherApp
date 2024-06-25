import axios from "axios"
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import WeatherSearch from "./src/components/weatherSearch"
import WeatherInfo from "./src/components/weatherInfo"
import React, { useState } from "react"
import { BASE_URL, API_KEY } from "./src/constant"

const App = () => {
    const [weatherData, setWeatherData] = useState()
    const [city, setCity] = useState('')



    const searchWeather = (location) => {
        setCity(location)
        axios
            .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
            .then((response) => {
                const data = response.data
                data.visibility /= 1000
                data.visibility = data.visibility.toFixed(2)
                data.main.temp -= 273.15
                data.main.temp = data.main.temp.toFixed(2)
                setWeatherData(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <View style={styles.container}>
            <WeatherSearch searchWeather={searchWeather} />
            {weatherData && <WeatherInfo weatherData={weatherData} city={city} />} {/* Pass city as prop */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
})

export default App