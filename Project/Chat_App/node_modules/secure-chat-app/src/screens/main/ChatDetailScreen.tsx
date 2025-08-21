import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ChatStackParamList } from '../../navigation/MainNavigator';

type ChatDetailScreenRouteProp = RouteProp<ChatStackParamList, 'ChatDetail'>;

interface Props {
  route: ChatDetailScreenRouteProp;
}

const ChatDetailScreen: React.FC<Props> = ({ route }) => {
  const { contactId, contactName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with {contactName}</Text>
      <Text style={styles.placeholder}>No messages yet</Text>
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
    fontSize: 18,
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

export default ChatDetailScreen;
