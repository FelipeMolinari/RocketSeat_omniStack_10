import React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync }  from 'expo-location'
import {MaterialIcons} from '@expo/vector-icons'
import api from '../services/api'

function Main({ navigation }) {
    const [techs, setTechs] = useState('')
    const [devs, setDevs] = useState([])
    const [currentRegion, setCurrentRegion] = useState(null)

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync()

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })
                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.06,
                    longitudeDelta: 0.06,
                })
            }

        }
        loadInitialPosition()
    }, [])

    async function loadDev(){
        const {latitude, longitude} = currentRegion

        const response = await api.get('/search', {
            params:{
                latitude,
                longitude,
                techs,
            }
        })
        console.log(response.data.devs)
        setDevs(response.data.devs)
    }

    function handleRegionChanged(region){
        setCurrentRegion(region)
    }
    if (!currentRegion) {
        return null
    }

    return (
        <>
            <MapView 
            onRegionChangeComplete={handleRegionChanged}
            initialRegion={currentRegion} 
            style={styles.map}
            >
               {devs.map(dev=>{
                   
                   return (
                    <Marker
                    key = {dev._id} 
                    coordinate={
                        { latitude: dev.location.coordinates[1],
                         longitude: dev.location.coordinates[0],
                         
                        }}>
    
                        <Image style={styles.avatar} 
                        source={{ uri: dev.github_avatarUrl }} />
    
                        <Callout onPress={() => {
                            navigation.navigate('Profile', { github_username: dev.github_username })
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.DevTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                   )
               })}
            </MapView>
            <View style = {styles.searchFrom}>
                <TextInput style={styles.searchImput}
                placeholder = "Buscar Devs por Techs"
                placeholderTextColor = "#999"
                autoCapitalize = "words"
                autoCorrect = {false}
                value = {techs}
                onChangeText= {text => setTechs(text)}
                />

                <TouchableOpacity onPress={loadDev} style= {styles.loadButton}>
                    <MaterialIcons name = "my-location" size = {20} color="#fff"/>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: "#FFF"
    },
    callout: {
        width: 200
    },
    devName: {
        fontWeight: "bold",
        fontSize: 16
    },

    devBio: {
        color: "#666",
        marginTop: 5
    },

    DevTechs: {
        marginTop: 5
    },
    searchFrom:{
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: "row",

    },

    searchImput: {
        flex : 1,
        height: 50,
        backgroundColor: "#FFF",
        color: "#333",
        borderRadius: 25,
        borderRadius: 25,
        paddingHorizontal:20,
        fontSize:16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 1
    },
    
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: "#8E4Dff",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15,

    }
})

export default Main

