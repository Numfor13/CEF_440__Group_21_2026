import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { radius } from '../theme/typography';

interface LogoProps {
  size?: number;
  background?: string;
  iconColor?: string;
}

export function Logo({ size = 72, background = colors.navy, iconColor = colors.white }: LogoProps) {
  return (
    <View
      style={[
        styles.logo,
        { width: size, height: size, borderRadius: size * 0.28, backgroundColor: background },
      ]}
    >
      <Ionicons name="school" size={size * 0.5} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
  },
});
