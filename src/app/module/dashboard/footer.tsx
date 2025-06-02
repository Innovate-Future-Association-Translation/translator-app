'use client';
import React from 'react';
import { Flex, Button, Image, Text, useMediaQuery } from '@chakra-ui/react';
import { useRouter, usePathname } from 'next/navigation';
import LogoutButton from '../common/logout-button';

interface NavItemProps {
  label: string;
  imageSrc: string;
  isActive: boolean;
  to: string;
}

const NavItem = ({ label, imageSrc, isActive, to }: NavItemProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(to);
  };
  return (
    <Button
      onClick={handleClick}
      w={isActive ? '115px' : '40px'}
      h="40px"
      color="white"
      bg={isActive ? '#25292c' : 'transparent'}
      borderRadius={isActive ? '20px' : '0'}
    >
      <Image
        src={imageSrc}
        alt={label}
        width="24px"
        height="24px"
        minW="24px"
        flexShrink={0}
        filter={isActive ? 'brightness(0) invert(1)' : 'none'}
      />
      {isActive && (
        <Text fontSize="14px" lineHeight="16px" fontWeight="bold" ml="8px">
          {label}
        </Text>
      )}
    </Button>
  );
};

const Footer: React.FC = () => {
  const currentPath = usePathname();
  const [isHighScreen] = useMediaQuery(['(min-height: 800px)'], { ssr: false });
  const navItems: Array<Omit<NavItemProps, 'isActive'>> = [
    { label: 'Home', imageSrc: '/home.png', to: '/dashboard' },
    { label: 'Scan', imageSrc: '/scan.png', to: '/scan' },
    { label: 'Link', imageSrc: '/link.png', to: '/link' },
    { label: 'Toolbox', imageSrc: '/toolbox.png', to: '/toolbox' },
    { label: 'Profile', imageSrc: '/profile.png', to: '/profile' },
  ];

  return (
    <Flex
      w={isHighScreen ? 'calc(100% - 40px);' : '100%'}
      borderRadius="25px"
      h="40px"
      justifyContent="space-around"
      alignItems="center"
      boxShadow="0 0 12px 0 rgba(0, 0, 0, 0.08)"
      bg="white"
      position={isHighScreen ? 'fixed' : 'relative'}
      bottom={isHighScreen ? '20px' : 'none'}
      px="10px"
    >
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          label={item.label}
          imageSrc={item.imageSrc}
          isActive={currentPath.startsWith(item.to)}
          to={item.to}
        />
      ))}
      <LogoutButton imageSrc="/logout.svg" size="sm" showLabel={false} />
    </Flex>
  );
};

export default Footer;
