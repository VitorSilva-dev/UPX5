import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

export default function BooksScreen() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [currentBookId, setCurrentBookId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const loadBooks = async () => {
    const storedBooks = await AsyncStorage.getItem('books');
    if (storedBooks) {
      const booksData = JSON.parse(storedBooks);
      setBooks(booksData);
      calculateStatistics(booksData);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadBooks();
    }, [])
  );

  const saveBooks = async (updatedBooks) => {
    setBooks(updatedBooks);
    await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const handleSaveBook = () => {
    if (!title || !author || !pagesRead || !totalPages) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (currentBookId !== null) {
      const updatedBooks = books.map((book) =>
        book.id === currentBookId
          ? { ...book, title, author, pagesRead, totalPages }
          : book
      );
      saveBooks(updatedBooks);
      setCurrentBookId(null);
    } else {
      const newBook = {
        id: Date.now().toString(),
        title,
        author,
        pagesRead,
        totalPages,
      };
      saveBooks([...books, newBook]);
    }

    setTitle('');
    setAuthor('');
    setPagesRead('');
    setTotalPages('');
    setModalVisible(false);
  };

  const handleCancelEdit = () => {
    setTitle('');
    setAuthor('');
    setPagesRead('');
    setTotalPages('');
    setCurrentBookId(null);
    setModalVisible(false);
  };

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    saveBooks(updatedBooks);
  };

  const handleEditBook = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setPagesRead(book.pagesRead);
    setTotalPages(book.totalPages);
    setCurrentBookId(book.id);
    setModalVisible(true);
  };

  const handleAddBook = () => {
    setModalVisible(true);
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>Autor: {item.author}</Text>
        <Text style={styles.pages}>Páginas lidas: {item.pagesRead} / {item.totalPages}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => handleEditBook(item)}>
          <Icon name="edit" size={20} color="#6200ee" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteBook(item.id)}>
          <Icon name="trash" size={20} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gerenciar Livros</Text>

      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum livro cadastrado.</Text>}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddBook()}
      >
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancelEdit}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>{currentBookId ? 'Editar Livro' : 'Adicionar Livro'}</Text>

            <TextInput
              style={styles.input}
              placeholder="Título do livro"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Autor"
              value={author}
              onChangeText={setAuthor}
            />
            <TextInput
              style={styles.input}
              placeholder="Páginas lidas"
              value={pagesRead}
              onChangeText={setPagesRead}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Total de páginas"
              value={totalPages}
              onChangeText={setTotalPages}
              keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSaveBook}
              >
                <Text style={styles.buttonText}>{currentBookId ? 'Editar Livro' : 'Adicionar Livro'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={handleCancelEdit}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
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
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#6200ee',
  },
  input: {
    borderColor: '#6200ee',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#d9534f',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  pages: {
    fontSize: 14,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#6200ee',
    borderRadius: 100,
    padding: 10,
    paddingLeft: 13,
    position: 'absolute',
    bottom: 30,
    right: 30,
    elevation: 5,
    width: 50,
    height: 50
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
