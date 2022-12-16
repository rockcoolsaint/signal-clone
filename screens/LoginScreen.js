import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Input } from '@rneui/base'

const LoginScreen = () => {
  return (
    <View>
      <StatusBar style='light'/>
      <Image
        source={{
          uri:"https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png",
        }}
        style={{ width: 200, height:200 }}
      />
      <View style={styles.inputContainer}>
        <Input placeholder='Email' autoFocus type="email" />
        <Input placeholder='Password' secureTextEntry type="password" />
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})