import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    useFonts,
} from "@expo-google-fonts/poppins";

/**
 * useLinguaFonts
 *
 * Loads all Poppins font weights needed by the Lingua design system.
 * Use this hook in the root layout (_layout.tsx) to gate rendering
 * until fonts are ready.
 *
 * Usage:
 *   const { fontsLoaded, fontError } = useLinguaFonts();
 */
export function useLinguaFonts() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  return { fontsLoaded, fontError };
}
