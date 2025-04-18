import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function BookCard({ book, tema, onEditar, onExcluir }) {
  const isClaro = tema === 'claro';

  return (
    <View style={[styles.card, { backgroundColor: isClaro ? '#fff' : '#444' }]}>
      <Image source={{ uri: book.foto }} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={[styles.nome, { color: isClaro ? '#000' : '#fff' }]}>{book.nome}</Text>
        <Text style={[styles.editora, { color: isClaro ? '#666' : '#ccc' }]}>
          Editora: {book.editora}
        </Text>
        <Text style={[styles.author, { color: isClaro ? '#666' : '#ccc' }]}>
          Autor: {book.author}
        </Text>
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
    width: 100,
    height: 100,
    marginRight: 15,
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
    marginTop: 5
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginTop: 5
  },
  botoes: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 10,
  },
});
