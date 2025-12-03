import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SettingsScreen() {
  const { userRole, isVerified, logout } = useAuth();
  
  const currentUserName = userRole === 'Worker' ? 'Bensoy Gon' : 'Walter Black';
  
  const THEME_COLOR = '#535CE8'; 

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, { color: THEME_COLOR }]}>Account Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Profile Information</Text>
        <Text style={styles.detailText}>Name: {currentUserName}</Text>
        <Text style={styles.detailText}>Role: {userRole}</Text>
        <Text style={styles.detailText}>Barangay: Agusan, Zone 1</Text>
        <Text style={styles.detailText}>Verification Status: {isVerified ? 'Verified ✅' : 'Pending ⏳'}</Text>
        <TouchableOpacity style={styles.buttonText} onPress={() => {}}>
            <Text style={[styles.link, { color: THEME_COLOR }]}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Security</Text>
        <TouchableOpacity style={styles.listItem}>
            <Ionicons name="lock-closed-outline" size={20} color={THEME_COLOR} />
            <Text style={styles.listItemText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
            <Ionicons name="key-outline" size={20} color={THEME_COLOR} />
            <Text style={styles.listItemText}>Two-Factor Authentication</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Support & Legal</Text>
        <TouchableOpacity style={styles.listItem}>
            <Ionicons name="help-circle-outline" size={20} color={THEME_COLOR} />
            <Text style={styles.listItemText}>Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
            <Ionicons name="document-text-outline" size={20} color={THEME_COLOR} />
            <Text style={styles.listItemText}>Terms of Service</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={logout} color="red" />
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7', padding: 15 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 }, 
  section: { backgroundColor: '#fff', borderRadius: 8, padding: 15, marginBottom: 15, elevation: 1 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 },
  detailText: { fontSize: 16, color: '#555', marginBottom: 5 },
  link: { fontWeight: '600', marginTop: 10 }, 
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  listItemText: { fontSize: 16, marginLeft: 10, color: '#333' },
  logoutButton: { marginTop: 20, marginBottom: 50 }
});