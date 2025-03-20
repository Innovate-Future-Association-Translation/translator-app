import React, { ReactElement } from 'react';
import { Box } from '@chakra-ui/react';
import type { ResponsiveValue } from '@chakra-ui/styled-system';

interface LogoProps {
  width: ResponsiveValue<string>;
  height: ResponsiveValue<string>;
  backgroundColor?: ResponsiveValue<string>;
  top?: ResponsiveValue<string>;
  left?: ResponsiveValue<string>;
  right?: ResponsiveValue<string>;
  bottom?: ResponsiveValue<string>;
  logo?: ReactElement;
  image?: string;
}

function FlyingLogo(logoData: LogoProps) {
  return (
    <Box
      w={logoData.width}
      h={logoData.height}
      borderRadius="50%"
      bgColor={logoData.backgroundColor}
      zIndex={2}
      position="absolute"
      top={logoData.top}
      right={logoData.right}
      left={logoData.left}
      bottom={logoData.bottom}
      backgroundImage={logoData.image ? `url(${logoData.image})` : undefined}
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {logoData.logo}
    </Box>
  );
}

export default FlyingLogo;
