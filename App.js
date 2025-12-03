import React from "react";
import { View, Text } from "react-native"; 
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// Auth Screens
import LoginScreen from "./screens/Auth/LoginScreen";
import SignupScreen from "./screens/Auth/SignupScreen";

// Tab Screens
import DashboardScreen from "./screens/Tabs/DashboardScreen";
import FindJobsScreen from "./screens/Tabs/FindJobsScreen";
import PostJobScreen from "./screens/Tabs/PostJobScreen";
import NotificationsScreen from "./screens/Tabs/NotificationsScreen"; 
import SettingsScreen from "./screens/Tabs/SettingsScreen";
import JobDetailsScreen from "./screens/Tabs/JobDetailsScreen";

// Splash Screen
import SplashScreen from "./screens/Tabs/SplashScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Navigator
function TabNavigator() {
  const { userRole } = useAuth();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Find Gigs') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Post Gig') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#535CE8',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      
      <Tab.Screen name="Home" component={DashboardScreen} />
      
      {/* Find Gigs that's only available for Workers */}
      {userRole === 'Worker' && (
        <Tab.Screen name="Find Gigs" component={FindJobsScreen} />
      )}
      
      {/* Post Gig that's only available for Employers */}
      {userRole === 'Employer' && (
        <Tab.Screen name="Post Gig" component={PostJobScreen} />
      )}
      
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Main Stack Navigator (Handles Nested Screens)
function AppStack() {
  return (
    <Stack.Navigator>
      {/* Tabs Screen */}
      <Stack.Screen 
        name="HomeTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      {/* Stacked Screens (Details, Settings, etc.) */}
      <Stack.Screen 
        name="JobDetails" 
        component={JobDetailsScreen} 
        options={{ title: 'Gig Details' }}
      />
    </Stack.Navigator>
  );
}

// Guarded Route Logic
function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuth(); 

  // If loading, show Splash. If not, check Login status.
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {/* Ternary Operator creates the Guarded Route */}
      {isLoggedIn ? (
        // Renders the main app content if logged in
        <AppStack />
      ) : (
        // Renders the Authentication Stack if NOT logged in
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Create Account' }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

// App Entry Point with Context Provider ---
export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}