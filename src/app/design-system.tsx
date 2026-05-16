/**
 * Design System Reference Screen
 *
 * Visual reference for all Lingua design tokens.
 * Remove or gate behind __DEV__ before production.
 */

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DesignSystemScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 32 }}>
        {/* ── Header ── */}
        <View>
          <Text className="text-h1 font-poppins-bold text-text-primary">
            🦊 Lingua DS
          </Text>
          <Text className="text-body-md text-text-secondary mt-1">
            Design System Reference
          </Text>
        </View>

        {/* ── Colors ── */}
        <Section title="Primary Colors">
          <ColorRow label="lingua-purple" hex="#6C4EF5" bg="bg-lingua-purple" />
          <ColorRow
            label="lingua-deep-purple"
            hex="#5B3BF6"
            bg="bg-lingua-deep-purple"
          />
          <ColorRow label="lingua-blue" hex="#4D8BFF" bg="bg-lingua-blue" />
          <ColorRow label="lingua-green" hex="#21C16B" bg="bg-lingua-green" />
        </Section>

        <Section title="Semantic Colors">
          <ColorRow label="success" hex="#21C16B" bg="bg-success" />
          <ColorRow label="warning" hex="#FFC800" bg="bg-warning" />
          <ColorRow label="streak" hex="#FF8A00" bg="bg-streak" />
          <ColorRow label="error" hex="#FF4D4F" bg="bg-error" />
          <ColorRow label="info" hex="#4D8BFF" bg="bg-info" />
        </Section>

        <Section title="Neutrals">
          <ColorRow label="text-primary" hex="#0D132B" bg="bg-text-primary" />
          <ColorRow
            label="text-secondary"
            hex="#6B7280"
            bg="bg-text-secondary"
          />
          <ColorRow label="border" hex="#E5E7EB" bg="bg-border" outlined />
          <ColorRow label="surface" hex="#F6F7FB" bg="bg-surface" outlined />
          <ColorRow
            label="background"
            hex="#FFFFFF"
            bg="bg-background"
            outlined
          />
        </Section>

        {/* ── Typography ── */}
        <Section title="Typography">
          <Text className="text-h1 font-poppins-bold text-text-primary">
            H1 — Screen Title
          </Text>
          <Text className="text-h2 font-poppins-semibold text-text-primary mt-2">
            H2 — Section Title
          </Text>
          <Text className="text-h3 font-poppins-semibold text-text-primary mt-2">
            H3 — Card Title
          </Text>
          <Text className="text-h4 font-poppins-medium text-text-primary mt-2">
            H4 — Subheading
          </Text>
          <Text className="text-body-lg text-text-primary mt-2">
            Body Large — Important content
          </Text>
          <Text className="text-body-md text-text-primary mt-2">
            Body Medium — Body text
          </Text>
          <Text className="text-body-sm text-text-secondary mt-2">
            Body Small — Supporting text
          </Text>
          <Text className="text-caption text-text-secondary mt-2">
            Caption — Labels, meta text
          </Text>
        </Section>

        {/* ── Buttons ── */}
        <Section title="Buttons">
          <View className="btn--primary mb-3">
            <Text className="btn--primary__label">Primary Button</Text>
          </View>
          <View className="btn--secondary mb-3">
            <Text className="btn--secondary__label">Secondary Button</Text>
          </View>
          <View className="btn--danger mb-3">
            <Text className="btn--danger__label">Danger Button</Text>
          </View>
          <View className="btn--ghost">
            <Text className="btn--ghost__label">Ghost Button</Text>
          </View>
        </Section>

        {/* ── Cards ── */}
        <Section title="Cards">
          <View className="card mb-3">
            <Text className="text--h4">Default Card</Text>
            <Text className="text--body-medium mt-1">
              Shadow elevated card on white
            </Text>
          </View>
          <View className="card--surface mb-3">
            <Text className="text--h4">Surface Card</Text>
            <Text className="text--body-medium mt-1">
              Card on #F6F7FB background
            </Text>
          </View>
          <View className="card--bordered">
            <Text className="text--h4">Bordered Card</Text>
            <Text className="text--body-medium mt-1">
              Border with no shadow
            </Text>
          </View>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badges">
          <View className="flex-row flex-wrap gap-2">
            <View className="badge--primary">
              <Text className="badge--primary__label">Primary</Text>
            </View>
            <View className="badge--success">
              <Text className="badge--success__label">Success</Text>
            </View>
            <View className="badge--streak">
              <Text className="badge--streak__label">Streak</Text>
            </View>
            <View className="badge--error">
              <Text className="badge--error__label">Error</Text>
            </View>
          </View>
        </Section>

        {/* ── Progress ── */}
        <Section title="Progress Bar">
          <View className="progress-bar mb-3">
            <View className="progress-bar__fill w-[65%]" />
          </View>
          <View className="progress-bar mb-3">
            <View className="progress-bar__fill--success w-[45%]" />
          </View>
          <View className="progress-bar">
            <View className="progress-bar__fill--streak w-[80%]" />
          </View>
        </Section>

        {/* ── Chips ── */}
        <Section title="Gamification Chips">
          <View className="flex-row gap-3">
            <View className="xp-chip">
              <Text className="xp-chip__label">⚡ 240 XP</Text>
            </View>
            <View className="streak-chip">
              <Text className="streak-chip__label">🔥 7 Day Streak</Text>
            </View>
          </View>
        </Section>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ── Helpers ────────────────────────────────────────────── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View>
      <Text className="text-caption font-poppins-semibold text-lingua-purple uppercase tracking-widest mb-3">
        {title}
      </Text>
      {children}
    </View>
  );
}

function ColorRow({
  label,
  hex,
  bg,
  outlined,
}: {
  label: string;
  hex: string;
  bg: string;
  outlined?: boolean;
}) {
  return (
    <View className="flex-row items-center gap-3 mb-2">
      <View
        className={`w-10 h-10 rounded-lg ${bg} ${outlined ? "border border-border" : ""}`}
      />
      <View>
        <Text className="text-body-sm font-poppins-medium text-text-primary">
          {label}
        </Text>
        <Text className="text-caption text-text-secondary">{hex}</Text>
      </View>
    </View>
  );
}
