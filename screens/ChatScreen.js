import { Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/base'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../firebase';
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
        >
          <Avatar rounded
            source={{
              uri: messages[0]?.data.photoURL || "https://i.pravatar.cc/1000"
            }}
          />
          <Text
            style={{color: "white", marginLeft: 10, fontWeight: "700"}}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name='video-camera' size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='call' size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
      // headerLeft: () => (
      //   <TouchableOpacity
      //     style={{ marginLeft: 10 }}
      //     onPress={navigation.goBack}
      //   >
      //     <AntDesign name="arrowleft" size={24} color="white" />
      //   </TouchableOpacity>
      // )
    })
  }, [navigation, messages])

  const sendMessage = async () => {
    Keyboard.dismiss();

    try {
      await addDoc(collection(db, "chats", route.params.id, 'messages'), {
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL
      });
    } catch(error) {
      alert(error);
    };

    setInput('');
  };

  useLayoutEffect(() => {
    const fetchData = async () => {
      const q = await query(collection(db, "chats", route.params.id, "messages"), orderBy("timestamp", "asc"));
      const querySnapshot = await getDocs(q);
      setMessages(querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    };

    fetchData().catch(console.error);

    return fetchData;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
        enabled
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{paddingTop: 15}}>
              {messages.map(({id, data}) => 
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver}>
                    <Avatar
                      position="absolute"
                      rounded
                      // WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position="absolute"
                      rounded
                      // WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                placeholder='Signal Message'
                style={styles.textInput}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name='send' size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  }
})