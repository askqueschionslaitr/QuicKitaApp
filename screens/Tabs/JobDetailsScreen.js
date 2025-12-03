import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert, TouchableOpacity, Modal } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function JobDetailsScreen({ route, navigation }) {
  const { job } = route.params;
  const { userRole, applyToJob, acceptApplicant, applications } = useAuth(); 
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const insets = useSafeAreaInsets();
  const THEME_COLOR = '#535CE8'; 

  const myApplication = applications.find(app => app.jobId === job.id && app.applicantName === 'Bensoy Gon');
  const hasApplied = !!myApplication;

  const jobApplicants = applications.filter(app => app.jobId === job.id);


  const handleApply = () => {
    if (userRole === 'Employer') {
      Alert.alert('Role Conflict', 'Employers cannot apply to jobs!');
      return;
    }
    applyToJob(job.id, job.title); 
    setModalMessage(`You applied for "${job.title}". The employer will be notified.`);
    setModalVisible(true);
  };

  const handleAccept = (appId) => {
    acceptApplicant(appId, job.title); 
    setModalMessage(`You have hired the applicant! They will be notified.`);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}> 
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: THEME_COLOR }]}>{job.title}</Text>
        
        <View style={styles.badgeRow}>
          <Text style={[styles.categoryBadge, { backgroundColor: THEME_COLOR }]}>{job.category}</Text>
          <Text style={styles.payBadge}>{job.pay}</Text>
        </View>

        {/* --- JOB INFO SECTIONS --- */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Details</Text>
          <Text style={styles.detailText}>
            <Ionicons name="location-outline" size={16} /> Location: {job.location}
          </Text>
          <Text style={styles.detailText}>
            <Ionicons name="time-outline" size={16} /> Posted: {job.time}
          </Text>
          <Text style={styles.detailText}>
            <Ionicons name="cash-outline" size={16} /> Status: {job.status}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Description</Text>
          <Text style={styles.description}>
            We need a reliable local to fix a persistent issue with {job.category}. Must bring own basic tools. Estimated 1-2 hours of work. Immediate payment upon satisfactory completion.
          </Text>
        </View>

        {/* --- EMPLOYER VIEW: APPLICANTS LIST --- */}
        {userRole === 'Employer' && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Applicants ({jobApplicants.length})</Text>
            {jobApplicants.length === 0 ? (
              <Text style={{color: '#999', fontStyle: 'italic'}}>No applicants yet.</Text>
            ) : (
              jobApplicants.map((app) => (
                <View key={app.id} style={styles.applicantCard}>
                  <View>
                    <Text style={styles.applicantName}>{app.applicantName}</Text>
                    <Text style={[styles.appStatus, {color: app.status === 'Accepted' ? 'green' : 'orange'}]}>
                      Status: {app.status}
                    </Text>
                  </View>
                  {/* Only show Accept button if pending */}
                  {app.status === 'Pending' && (
                    <TouchableOpacity 
                      style={[styles.acceptBtn, {backgroundColor: THEME_COLOR}]}
                      onPress={() => handleAccept(app.id)}
                    >
                      <Text style={{color: 'white', fontWeight: 'bold'}}>Accept</Text>
                    </TouchableOpacity>
                  )}
                  {app.status === 'Accepted' && (
                    <Ionicons name="checkmark-circle" size={24} color="green" />
                  )}
                </View>
              ))
            )}
          </View>
        )}
        
        {/* --- WORKER VIEW: EMPLOYER INFO --- */}
        {userRole === 'Worker' && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Employer Info</Text>
            <Text style={styles.employerInfo}>Posted by: {job.postedBy} (Verified)</Text>
            <Text style={styles.employerInfo}>Rating: ⭐️⭐️⭐️⭐️ (4.0)</Text>
          </View>
        )}

      </ScrollView>

      {/* --- WORKER VIEW: APPLY BUTTON FOOTER --- */}
      {userRole === 'Worker' && (
        <View style={styles.footer}>
          {hasApplied ? (
            <Button 
              title={myApplication.status === 'Accepted' ? "You are Hired! 🎉" : "Application Sent (Pending)"} 
              disabled 
              color={myApplication.status === 'Accepted' ? "#28A745" : "gray"} 
            />
          ) : (
            <Button title="Apply Now" onPress={handleApply} color={THEME_COLOR} />
          )}
        </View>
      )}

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
            <Text style={styles.modalText}>{modalMessage}</Text>
            
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
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  scrollContent: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  badgeRow: { flexDirection: 'row', marginBottom: 20 },
  categoryBadge: {
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    fontWeight: 'bold',
  },
  payBadge: {
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    fontWeight: 'bold',
  },
  section: { marginBottom: 20 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5, marginBottom: 10 },
  detailText: { fontSize: 16, marginBottom: 5 },
  description: { fontSize: 16, lineHeight: 24 },
  employerInfo: { fontSize: 14, color: '#666', marginTop: 5 },
  
  // Applicant Card Styles
  applicantCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 10, 
    elevation: 1 
  },
  applicantName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  appStatus: { fontSize: 12, marginTop: 4 },
  acceptBtn: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },

  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },

  // Modal Styles
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