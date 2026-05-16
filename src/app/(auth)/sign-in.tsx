import { AuthInput } from "@/components/AuthInput";
import { SocialButtons } from "@/components/SocialButton";
import { images } from "@/constants/images";
import { useSignIn } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, fetchStatus, errors } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const { error } = await signIn.password({
      emailAddress: email,
      password,
    });
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          // Handle session tasks
          // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          // If no session tasks, navigate the signed-in user to the home page
          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.push(url as Href);
          }
        },
      });
    } else if (signIn.status === "needs_second_factor") {
      // See https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
    } else if (signIn.status === "needs_client_trust") {
      // For other second factor strategies,
      // see https://clerk.com/docs/guides/development/custom-flows/authentication/client-trust
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      // Check why the sign-in is not complete
      console.log("Sign-in attempt not complete:", signIn);
    }
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
          <TouchableOpacity
            onPress={() => router.back()}
            disabled={fetchStatus === "fetching"}
          >
            <Ionicons name="chevron-back" size={28} color="#0D132B" />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View className="px-6 mb-6">
          <Text className="text--h1 font-poppins-bold text-gray-900 mb-2">
            Welcome back
          </Text>
          <Text className="text--body-large text-gray-600">
            Continue your language journey ✨
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

        {/* Error Message */}
        {(errors.fields.identifier || errors.fields.password) && (
          <View className="px-6 mb-4 bg-red-50 rounded-lg p-3 border border-red-200 mx-6">
            {errors.fields.identifier && (
              <Text className="text--body-small text-red-600">
                {errors.fields.identifier?.message}
              </Text>
            )}
            {errors.fields.password && (
              <Text className="text--body-small text-red-600">
                {errors.fields.password?.message}
              </Text>
            )}
          </View>
        )}

        {/* Form Input */}
        <View className="px-6 mb-8">
          <AuthInput
            label="Email"
            placeholder="alex@gmail.com"
            value={email}
            onChangeText={setEmail}
            editable={fetchStatus !== "fetching"}
          />
          <AuthInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            isPassword
            editable={fetchStatus !== "fetching"}
          />
        </View>

        {/* Sign In Button */}
        <View className="px-6 mb-6">
          <TouchableOpacity
            onPress={handleSignIn}
            disabled={fetchStatus === "fetching"}
            className={`bg-lingua-purple rounded-3xl py-4 items-center ${
              fetchStatus === "fetching" ? "opacity-60" : "active:opacity-90"
            }`}
          >
            {fetchStatus === "fetching" ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text--h3 font-poppins-bold text-white">
                Sign In
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <SocialButtons fetchStatus={fetchStatus} />

        {/* Sign Up Link */}
        <View className="items-center">
          <View className="flex-row gap-1">
            <Text className="text--body-medium text-gray-600">
              Don&apos;t have an account?
            </Text>
            <TouchableOpacity
              onPress={router.back}
              disabled={fetchStatus === "fetching"}
            >
              <Text className="text--body-medium font-poppins-semibold text-lingua-purple">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
