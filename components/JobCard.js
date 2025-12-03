import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function JobCard({ job, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <View style={styles.payBadge}>
          <Text style={styles.payText}>{job.pay}</Text>
        </View>
      </View>
      <Text style={styles.category}>{job.category}</Text>
      <View style={styles.footer}>
        <Ionicons name="location-outline" size={14} color="#666" />
        <Text style={styles.location}>Barangay Agusan</Text>
        <Text style={styles.timeElapsed}> • 5 mins ago</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#535CE8', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  payBadge: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
  },
  payText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  category: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  timeElapsed: {
    fontSize: 12,
    color: '#666',
  },
});