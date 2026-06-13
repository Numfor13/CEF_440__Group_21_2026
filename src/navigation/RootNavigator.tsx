import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { SplashScreen } from '../screens/auth/SplashScreen';
import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { AnalyticsScreen } from '../screens/instructor/AnalyticsScreen';
import { CreateCourseScreen } from '../screens/instructor/CreateCourseScreen';
import { UploadContentScreen } from '../screens/instructor/UploadContentScreen';
import { AssignmentsScreen } from '../screens/student/AssignmentsScreen';
import { CalendarScreen } from '../screens/student/CalendarScreen';
import { CourseDetailsScreen } from '../screens/student/CourseDetailsScreen';
import { LearningScreen } from '../screens/student/LearningScreen';
import { LiveClassesScreen } from '../screens/student/LiveClassesScreen';
import { MessagesScreen } from '../screens/student/MessagesScreen';
import { QoEMonitoringScreen } from '../screens/student/QoEMonitoringScreen';
import { SettingsScreen } from '../screens/student/SettingsScreen';
import { InstructorTabs } from './InstructorTabs';
import { StudentTabs } from './StudentTabs';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      {/* Auth */}
      <Stack.Screen name="Splash"   component={SplashScreen} />
      <Stack.Screen name="Welcome"  component={WelcomeScreen} />
      <Stack.Screen name="Login"    component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Tab shells */}
      <Stack.Screen name="StudentTabs"    component={StudentTabs} />
      <Stack.Screen name="InstructorTabs" component={InstructorTabs} />

      {/* Student stack screens */}
      <Stack.Screen name="CourseDetails"  component={CourseDetailsScreen} />
      <Stack.Screen name="Learning"       component={LearningScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="QoEMonitoring"  component={QoEMonitoringScreen} />
      <Stack.Screen name="Assignments"    component={AssignmentsScreen} />
      <Stack.Screen name="LiveClasses"    component={LiveClassesScreen} />
      <Stack.Screen name="Calendar"       component={CalendarScreen} />
      <Stack.Screen name="Messages"       component={MessagesScreen} />
      <Stack.Screen name="Settings"       component={SettingsScreen} />

      {/* Instructor stack screens */}
      <Stack.Screen name="CreateCourse"   component={CreateCourseScreen} />
      <Stack.Screen name="UploadContent"  component={UploadContentScreen} />
    </Stack.Navigator>
  );
}
