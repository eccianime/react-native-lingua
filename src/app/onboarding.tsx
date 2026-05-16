import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Logo and App Name */}
      <View className="px-6 pt-10 pb-8">
        <View className="flex-row items-center justify-center gap-2">
          <Image
            source={images.mascotLogo}
            className="w-10 h-10"
            resizeMode="contain"
          />
          <Text className="text-h2 font-poppins-bold text-text-primary">
            lingua
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View className="px-6 flex-1">
        {/* Headline */}
        <View className="mb-4">
          <Text className="text-h1 font-poppins-bold text-text-primary">
            Your AI language
          </Text>
          <Text className="text-h1 font-poppins-bold text-lingua-purple">
            teacher.
          </Text>
        </View>

        {/* Subtitle */}
        <Text className="text-body-lg text-text-secondary">
          Real conversations, personalized lessons, anytime, anywhere.
        </Text>

        {/* Mascot with Greetings */}
        <View className="items-center mb-12">
          <Image
            source={images.mascotWelcome}
            className="w-full h-[400px]"
            resizeMode="contain"
          />

          {/* Speech Bubbles */}
          <View className="absolute top-16 left-4">
            <View className="bg-blue-tint rounded-2xl rounded-tl-none px-4 py-2">
              <Text className="text-h4 text-text-primary font-poppins-semibold">
                Hello!
              </Text>
            </View>
          </View>

          <View className="absolute top-20 right-4">
            <View className="bg-purple-tint rounded-2xl rounded-tr-none px-4 py-2">
              <Text className="text-h4 font-poppins-semibold text-lingua-purple">
                ¡Hola!
              </Text>
            </View>
          </View>

          <View className="absolute bottom-20 right-2">
            <View className="bg-orange-tint rounded-2xl rounded-tr-none px-4 py-2">
              <Text className="text-h4 font-poppins-semibold text-lingua-orange">
                你好!
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Get Started Button */}
      <View className="px-6 mt-auto pb-8">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/home")}
          className="bg-lingua-purple rounded-3xl py-4 px-6 flex-row items-center justify-center gap-3"
        >
          <Text className="text-h3 font-poppins-bold text-white text-center">
            Get Started
          </Text>
          <Text className="text-white text-2xl">
            <Ionicons name="chevron-forward" size={24} />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
