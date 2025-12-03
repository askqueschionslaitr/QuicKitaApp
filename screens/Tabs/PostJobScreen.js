import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Modal, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Picker } from '@react-native-picker/picker'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PostJobScreen({ navigation }) {
  const { userRole, addJob } = useAuth(); 
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Household Chores');
  const [pay, setPay] = useState('');
  const [payMethod, setPayMethod] = useState('Cash');
  const [modalVisible, setModalVisible] = useState(false);

  const THEME_COLOR = '#535CE8';

  // Guard Clause
  if (userRole !== 'Employer') {
    return (
      <View style={styles.deniedContainer}>
        <Ionicons name="lock-closed-outline" size={60} color="#FF3B30" />
        <Text style={styles.deniedTitle}>Access Restricted</Text>
        <Text style={styles.deniedText}>Only Employers can post new gigs.</Text>
      </View>
    );
  }

  const handlePost = () => {
    // 1. Validation
    if (!title || !pay) {
      alert('Please fill in the Job Title and Pay Amount.');
      return;
    }

    // 2. Create the Job Object
    const newJob = {
      id: Date.now().toString(),
      title: title,
      category: category,
      pay: isNaN(pay) ? pay : `₱${pay}`, 
      postedBy: 'Me (Employer)',
      location: 'Brgy Agusan (Verified)',
      time: 'Just Now'
    };

    // 3. Update State
    addJob(newJob);

    // 4. Show Custom Center Popup
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTitle('');
    setPay('');
    navigation.navigate('Home');
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Post a New Gig</Text>
        <Text style={styles.headerSubtitle}>Fill in the details to find a worker.</Text>

        {/* JOB TITLE INPUT */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Job Title</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="briefcase-outline" size={20} color="#666" style={styles.icon} />
            <TextInput 
              style={styles.input} 
              value={title} 
              onChangeText={setTitle} 
              placeholder="e.g. Fix Leaky Faucet"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* CATEGORY PICKER */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker 
              selectedValue={category} 
              onValueChange={setCategory}
              style={styles.picker}
            >
              {['Household Chores', 'Tutoring', 'Errands', 'Carpentry', 'Plumbing', 'Electrical', 'Gardening'].map(cat => (
                <Picker.Item label={cat} value={cat} key={cat} style={styles.pickerItem} />
              ))}
            </Picker>
          </View>
        </View>
        
        {/* PAY AMOUNT INPUT */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pay Amount (₱)</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="cash-outline" size={20} color="#666" style={styles.icon} />
            <TextInput 
              style={styles.input} 
              value={pay} 
              onChangeText={setPay} 
              keyboardType="numeric"
              placeholder="e.g. 500" 
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* PAYMENT METHOD PICKER */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.pickerContainer}>
            <Picker 
              selectedValue={payMethod} 
              onValueChange={setPayMethod}
              style={styles.picker}
            >
              <Picker.Item label="Cash" value="Cash" style={styles.pickerItem} />
              <Picker.Item label="GCash" value="GCash" style={styles.pickerItem} />
              <Picker.Item label="Maya" value="Maya" style={styles.pickerItem} />
            </Picker>
          </View>
        </View>

        {/* POST BUTTON */}
        <TouchableOpacity 
          style={[styles.postButton, { backgroundColor: THEME_COLOR }]} 
          onPress={handlePost}
        >
          <Text style={styles.postButtonText}>Publish Gig</Text>
        </TouchableOpacity>
        
        <View style={{height: 50}} />
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
            <Text style={styles.modalText}>Your gig has been posted successfully.</Text>
            
            <TouchableOpacity 
              style={[styles.modalButton, { backgroundColor: THEME_COLOR }]} 
              onPress={handleCloseModal}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 25, backgroundColor: '#fff' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  headerSubtitle: { fontSize: 16, color: '#666', marginBottom: 30 },

  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8, marginLeft: 5 },
  
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F9F9',
    borderRadius: 12, paddingHorizontal: 15, borderWidth: 1, borderColor: '#EEE',
    height: 50,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: '100%', fontSize: 16, color: '#333' },

  pickerContainer: {
    backgroundColor: '#F9F9F9', borderRadius: 12, borderWidth: 1, borderColor: '#EEE',
    overflow: 'hidden', height: 50, justifyContent: 'center'
  },
  picker: {
    width: '100%', height: '100%', color: '#333', backgroundColor: 'transparent'
  },
  pickerItem: { fontSize: 14 },

  postButton: {
    borderRadius: 12, paddingVertical: 18,
    alignItems: 'center', marginTop: 10, shadowColor: '#000', 
    shadowOpacity: 0.2, shadowRadius: 5, elevation: 5
  },
  postButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  deniedContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  deniedTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginTop: 20 },
  deniedText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 10 },

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