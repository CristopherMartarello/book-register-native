import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function BookCard({ book, onEditar, onExcluir }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: book.foto }} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.nome}>{book.nome}</Text>
        <Text style={styles.editora}>Editora: {book.editora}</Text>
        <View style={styles.botoes}>
          <Button title="Editar" onPress={() => onEditar(book)} />
          <Button title="Excluir" onPress={() => onExcluir(book.id)} color="#c00" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  imagem: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editora: {
    fontSize: 14,
    color: '#666',
  },
  botoes: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 10,
  },
});
