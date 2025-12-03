import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import JobCard from '../../components/JobCard'; 
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FindJobsScreen() {
  const { jobs } = useAuth(); // Get dynamic jobs from Context
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ LOGIC: Filter jobs based on search query
  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.category.toLowerCase().includes(query)
    );
  });

  const handlePressJob = (job) => {
    navigation.navigate('JobDetails', { job });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by keywords or category..."
          value={searchQuery}
          onChangeText={setSearchQuery} // ✅ Real-time filtering
        />
      </View>

      <Text style={styles.feedHeader}>
        Available Gigs ({filteredJobs.length})
      </Text>

      {/* Job Feed */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onPress={() => handlePressJob(job)} 
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No jobs found matching "{searchQuery}"</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  feedHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: '#333'
  },
  scrollContent: { padding: 10 },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontStyle: 'italic'
  }
});