import { useAuth, useClerk, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white px-6 py-8">
        {/* Header */}
        <Text className="text--h1 font-poppins-bold text-gray-900 mb-2">
          Welcome, {user?.firstName || "Learner"}! 👋
        </Text>
        <Text className="text--body-large text-gray-600 mb-8">
          Your language learning journey starts here
        </Text>

        {/* User Info Card */}
        <View className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-100">
          <Text className="text--body-small text-gray-600 mb-2">
            Signed in as
          </Text>
          <Text className="text--h4 font-poppins-semibold text-gray-900">
            {user?.emailAddresses[0]?.emailAddress}
          </Text>
        </View>

        {/* Placeholder Content */}
        <View className="bg-purple-50 rounded-2xl p-6 mb-8 border border-purple-100">
          <Text className="text--h3 font-poppins-bold text-lingua-purple mb-2">
            Your Lessons
          </Text>
          <Text className="text--body-medium text-gray-600">
            Lesson content coming soon...
          </Text>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-red-500 rounded-3xl py-4 items-center mt-auto"
        >
          <Text className="text--h3 font-poppins-bold text-white">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
