import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface VerificationModalProps {
  readonly isVisible: boolean;
  readonly onClose: () => void;
}

export function VerificationModal({
  isVisible,
  onClose,
}: Readonly<VerificationModalProps>) {
  const [code, setCode] = useState("");
  const router = useRouter();

  // Auto-navigate when 6 digits are entered
  useEffect(() => {
    if (code.length === 6) {
      setTimeout(() => {
        router.replace("/");
      }, 300);
    }
  }, [code, router]);

  const handleKeyPress = (num: string) => {
    if (code.length < 6) {
      setCode(code + num);
    }
  };

  const handleBackspace = () => {
    setCode(code.slice(0, -1));
  };

  const keypadLayout = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0"],
  ];

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <View className="flex-1 justify-end bg-black/30">
          <View className="bg-white rounded-t-3xl px-6 pt-8 pb-12">
            {/* Header */}
            <View className="mb-6">
              <Text className="text--h2 font-poppins-bold text-center mb-2">
                Verify your email
              </Text>
              <Text className="text--body-medium text-gray-600 text-center">
                We've sent a verification code to your email
              </Text>
            </View>

            {/* Code Display */}
            <View className="flex-row justify-center gap-2 mb-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <View
                  key={`code-${i}`}
                  className="w-12 h-12 border-2 border-gray-300 rounded-xl items-center justify-center"
                >
                  <Text className="text--h3 font-poppins-bold text-gray-900">
                    {code[i] || ""}
                  </Text>
                </View>
              ))}
            </View>

            {/* Number Pad */}
            <View className="mb-6">
              {keypadLayout.map((row, rowIndex) => (
                <View
                  key={`row-${rowIndex}`}
                  className="flex-row justify-center gap-3 mb-4"
                >
                  {row.map((num) => (
                    <TouchableOpacity
                      key={`num-${num}`}
                      onPress={() => handleKeyPress(num)}
                      className="w-16 h-16 bg-gray-100 rounded-xl items-center justify-center active:bg-gray-200"
                    >
                      <Text className="text-xl font-poppins-semibold text-gray-900">
                        {num}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  {rowIndex === 3 && (
                    <TouchableOpacity
                      key="backspace"
                      onPress={handleBackspace}
                      className="w-16 h-16 bg-gray-100 rounded-xl items-center justify-center active:bg-gray-200"
                    >
                      <Ionicons name="backspace" size={24} color="#0D132B" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            {/* Close Button */}
            <TouchableOpacity
              onPress={onClose}
              className="bg-gray-100 rounded-xl py-3 items-center"
            >
              <Text className="text--h4 font-poppins-semibold text-gray-900">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
