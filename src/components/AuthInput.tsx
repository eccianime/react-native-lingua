import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface AuthInputProps {
  readonly label: string;
  readonly placeholder: string;
  readonly value: string;
  readonly onChangeText: (text: string) => void;
  readonly isPassword?: boolean;
  readonly editable?: boolean;
  readonly maxLength?: number;
}

export function AuthInput({
  label,
  placeholder,
  value,
  onChangeText,
  isPassword = false,
  editable,
  maxLength,
}: Readonly<AuthInputProps>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-5">
      <TextInput
        placeholder={label}
        placeholderTextColor="#B0B8C8"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !showPassword}
        className="bg-white border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 text-base font-poppins"
        style={{
          minHeight: 56,
        }}
        editable={editable ?? true}
        maxLength={maxLength}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -mt-3"
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
