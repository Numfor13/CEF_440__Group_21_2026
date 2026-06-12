import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { AppButton, Card, Screen, StatTile } from '../../components';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/typography';
import { RootStackParamList, StudentTabParamList } from '../../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<StudentTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function ProfileScreen({ navigation }: Props) {
  const [dataSaver, setDataSaver] = React.useState(true);
  const [downloadWifi, setDownloadWifi] = React.useState(true);
  const [notifications, setNotifications] = React.useState(false);

  const logout = () => {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'Welcome' }] }),
    );
  };

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>PN</Text>
        </View>
        <Text style={styles.name}>Precious Numfor</Text>
        <Text style={styles.email}>numforprecious7@gmail.com</Text>
        <View style={styles.roleBadge}>
          <Ionicons name="book-outline" size={13} color={colors.navy} />
          <Text style={styles.roleText}>Student</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <StatTile icon="book-outline" value="3" label="Courses" />
        <View style={{ width: spacing.md }} />
        <StatTile icon="trophy-outline" value="12" label="Completed" tint={colors.good} tintSoft={colors.goodSoft} />
        <View style={{ width: spacing.md }} />
        <StatTile icon="time-outline" value="48h" label="Learning" tint={colors.moderate} tintSoft={colors.moderateSoft} />
      </View>

      <Text style={styles.sectionTitle}>Preferences</Text>
      <Card>
        <Preference
          icon="cellular-outline"
          title="Data saver"
          subtitle="Prefer audio/text on poor networks"
          value={dataSaver}
          onValueChange={setDataSaver}
        />
        <Preference
          icon="wifi-outline"
          title="Download on Wi-Fi only"
          subtitle="Avoid mobile data for downloads"
          value={downloadWifi}
          onValueChange={setDownloadWifi}
          border
        />
        <Preference
          icon="notifications-outline"
          title="Notifications"
          subtitle="Deadlines and new content"
          value={notifications}
          onValueChange={setNotifications}
          border
        />
      </Card>

      <Text style={styles.sectionTitle}>Account</Text>
      <Card>
        <Row icon="person-outline" label="Personal information" />
        <Row icon="language-outline" label="Language · English" border />
        <Row icon="help-circle-outline" label="Help & support" border />
      </Card>

      <AppButton label="Log out" icon="log-out-outline" variant="outline" onPress={logout} style={{ marginTop: spacing.xl }} />
    </Screen>
  );
}

function Preference({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
  border,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  border?: boolean;
}) {
  return (
    <View style={[styles.prefRow, border && styles.border]}>
      <View style={styles.prefIcon}>
        <Ionicons name={icon} size={18} color={colors.navy} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.prefTitle}>{title}</Text>
        <Text style={styles.prefSub}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ true: colors.navy, false: colors.border }}
        thumbColor={colors.white}
      />
    </View>
  );
}

function Row({ icon, label, border }: { icon: keyof typeof Ionicons.glyphMap; label: string; border?: boolean }) {
  return (
    <View style={[styles.prefRow, border && styles.border]}>
      <View style={styles.prefIcon}>
        <Ionicons name={icon} size={18} color={colors.navy} />
      </View>
      <Text style={styles.rowLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', marginTop: spacing.md },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontSize: 28, fontWeight: '800' },
  name: { fontSize: 20, fontWeight: '800', color: colors.text, marginTop: spacing.md },
  email: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  roleBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceAlt, paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: radius.pill, marginTop: spacing.md },
  roleText: { fontSize: 12, fontWeight: '700', color: colors.navy, marginLeft: 5 },
  stats: { flexDirection: 'row', marginTop: spacing.xl },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: spacing.xl, marginBottom: spacing.md },
  prefRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  border: { borderTopWidth: 1, borderTopColor: colors.border },
  prefIcon: { width: 38, height: 38, borderRadius: radius.md, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  prefTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  prefSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  rowLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.text },
});
