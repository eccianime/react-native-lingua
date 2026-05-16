import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-h2 mt-120 text-text-center text-lingua-purple">
        Lingua
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/onboarding")}
        className="mt-8 bg-lingua-purple px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-poppins-bold">View Onboarding</Text>
      </TouchableOpacity>
    </View>
  );
}
