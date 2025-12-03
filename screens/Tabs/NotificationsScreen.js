import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';

export default function NotificationsScreen() {
  const { notifications, userRole } = useAuth();
  const THEME_COLOR = '#535CE8'; 

  const myNotifications = notifications.filter(n => 
    n.targetRole === userRole || n.targetRole === 'Both'
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="notifications" size={40} color={THEME_COLOR} />
        <Text style={styles.title}>Your Notification Inbox</Text>
      </View>

      <ScrollView style={styles.listContainer}>
        {myNotifications.length > 0 ? (
          myNotifications.map((notif) => (
            <View key={notif.id} style={styles.card}>
              <View style={styles.iconBox}>
                <Ionicons name="mail-unread-outline" size={24} color={THEME_COLOR} />
              </View>
              <View style={styles.content}>
                <Text style={styles.cardTitle}>{notif.title}</Text>
                <Text style={styles.cardMessage}>{notif.message}</Text>
                <Text style={styles.time}>{notif.time}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No new notifications.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  header: { alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#333' },
  listContainer: { padding: 15 },
  card: {
    flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5
  },
  iconBox: { marginRight: 15, justifyContent: 'center' },
  content: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 2 },
  cardMessage: { fontSize: 14, color: '#666', lineHeight: 20 },
  time: { fontSize: 12, color: '#999', marginTop: 5, textAlign: 'right' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});