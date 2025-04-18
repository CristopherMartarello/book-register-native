import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Modal } from 'react-native';
import BookCard from '../components/BookCard';
import { useDispatch, useSelector } from 'react-redux';
import { incrementar, decrementar } from '../redux/bookSlice';
import { useTema } from '../context/TemaContext';

export default function CadastroLivros({ navigation }) {
  const [livros, setLivros] = useState([]);
  const [nome, setNome] = useState('');
  const [editora, setEditora] = useState('');
  const [foto, setFoto] = useState('');
  const [idEditar, setIdEditar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const total = useSelector((state) => state.livros.total);
  const { tema } = useTema();

  const openBookRegisterModal = () => {
    setModalVisible(true);
  };

  const closeBookRegisterModal = () => {
    setModalVisible(false);
  };

  const handleSaveClick = () => {
    if (!nome || !editora || !foto) return;

    if (idEditar !== null) {
      setLivros(livros.map(livro => livro.id === idEditar ? { id: livro.id, nome, editora, foto } : livro));
      setIdEditar(null);
    } else {
      const novoLivro = { id: Date.now(), nome, editora, foto };
      setLivros([...livros, novoLivro]);
      dispatch(incrementar());
    }

    setNome('');
    setEditora('');
    setFoto('');
  };

  const editar = (livro) => {
    setNome(livro.nome);
    setEditora(livro.editora);
    setFoto(livro.foto);
    setIdEditar(livro.id);
  };

  const excluir = (id) => {
    setLivros(livros.filter(a => a.id !== id));
    dispatch(decrementar());
    if (id === idEditar) {
      setIdEditar(null);
      setNome('');
      setEditora('');
      setFoto('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: tema === 'claro' ? '#f9f9f9' : '#333' }]}>
      <View style={styles.header}>
        <Text style={[styles.titulo, { color: tema === 'claro' ? '#000' : '#fff' }]}>
          Total de Livros: {total}
        </Text>
        <Button title={"Cadastrar"} onPress={openBookRegisterModal} />
      </View>

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Editora" value={editora} onChangeText={setEditora} style={styles.input} />
      <TextInput placeholder="URL da Foto" value={foto} onChangeText={setFoto} style={styles.input} />

      <FlatList
        data={livros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BookCard book={item} onEditar={editar} onExcluir={excluir} />}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Ir para Configurações" onPress={() => navigation.navigate('Configuracoes')} />
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeBookRegisterModal}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, height: 500, backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 14, marginBottom: 5 }}>Nome</Text>
            <TextInput
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
              placeholderTextColor={'#d3d3d3'}
            />

            <Text style={{ fontSize: 14, marginBottom: 5 }}>Editora</Text>
            <TextInput
              placeholder="Editora"
              value={editora}
              onChangeText={setEditora}
              style={styles.input}
              placeholderTextColor={'#d3d3d3'}
            />

            <Text style={{ fontSize: 14, marginBottom: 5 }}>URL da Foto</Text>
            <TextInput
              placeholder="URL da Foto"
              value={foto}
              onChangeText={setFoto}
              style={styles.input}
              placeholderTextColor={'#d3d3d3'}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
              <Button title="Fechar" onPress={closeBookRegisterModal} />
              <Button title="Salvar" onPress={handleSaveClick} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
