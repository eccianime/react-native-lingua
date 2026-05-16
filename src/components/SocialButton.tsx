import { useSSO } from "@clerk/expo";
import { FontAwesome5 } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import { Href, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export function SocialButtons({
  fetchStatus,
}: Readonly<{ fetchStatus: string }>) {
  useWarmUpBrowser();

  const router = useRouter();

  const { startSSOFlow } = useSSO();

  const handleGoogleAuth = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: "duolingoclone",
          path: "/",
        }),
      });

      // If the session was created, set it as the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          navigate: async ({ session, decorateUrl }) => {
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
        // If the session was not created, navigate to the continue page to collect missing information
        router.push("/");
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
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
          disabled={fetchStatus === "fetching"}
          className="flex-row items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 px-4 active:bg-gray-50"
          onPress={handleGoogleAuth}
        >
          <FontAwesome5 name="google" size={20} color="#EA4335" />
          <Text className="text--body-large font-poppins-semibold text-gray-900">
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Facebook */}
        {/* <TouchableOpacity
          disabled={fetchStatus === "fetching"}
          className="flex-row items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 px-4 active:bg-gray-50"
        >
          <FontAwesome5 name="facebook" size={20} color="#1877F2" />
          <Text className="text--body-large font-poppins-semibold text-gray-900">
            Continue with Facebook
          </Text>
        </TouchableOpacity> */}

        {/* Apple */}
        {/* <TouchableOpacity
          disabled={fetchStatus === "fetching"}
          className="flex-row items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 px-4 active:bg-gray-50"
        >
          <FontAwesome5 name="apple" size={20} color="#000000" />
          <Text className="text--body-large font-poppins-semibold text-gray-900">
            Continue with Apple
          </Text>
        </TouchableOpacity> */}
      </View>
    </>
  );
}
