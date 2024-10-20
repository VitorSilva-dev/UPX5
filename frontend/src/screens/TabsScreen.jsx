import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


import StatisticsScreen from './StatisticsScreen';
import BooksScreen from './BooksScreen';

const Tab = createBottomTabNavigator();

export default function TabsScreen() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Estatísticas" component={StatisticsScreen} options={{
                tabBarLabel: 'Estatísticas',
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="home-analytics" color="#6200ee" size={24} />
                ),
            }} />
            <Tab.Screen name="Livros" component={BooksScreen} options={{
                tabBarLabel: 'Livros',
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="bookshelf" color="#6200ee" size={24} />
                ),
            }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#6200ee',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
    },
});
