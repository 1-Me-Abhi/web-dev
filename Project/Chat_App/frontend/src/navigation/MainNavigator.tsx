import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ChatsScreen from '../screens/main/ChatsScreen';
import ContactsScreen from '../screens/main/ContactsScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import ChatDetailScreen from '../screens/main/ChatDetailScreen';

export type MainTabParamList = {
  Chats: undefined;
  Contacts: undefined;
  Settings: undefined;
};

export type ChatStackParamList = {
  ChatsList: undefined;
  ChatDetail: { contactId: string; contactName: string };
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const ChatStack = createStackNavigator<ChatStackParamList>();

const ChatsNavigator: React.FC = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen 
        name="ChatsList" 
        component={ChatsScreen}
        options={{ title: 'Chats' }}
      />
      <ChatStack.Screen 
        name="ChatDetail" 
        component={ChatDetailScreen}
        options={({ route }) => ({ 
          title: route.params.contactName 
        })}
      />
    </ChatStack.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen 
        name="Chats" 
        component={ChatsNavigator}
        options={{
          tabBarLabel: 'Chats',
          // tabBarIcon: ({ color, size }) => (
          //   <Icon name="message" size={size} color={color} />
          // ),
        }}
      />
      <Tab.Screen 
        name="Contacts" 
        component={ContactsScreen}
        options={{
          tabBarLabel: 'Contacts',
          // tabBarIcon: ({ color, size }) => (
          //   <Icon name="contacts" size={size} color={color} />
          // ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          // tabBarIcon: ({ color, size }) => (
          //   <Icon name="settings" size={size} color={color} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
