import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BookCard from '../components/BookCard';
import { useDispatch, useSelector } from 'react-redux';
import { incrementar, decrementar } from '../redux/bookSlice';
import { useTema } from '../context/TemaContext';

export default function CadastroLivros({ navigation }) {
  const [livros, setLivros] = useState([]);
  const [nome, setNome] = useState('');
  const [editora, setEditora] = useState('');
  const [author, setAuthor] = useState('');
  const [genero, setGenero] = useState('');
  const [foto, setFoto] = useState('');
  const [idEditar, setIdEditar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();
  const total = useSelector((state) => state.livros.total);
  const { tema } = useTema();

  const openBookRegisterModal = () => {
    setModalVisible(true);
  };

  const closeBookRegisterModal = () => {
    setModalVisible(false);
    setNome('');
    setEditora('');
    setAuthor('');
    setGenero('');
    setFoto('');
    setSelectedImage(null);
  };

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Você precisa permitir acesso à galeria para selecionar uma imagem.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      setFoto(uri);
    }
  };

  const handleSaveClick = () => {
    if (!nome || !editora || !author || !genero || !foto) {
      return alert('Por favor, preencha todos os campos.');
    };

    if (idEditar !== null) {
      setLivros(livros.map(livro => livro.id === idEditar ? { id: livro.id, nome, editora, author, genero, foto } : livro));
      setIdEditar(null);
      alert('Livro editado com sucesso!');
    } else {
      const novoLivro = { id: Date.now(), nome, editora, author, genero, foto };
      setLivros([...livros, novoLivro]);
      dispatch(incrementar());
      alert('Livro cadastrado com sucesso!');
    }

    setNome('');
    setEditora('');
    setAuthor('');
    setGenero('');
    setFoto('');
    setSelectedImage(null);
    closeBookRegisterModal();
  };

  const editar = (livro) => {
    setNome(livro.nome);
    setEditora(livro.editora);
    setAuthor(livro.author);
    setGenero(livro.genero);
    setFoto(livro.foto);
    setSelectedImage(livro.foto);
    setIdEditar(livro.id);
    openBookRegisterModal();
  };

  const excluir = (id) => {
    setLivros(livros.filter(a => a.id !== id));
    dispatch(decrementar());
    if (id === idEditar) {
      setIdEditar(null);
      setNome('');
      setEditora('');
      setAuthor('');
      setGenero('');
      setFoto('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: tema === 'claro' ? '#f9f9f9' : '#333' }]}>
      <View style={styles.header}>
        <Text style={[styles.titulo, { color: tema === 'claro' ? '#000' : '#fff' }]}>
          Livros encontrados ({total})
        </Text>
        <TouchableOpacity style={styles.button} onPress={openBookRegisterModal}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <View style={{ borderTopWidth: 1, borderColor: '#ddd', marginVertical: 15 }} />

      {livros && livros.length ? (
        <FlatList
          data={livros}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BookCard book={item} tema={tema} onEditar={editar} onExcluir={excluir} />}
        />
      ) : (
        <Text style={styles.noBooksText}>Não há livros cadastrados.</Text>
      )}

      <View style={{ flex: 1 }} />

      <View style={{ marginVertical: 20 }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Configuracoes')}>
          <Text style={styles.buttonText}>Ir para Configurações</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeBookRegisterModal}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={selectedImage ? { width: 300, height: 650, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden' } : { width: 300, height: 450, backgroundColor: '#fff', borderRadius: 10, overflow: 'hidden' }}>
            <View style={{ flex: 1, padding: 20 }}>
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

              <Text style={{ fontSize: 14, marginBottom: 5 }}>Autor</Text>
              <TextInput
                placeholder="Autor"
                value={author}
                onChangeText={setAuthor}
                style={styles.input}
                placeholderTextColor={'#d3d3d3'}
              />

              <Text style={{ fontSize: 14, marginBottom: 5 }}>Gênero</Text>
              <TextInput
                placeholder="Gênero"
                value={genero}
                onChangeText={setGenero}
                style={styles.input}
                placeholderTextColor={'#d3d3d3'}
              />

              <Text style={{ fontSize: 14, marginBottom: 5 }}>Foto</Text>
              {selectedImage && (
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 175, height: 175, margin: 10, borderRadius: 10 }}
                  />
                </View>
              )}
              <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
                <Text style={{ color: 'blue' }}>Selecionar Foto</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderTopWidth: 1, borderColor: '#ddd' }}>
              <TouchableOpacity style={styles.buttonDanger} onPress={closeBookRegisterModal}>
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSaveClick}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
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
    fontSize: 18,
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
    alignItems: 'center',
  },
  uploadButton: {
    padding: 10,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  noBooksText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center'
  },
  buttonDanger: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  }
});
