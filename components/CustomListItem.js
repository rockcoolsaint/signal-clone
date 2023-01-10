import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from '@rneui/base'
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = await query(collection(db, "chats", id, "messages"), orderBy("timestamp", "asc"));
      const querySnapshot = await getDocs(q);
      setChatMessages(querySnapshot.docs.map(doc => doc.data()));
    };

    fetchData().catch(console.error);

    return fetchData;
  }, [])

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: chatMessages?.[0]?.photoUrL || "https://i.pravatar.cc/1000"
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})