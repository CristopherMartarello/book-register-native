import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { resetar } from '../redux/bookSlice';
import { useDispatch } from 'react-redux';
import { useTema } from '../context/TemaContext';

export default function WelcomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const { tema } = useTema();

    const handleReset = () => {
        navigation.navigate('CadastroLivros');
        dispatch(resetar());
    };

    const isClaro = tema === 'claro';

    return (
        <View style={[styles.container, { backgroundColor: isClaro ? '#f2f2f2' : '#121212' }]}>
            <Image
                source={require('../assets/books.jpg')}
                style={styles.image}
                resizeMode="contain"
            />

            <Text style={[styles.title, { color: isClaro ? '#333' : '#fff' }]}>
                Bem-vindo ao MyLibrary
            </Text>
            <Text style={[styles.subtitle, { color: isClaro ? '#777' : '#bbb' }]}>
                Gerencie sua biblioteca pessoal com facilidade.
            </Text>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: isClaro ? '#4a90e2' : '#1e90ff' }]}
                onPress={handleReset}
            >
                <Text style={styles.buttonText}>Começar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
