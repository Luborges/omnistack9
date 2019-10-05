import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native';

import socketio from 'socket.io-client';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List(){
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.56.1:3431', {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            })
        });
    }, []);

    useEffect(() => {
        try{
            AsyncStorage.getItem('techs').then(storageTechs => {
                const techsArray = storageTechs.split(',').map(tech => tech.trim());
                setTechs(techsArray);
            });
        }
        catch(error){
            alert(error);
        }
    }, []);

    return (
        <SafeAreaView styles={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    logo:{
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    }
});