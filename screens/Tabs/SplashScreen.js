import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      
      <View style={styles.whiteCircle}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logoImage} 
          resizeMode="contain" 
        />
      </View>
      
      <Text style={styles.title}>QuicKita</Text>
      <Text style={styles.subtitle}>Hyper-local Job Marketplace</Text>

      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" /> 
        <Text style={styles.loadingText}>Loading neighborhood...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#535CE8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteCircle: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 50,
    fontStyle: 'italic',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 12,
  }
});