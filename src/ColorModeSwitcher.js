import React from "react";
import {
  IconButton,
  ChakraProvider,
  extendTheme,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitcher = (props) => {
  const { toggleColorMode } = useColorMode();
  const iconColor = useColorModeValue("gray.300", "gray.200");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      variant="ghost"
      color={iconColor}
      pos={"absolute"}
      top={"4"}
      right={"6"}
      zIndex={"overlay"}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};

const customTheme = extendTheme({
  config: {
    initialColorMode: "dark", // Set the default color mode to 'dark'
    useSystemColorMode: false, // Ensure the system color mode is not used by default
  },
});

const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      {/* Your app components */}
      <ColorModeSwitcher />
      {/* Rest of your app */}
    </ChakraProvider>
  );
};

export default App;
