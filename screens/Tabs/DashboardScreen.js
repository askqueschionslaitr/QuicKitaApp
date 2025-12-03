import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DashboardScreen({ navigation }) {
  const { userRole, isVerified, jobs, applications } = useAuth();
  
  const currentUserName = userRole === 'Worker' ? 'Bensoy Gon' : 'Walter Black';

  const myPostedJobs = jobs.filter(job => job.postedBy === 'Me (Employer)' || job.postedBy === 'Walter Black');

  const myRecentApps = applications
    .filter(app => app.applicantName === 'Bensoy Gon')
    .map(app => {
      const jobDetails = jobs.find(j => j.id === app.jobId);
      return {
        ...app,
        jobTitle: jobDetails ? jobDetails.title : 'Job Unavailable',
        fullJobData: jobDetails
      };
    })
    .reverse(); 

  const THEME_COLOR = '#535CE8'; 

  return (
    <View style={styles.container}>
      
      {!isVerified && (
        <View style={styles.alertBanner}>
          <Ionicons name="warning-outline" size={20} color="#FF9500" />
          <Text style={styles.alertText}>Account not yet verified. Jobs may be limited.</Text>
        </View>
      )}

      <View style={styles.profileCard}>
        <Ionicons name="person-circle-outline" size={70} color={THEME_COLOR} />
        <Text style={styles.userName}>{currentUserName}</Text>
        <Text style={styles.userBarangay}>Barangay Agusan, Zone 1</Text>
        <View style={styles.roleBadge}>
          <Text style={[styles.roleText, {color: THEME_COLOR}]}>{userRole}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>
        {userRole === 'Employer' ? 'Your Posted Jobs' : 'Your Recent Applications'}
      </Text>

      <ScrollView style={styles.listContainer}>
        
        {userRole === 'Employer' ? (
          myPostedJobs.length > 0 ? (
            myPostedJobs.map((job) => (
              <TouchableOpacity 
                key={job.id} 
                style={styles.listItem}
                onPress={() => navigation.navigate('JobDetails', { job })}
              >
                <View style={styles.listIconBox}>
                   <Ionicons name="briefcase-outline" size={24} color={THEME_COLOR} />
                </View>
                <View style={styles.listContent}>
                  <Text style={styles.listTitle}>{job.title}</Text>
                  <Text style={styles.listSub}>{job.pay} • {job.category}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>You haven't posted any jobs yet.</Text>
          )
        ) : (
          myRecentApps.length > 0 ? (
            myRecentApps.map((app) => (
              <TouchableOpacity 
                key={app.id} 
                style={styles.listItem}
                onPress={() => {
                  if (app.fullJobData) {
                    navigation.navigate('JobDetails', { job: app.fullJobData });
                  }
                }}
              >
                 <View style={[
                   styles.listIconBox, 
                   { backgroundColor: app.status === 'Accepted' ? '#D1FAE5' : '#FFF4E5' }
                 ]}>
                     <Ionicons 
                       name={app.status === 'Accepted' ? "checkmark-circle" : "time-outline"} 
                       size={24} 
                       color={app.status === 'Accepted' ? "#059669" : "#FF9500"} 
                     />
                  </View>
                <View style={styles.listContent}>
                  <Text style={styles.listTitle}>{app.jobTitle}</Text>
                  <Text style={[
                    styles.listSub, 
                    { color: app.status === 'Accepted' ? '#059669' : '#FF9500', fontWeight: 'bold' }
                  ]}>
                    Status: {app.status}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>You haven't applied to any jobs yet.</Text>
          )
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  
  alertBanner: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBEA',
    padding: 15, marginBottom: 10,
  },
  alertText: { marginLeft: 10, color: '#FF9500', fontWeight: '600' },

  profileCard: {
    alignItems: 'center', backgroundColor: '#fff', padding: 25, margin: 15,
    borderRadius: 16, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5
  },
  userName: { fontSize: 22, fontWeight: 'bold', marginTop: 10, color: '#333' },
  userBarangay: { fontSize: 14, color: '#666', marginBottom: 10 },
  roleBadge: { backgroundColor: '#E0E7FF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  roleText: { fontSize: 14, fontWeight: 'bold' },

  sectionHeader: {
    fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 10, color: '#444'
  },
  listContainer: { flex: 1, paddingHorizontal: 15 },
  
  listItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    padding: 15, borderRadius: 12, marginBottom: 10, elevation: 1
  },
  listIconBox: {
    width: 45, height: 45, borderRadius: 10, 
    backgroundColor: '#E0E7FF',
    justifyContent: 'center', alignItems: 'center', marginRight: 15
  },
  listContent: { flex: 1 },
  listTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  listSub: { fontSize: 13, color: '#666', marginTop: 2 },
  
  emptyText: { textAlign: 'center', marginTop: 20, color: '#999', fontStyle: 'italic' }
});