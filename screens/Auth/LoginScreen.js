import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginScreen() {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [isWorker, setIsWorker] = useState(true);

  // ✅ EXACT LOGO COLORS
  const PURPLE = '#535CE8';
  const GOLD = '#F2C94C';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* BRANDING SECTION */}
        <View style={styles.header}>
          
          {/* ✅ CHANGED: Now using the actual Image File */}
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />

          {/* Text Logo */}
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={[styles.appName, { color: PURPLE }]}>Quic</Text>
            <Text style={[styles.appName, { color: GOLD }]}>Kita</Text>
          </View>
          <Text style={styles.tagline}>Your Neighborhood Marketplace</Text>
        </View>

        {/* ROLE TOGGLE */}
        <Text style={styles.label}>I am logging in as a:</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleBtn, isWorker && styles.toggleBtnActive]} 
            onPress={() => setIsWorker(true)}
          >
            <Text style={[styles.toggleText, isWorker && { color: PURPLE, fontWeight: 'bold' }]}>Worker</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.toggleBtn, !isWorker && styles.toggleBtnActive]} 
            onPress={() => setIsWorker(false)}
          >
            <Text style={[styles.toggleText, !isWorker && { color: PURPLE, fontWeight: 'bold' }]}>Employer</Text>
          </TouchableOpacity>
        </View>

        {/* INPUTS */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            placeholder="Email Address" 
            placeholderTextColor="#999"
            defaultValue="juan@example.com" 
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            placeholderTextColor="#999" 
            secureTextEntry
            defaultValue="password123"
          />
        </View>

        {/* MAIN ACTION BUTTON */}
        <TouchableOpacity 
          style={[styles.loginBtn, { backgroundColor: PURPLE, shadowColor: PURPLE }]} 
          onPress={() => login(isWorker ? 'Worker' : 'Employer')}
        >
          <Text style={styles.loginBtnText}>Log In</Text>
        </TouchableOpacity>

        {/* SECONDARY ACTION */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>New to QuicKita?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={[styles.linkText, { color: PURPLE }]}> Create an Account</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 30 },
  
  header: { alignItems: 'center', marginBottom: 40 },
  
  // ✅ NEW STYLE FOR IMAGE LOGO
  logoImage: {
    width: 100, // Adjust size as needed
    height: 100,
    marginBottom: 5
  },

  appName: { 
    fontSize: 32, 
    fontWeight: '900', 
    letterSpacing: 0.5 
  },
  tagline: { fontSize: 14, color: '#888', marginTop: 5 },

  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 10, marginLeft: 5 },
  
  toggleContainer: {
    flexDirection: 'row', backgroundColor: '#F0F0F0', borderRadius: 12, padding: 4, marginBottom: 25
  },
  toggleBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  toggleBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  toggleText: { fontWeight: '600', color: '#888' },

  inputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F9F9',
    borderRadius: 12, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#EEE'
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16, color: '#333' },

  loginBtn: {
    borderRadius: 12, paddingVertical: 16,
    alignItems: 'center', marginTop: 10, 
    shadowOpacity: 0.3, shadowRadius: 5, elevation: 5
  },
  loginBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { color: '#666' },
  linkText: { fontWeight: 'bold' }
});