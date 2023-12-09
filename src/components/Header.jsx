import { Button, HStack } from "@chakra-ui/react";
import ColorModeSwitcher from '../ColorModeSwitcher'
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  // const headerColor = useColorModeValue("blackAlpha.800", "blackAlpha.900")

  return (
    <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"}>
      <ColorModeSwitcher />
      <Button variant={"unstyled"} color={"white"}>
        <Link to="/">Home</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <Link to="/exchanges">Exchanges</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"}>
        <Link to="/coins">Coins</Link>
      </Button>
    </HStack>
  );
};

export default Header;