import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function StatisticsScreen() {
    const [books, setBooks] = useState([]);
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalPagesRead, setTotalPagesRead] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

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

    const handleIncrementPages = async (bookId) => {
        const updatedBooks = books.map(book => {
            if (book.id === bookId) {
                return { ...book, pagesRead: Math.min(book.pagesRead + 1, book.totalPages) };
            }
            return book;
        });
        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
        calculateStatistics(updatedBooks);
    };

    const handleDecrementPages = async (bookId) => {
        const updatedBooks = books.map(book => {
            if (book.id === bookId) {
                return { ...book, pagesRead: Math.max(book.pagesRead - 1, 0) };
            }
            return book;
        });
        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
        calculateStatistics(updatedBooks);
    };

    const calculateStatistics = (booksData) => {
        const totalBooksCount = booksData.length;
        const pagesReadCount = booksData.reduce((total, book) => total + parseInt(book.pagesRead || 0), 0);
        const totalPagesCount = booksData.reduce((total, book) => total + parseInt(book.totalPages || 0), 0);

        setTotalBooks(totalBooksCount);
        setTotalPagesRead(pagesReadCount);
        setTotalPages(totalPagesCount);
    };

    const calculatePercentage = () => {
        if (totalPages === 0) return 0;
        return ((totalPagesRead / totalPages) * 100).toFixed(2);
    };

    const chartData = {
        labels: ['Livros Lidos', 'Livros Não Lidos'],
        datasets: [
            {
                data: [
                    totalPagesRead,
                    totalPages - totalPagesRead,
                ],
                color: [(opacity = 1) => `rgba(76, 175, 80, ${opacity})`, (opacity = 1) => `rgba(244, 67, 54, ${opacity})`],
                strokeWidth: 2,
            },
        ],
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Estatísticas de Leitura</Text>

            {/* Gráfico de Barras */}
            <BarChart
                data={chartData}
                width={350}
                height={220}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                verticalLabelRotation={30}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />

            <View style={styles.statCard}>
                <Text style={styles.statTitle}>Total de Livros: {totalBooks}</Text>
                <Text style={styles.statTitle}>Páginas Lidas: {totalPagesRead}</Text>
                <Text style={styles.statTitle}>Total de Páginas: {totalPages}</Text>
                <Text style={styles.statTitle}>Porcentagem Lida: {calculatePercentage()}%</Text>
            </View>

            <Text style={styles.subHeader}>Livros Cadastrados:</Text>
            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.bookCard}>
                        <Text style={styles.bookTitle}>{item.title}</Text>
                        <Text style={styles.bookDetails}>Autor: {item.author}</Text>
                        <Text style={styles.bookDetails}>Páginas: {item.pagesRead} / {item.totalPages}</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => handleDecrementPages(item.id)} disabled={item.pagesRead === 0}>
                                <Icon name="minus" size={20} color="#6200ee" style={styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleIncrementPages(item.id)} disabled={item.pagesRead >= item.totalPages}>
                                <Icon name="plus" size={20} color="#6200ee" style={styles.icon} />
                            </TouchableOpacity>
                            {/* <Button title="-" onPress={() => handleDecrementPages(item.id)} disabled={item.pagesRead === 0} />
                            <Button title="+" onPress={() => handleIncrementPages(item.id)} disabled={item.pagesRead >= item.totalPages} /> */}
                        </View>

                        <View style={styles.progressBar}>
                            <View style={[styles.progress, { width: `${(item.pagesRead / item.totalPages) * 100}%` }]} />
                        </View>
                        <Text style={styles.progressText}>{((item.pagesRead / item.totalPages) * 100).toFixed(0)}% Lido</Text>

                        <Rating
                            type='star'
                            ratingCount={5}
                            imageSize={20}
                            showRating
                            onFinishRating={(rating) => {
                                console.log(`Avaliação do livro ${item.title}: ${rating}`);
                            }}
                            style={styles.rating}
                        />
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum livro cadastrado.</Text>}
            />
        </View>
    );
};

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
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#6200ee',
    },
    statCard: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    statTitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    bookCard: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bookDetails: {
        fontSize: 14,
        color: '#666',
    },
    progressBar: {
        height: 10,
        backgroundColor: '#e0e0df',
        borderRadius: 5,
        marginVertical: 5,
    },
    progress: {
        height: '100%',
        backgroundColor: '#4caf50',
        borderRadius: 5,
    },
    progressText: {
        textAlign: 'right',
        fontSize: 12,
        color: '#666',
    },
    rating: {
        paddingVertical: 10,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 25,
        marginVertical: 5,
        position: 'absolute',
        right: 25
    },
});
