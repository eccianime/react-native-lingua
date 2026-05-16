import { images } from "@/constants/images";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthInput } from "@/components/AuthInput";
import { VerificationModal } from "@/components/VerificationModal";

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const handleSignUp = () => {
    if (email && password) {
      setShowVerification(true);
    }
  };

  const handleSocialAuth = () => {
    // Placeholder for social auth
    setShowVerification(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <View className="px-6 pt-4 pb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#0D132B" />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View className="px-6 mb-6">
          <Text className="text--h1 font-poppins-bold text-gray-900 mb-2">
            Create your account
          </Text>
          <Text className="text--body-large text-gray-600">
            Start your language journey today ✨
          </Text>
        </View>

        {/* Mascot Section with Stars */}
        <View className="items-center mb-10 relative h-56">
          <Image
            source={images.mascotAuth}
            className="w-full h-full"
            resizeMode="contain"
          />

          {/* Decorative Stars */}
          <Text className="absolute top-8 left-6 text-3xl">✨</Text>
          <Text className="absolute top-24 right-8 text-2xl">💫</Text>
          <Text className="absolute bottom-12 right-4 text-2xl">✨</Text>
        </View>

        {/* Form Inputs */}
        <View className="px-6 mb-8">
          <AuthInput
            label="Email"
            placeholder="alex@gmail.com"
            value={email}
            onChangeText={setEmail}
          />
          <AuthInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            isPassword
          />
        </View>

        {/* Sign Up Button */}
        <View className="px-6 mb-6">
          <TouchableOpacity
            onPress={handleSignUp}
            className="bg-lingua-purple rounded-3xl py-4 items-center active:opacity-90"
          >
            <Text className="text--h3 font-poppins-bold text-white">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="px-6 mb-8">
          <View className="flex-row items-center">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="text--body-small text-gray-600 mx-4">
              or continue with
            </Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>
        </View>

        {/* Social Auth Options */}
        <View className="px-6 gap-4 mb-8">
          {/* Google */}
          <TouchableOpacity
            onPress={handleSocialAuth}
            className="flex-row items-center gap-3 border border-gray-200 rounded-xl py-3 px-4 active:bg-gray-50"
          >
            <FontAwesome5 name="google" size={20} color="#EA4335" />
            <Text className="text--body-large font-poppins-semibold text-gray-900 flex-1">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity
            onPress={handleSocialAuth}
            className="flex-row items-center gap-3 border border-gray-200 rounded-xl py-3 px-4 active:bg-gray-50"
          >
            <FontAwesome5 name="facebook" size={20} color="#1877F2" />
            <Text className="text--body-large font-poppins-semibold text-gray-900 flex-1">
              Continue with Facebook
            </Text>
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity
            onPress={handleSocialAuth}
            className="flex-row items-center gap-3 border border-gray-200 rounded-xl py-3 px-4 active:bg-gray-50"
          >
            <FontAwesome5 name="apple" size={20} color="#000000" />
            <Text className="text--body-large font-poppins-semibold text-gray-900 flex-1">
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Link */}
        <View className="items-center">
          <View className="flex-row gap-1">
            <Text className="text--body-medium text-gray-600">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
              <Text className="text--body-medium font-poppins-semibold text-lingua-purple">
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <VerificationModal
        isVisible={showVerification}
        onClose={() => setShowVerification(false)}
      />
    </SafeAreaView>
  );
}
