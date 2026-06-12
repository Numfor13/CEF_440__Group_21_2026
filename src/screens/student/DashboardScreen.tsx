import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, CourseCard, NetworkStatusBanner, Screen, SectionHeader } from '../../components';
import { useQoE } from '../../context/QoEContext';
import { courses } from '../../data/mock';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/typography';
import { RootStackParamList, StudentTabParamList } from '../../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<StudentTabParamList, 'Dashboard'>,
  NativeStackScreenProps<RootStackParamList>
>;

const quickActions = [
  { icon: 'play-circle-outline', label: 'Continue', tint: colors.navy },
  { icon: 'cloud-download-outline', label: 'Downloads', tint: colors.accent },
  { icon: 'pulse-outline', label: 'QoE', tint: colors.good },
  { icon: 'person-outline', label: 'Profile', tint: colors.moderate },
] as const;

export function DashboardScreen({ navigation }: Props) {
  const { metrics } = useQoE();
  const continueCourse = courses[0];

  const onQuickAction = (label: string) => {
    if (label === 'Continue') navigation.navigate('Learning', { courseId: continueCourse.id });
    else if (label === 'Downloads') navigation.navigate('Downloads');
    else if (label === 'QoE') navigation.navigate('QoEMonitoring');
    else navigation.navigate('Profile');
  };

  return (
    <Screen>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>Precious 👋</Text>
        </View>
        <Pressable style={styles.avatar} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.avatarText}>PN</Text>
        </Pressable>
      </View>

      <View style={styles.bannerWrap}>
        <NetworkStatusBanner metrics={metrics} />
      </View>

      <View style={styles.actionsRow}>
        {quickActions.map((a) => (
          <Pressable key={a.label} style={styles.action} onPress={() => onQuickAction(a.label)}>
            <View style={[styles.actionIcon, { backgroundColor: colors.surfaceAlt }]}>
              <Ionicons name={a.icon} size={22} color={a.tint} />
            </View>
            <Text style={styles.actionLabel}>{a.label}</Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Continue learning" actionLabel="All courses" onAction={() => navigation.navigate('Courses')} />
      <Card onPress={() => navigation.navigate('Learning', { courseId: continueCourse.id })} style={styles.continueCard}>
        <View style={styles.continueRow}>
          <View style={[styles.continueThumb, { backgroundColor: continueCourse.color }]}>
            <Ionicons name="play" size={24} color={colors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.continueTitle} numberOfLines={2}>{continueCourse.title}</Text>
            <Text style={styles.continueMeta}>Module 1 · Lesson 3 · {Math.round(continueCourse.progress * 100)}% complete</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </View>
      </Card>

      <SectionHeader title="My courses" actionLabel="See all" onAction={() => navigation.navigate('Courses')} />
      {courses.slice(0, 2).map((c) => (
        <CourseCard key={c.id} course={c} onPress={() => navigation.navigate('CourseDetails', { courseId: c.id })} />
      ))}

      <SectionHeader title="Recent activity" />
      <Card>
        {[
          { icon: 'checkmark-done-outline', text: 'Completed "Setting up your environment"', time: '2h ago' },
          { icon: 'cloud-download-outline', text: 'Downloaded Networks slides (PDF)', time: 'Yesterday' },
          { icon: 'trophy-outline', text: 'Scored 80% on Mobile Dev Quiz 1', time: '2 days ago' },
        ].map((item, i, arr) => (
          <View key={item.text} style={[styles.activityRow, i < arr.length - 1 && styles.activityBorder]}>
            <View style={styles.activityIcon}>
              <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={16} color={colors.navy} />
            </View>
            <Text style={styles.activityText} numberOfLines={1}>{item.text}</Text>
            <Text style={styles.activityTime}>{item.time}</Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  greeting: { fontSize: 14, color: colors.textMuted },
  name: { fontSize: 24, fontWeight: '800', color: colors.text, marginTop: 2 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontWeight: '800', fontSize: 15 },
  bannerWrap: { marginTop: spacing.lg },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.lg },
  action: { alignItems: 'center', flex: 1 },
  actionIcon: { width: 54, height: 54, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontSize: 12, color: colors.text, marginTop: 6, fontWeight: '600' },
  continueCard: {},
  continueRow: { flexDirection: 'row', alignItems: 'center' },
  continueThumb: { width: 52, height: 52, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  continueTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  continueMeta: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
  activityRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  activityBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  activityIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  activityText: { flex: 1, fontSize: 13, color: colors.text },
  activityTime: { fontSize: 11, color: colors.textMuted, marginLeft: spacing.sm },
});
