import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTema } from '../context/TemaContext';

export default function Configuracoes({ navigation }) {
  const { tema, alternarTema } = useTema();

  return (
    <View style={[styles.container, { backgroundColor: tema === 'claro' ? '#fefefe' : '#222' }]}>
      <Text style={[styles.titulo, { color: tema === 'claro' ? '#000' : '#fff' }]}>
        Tema atual: {tema}
      </Text>
      <Button title="Alternar Tema" onPress={alternarTema} />
      <View style={{ marginTop: 20 }}>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
});

