import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ChatsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <Text style={styles.placeholder}>No conversations yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ChatsScreen;
