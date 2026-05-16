import { AuthInput } from "@/components/AuthInput";
import { SocialButtons } from "@/components/SocialButton";
import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { useSignUp } from "@clerk/expo";
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

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, errors, fetchStatus } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const handleSignUp = async () => {
    const { error } = await signUp.password({
      emailAddress: email,
      password,
    });
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      return;
    }

    if (!error) {
      await signUp.verifications.sendEmailCode();
      setShowVerification(true);
    }
  };

  const handleVerify = async (code: string) => {
    await signUp.verifications.verifyEmailCode({
      code,
    });
    if (signUp.status === "complete") {
      await signUp.finalize({
        // Redirect the user to the home page after signing up
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
    } else {
      // Check why the sign-up is not complete
      console.log("Sign-up attempt not complete:", signUp);
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
            {showVerification ? "Verify email" : "Create your account"}
          </Text>
          <Text className="text--body-large text-gray-600">
            {showVerification
              ? "Enter the code sent to your email"
              : "Start your language journey today ✨"}
          </Text>
        </View>

        {/* Mascot Section with Stars */}
        {!showVerification && (
          <View className="items-center relative h-56">
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
        )}

        {/* Error Message */}
        {(errors.fields.emailAddress ||
          errors.fields.password ||
          errors.fields.code) && (
          <View className="px-6 mb-4 bg-red-50 rounded-lg p-3 border border-red-200 mx-6">
            {errors.fields.emailAddress && (
              <Text className="text--body-small text-red-600">
                {errors.fields.emailAddress?.message}
              </Text>
            )}
            {errors.fields.password?.message && (
              <Text className="text--body-small text-red-600">
                {errors.fields.password?.message}
              </Text>
            )}
            {errors.fields.code?.message && (
              <Text className="text--body-small text-red-600">
                {errors.fields.code?.message}
              </Text>
            )}
          </View>
        )}

        {/* Form Inputs */}
        {!showVerification ? (
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
        ) : (
          <View className="px-6 mb-8">
            <AuthInput
              label="Verification Code"
              placeholder="Enter 6-digit code"
              value={code}
              onChangeText={setCode}
              editable={fetchStatus !== "fetching"}
              maxLength={6}
            />
          </View>
        )}

        {/* Sign Up / Verify Button */}
        <View className="px-6 mb-6">
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={fetchStatus === "fetching"}
            className={`bg-lingua-purple rounded-3xl py-4 items-center ${
              fetchStatus === "fetching" ? "opacity-60" : "active:opacity-90"
            }`}
          >
            {fetchStatus === "fetching" ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text--h3 font-poppins-bold text-white">
                {showVerification ? "Verify Aqui" : "Sign Up"}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Back to Sign Up */}
        {showVerification && (
          <View className="px-6 mb-6">
            <TouchableOpacity
              onPress={() => setShowVerification(false)}
              disabled={fetchStatus === "fetching"}
              className="bg-gray-100 rounded-3xl py-4 items-center"
            >
              <Text className="text--h3 font-poppins-bold text-gray-900">
                Back
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {!showVerification && (
          <>
            <SocialButtons fetchStatus={fetchStatus} />
            {/* Sign In Link */}
            <View className="items-center">
              <View className="flex-row gap-1">
                <Text className="text--body-medium text-gray-600">
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/sign-in")}
                  disabled={fetchStatus === "fetching"}
                >
                  <Text className="text--body-medium font-poppins-semibold text-lingua-purple">
                    Log in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      <VerificationModal
        isVisible={showVerification}
        onClose={() => setShowVerification(false)}
        handleValidateCode={handleVerify}
      />
    </SafeAreaView>
  );
}
