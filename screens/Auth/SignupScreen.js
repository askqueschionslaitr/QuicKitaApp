import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignupScreen() {
  const [role, setRole] = useState(null); 
  const [proofUri, setProofUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const THEME_COLOR = '#535CE8';

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Need access to gallery to upload Proof of Residence.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [4, 3], quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProofUri(result.assets[0].uri);
    }
  };

  const handleSignup = () => {
    if (!role || !proofUri) {
      alert('Please select a role and upload Proof of Residence.');
      return;
    }
    // Show Success Modal instead of Alert
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  // Helper Component for Role Selection
  const RoleCard = ({ title, icon, value }) => (
    <TouchableOpacity 
      style={[
        styles.roleCard, 
        role === value && { borderColor: THEME_COLOR, backgroundColor: '#E0E7FF' }
      ]}
      onPress={() => setRole(value)}
    >
      <Ionicons 
        name={icon} 
        size={30} 
        color={role === value ? THEME_COLOR : '#999'}
      />
      <Text 
        style={[
          styles.roleText, 
          role === value && { color: THEME_COLOR, fontWeight: 'bold' }
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Create Account</Text>
        <Text style={styles.headerSubtitle}>Join your neighborhood community.</Text>
        
        {/* 1. SELECT ROLE */}
        <Text style={styles.sectionTitle}>1. Choose your primary role</Text>
        <View style={styles.roleContainer}>
          <RoleCard title="Worker" icon="hammer-outline" value="Worker" />
          <RoleCard title="Employer" icon="briefcase-outline" value="Employer" />
        </View>

        {/* 2. VERIFICATION */}
        <Text style={styles.sectionTitle}>2. Verify Residence (Barangay)</Text>
        <Text style={styles.helperText}>Upload a clear photo of your Valid ID or Barangay Clearance.</Text>
        
        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
          {proofUri ? (
            <Image source={{ uri: proofUri }} style={styles.uploadedImage} />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={40} color={THEME_COLOR} />
              <Text style={[styles.uploadText, { color: THEME_COLOR }]}>Tap to Upload ID</Text>
            </>
          )}
        </TouchableOpacity>

        {/* 3. SUBMIT */}
        <TouchableOpacity 
          style={[
            styles.submitBtn, 
            { backgroundColor: (!role || !proofUri) ? '#B0C4DE' : THEME_COLOR }
          ]} 
          onPress={handleSignup}
          disabled={!role || !proofUri}
        >
          <Text style={styles.submitBtnText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{alignSelf: 'center', marginTop: 20}}>
          <Text style={{color: '#666'}}>Already have an account? <Text style={{color: THEME_COLOR, fontWeight: 'bold'}}>Log In</Text></Text>
        </TouchableOpacity>

      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={60} color={THEME_COLOR} />
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalText}>Account successfully created. Please Log In to continue.</Text>
            
            <TouchableOpacity 
              style={[styles.modalButton, { backgroundColor: THEME_COLOR }]} 
              onPress={handleCloseModal}
            >
              <Text style={styles.modalButtonText}>Go to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 25, backgroundColor: '#fff', paddingBottom: 50 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  headerSubtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 15, marginTop: 10 },
  helperText: { fontSize: 14, color: '#666', marginBottom: 10 },

  roleContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  roleCard: {
    width: '48%', backgroundColor: '#F9F9F9', padding: 20, borderRadius: 12,
    alignItems: 'center', borderWidth: 2, borderColor: 'transparent'
  },
  roleText: { marginTop: 10, fontWeight: '600', color: '#666' },

  uploadBox: {
    height: 180, borderStyle: 'dashed', borderWidth: 2, borderColor: '#CCC',
    borderRadius: 12, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#FAFAFA', marginBottom: 30
  },
  uploadText: { marginTop: 10, fontWeight: '600' },
  uploadedImage: { width: '100%', height: '100%', borderRadius: 10 },

  submitBtn: {
    padding: 18, borderRadius: 12, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, elevation: 4
  },
  submitBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});