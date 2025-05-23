'use client';

import React from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { useRouter, usePathname } from 'next/navigation';

interface NavItemProps {
  label: string;
  imageSrc: string;
  isActive?: boolean;
  to: string;
}

const NavItem = ({ label, imageSrc, isActive, to }: NavItemProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(to);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="80px"
      w="80px"
      cursor="pointer"
      color="#25292c"
      bg={isActive ? 'rgba(255, 255, 255, 0.4)' : 'transparent'}
      boxShadow={isActive ? '0px 2px 4px rgba(0, 0, 0, 0.05)' : 'none'}
      _hover={{
        bg: 'rgba(255, 255, 255, 0.4)',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
      }}
      onClick={handleClick}
      borderRadius="12%"
      transition="all 0.2s"
    >
      <Image src={imageSrc} alt={label} boxSize="24px" mb="8px" />
      <Text fontSize="16px" fontWeight={isActive ? '600' : 'normal'}>
        {label}
      </Text>
    </Flex>
  );
};

const Sidebar = () => {
  const currentPath = usePathname();
  const navItems = [
    { label: 'Home', imageSrc: '/home.png', to: '/dashboard' },
    { label: 'Scan', imageSrc: '/scan.png', to: '/scan' },
    { label: 'Link', imageSrc: '/link.png', to: '/link' },
    { label: 'Toolbox', imageSrc: '/toolbox.png', to: '/toolbox' },
    { label: 'Profile', imageSrc: '/profile.png', to: '/profile' },
  ];

  return (
    <Box
      w="88px"
      h="100vh"
      bgImage={'linear-gradient(to bottom, #eaf0ff, #dbdaff);'}
      borderRight="1px"
      borderColor="#E5E9F2"
    >
      <Flex justify="center" pt="20px" mb="48px">
        <Box
          w="40px"
          h="40px"
          borderRadius="full"
          bg="#0066FF"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src="/logo.png"></Image>
        </Box>
      </Flex>
      <Flex direction="column" align="center" gap="16px">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            imageSrc={item.imageSrc}
            isActive={currentPath.startsWith(item.to)}
            to={item.to}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Sidebar;
