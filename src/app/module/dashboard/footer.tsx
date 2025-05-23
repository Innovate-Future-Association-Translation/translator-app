import React from 'react';
import { Flex, Button, Image, Text, useMediaQuery } from '@chakra-ui/react';
import { useRouter, usePathname } from 'next/navigation';

interface NavItemProps {
  label: string;
  imageSrc: string;
  isActive: boolean;
  to: string;
  isFirst: boolean;
  isLast: boolean;
}

const NavItem = ({ label, imageSrc, isActive, to, isFirst, isLast }: NavItemProps) => {
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
      ml={isFirst && !isActive ? '20px' : '0px'}
      mr={isLast && !isActive ? '20px' : '0px'}
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
  const navItems = [
    { label: 'Home', imageSrc: '/home.png', to: '/dashboard', isFirst: true },
    { label: 'Scan', imageSrc: '/scan.png', to: '/scan' },
    { label: 'Link', imageSrc: '/link.png', to: '/link' },
    { label: 'Toolbox', imageSrc: '/toolbox.png', to: '/toolbox' },
    { label: 'Profile', imageSrc: '/profile.png', to: '/profile', isLast: true },
  ];

  return (
    <Flex
      w={isHighScreen ? 'calc(100% - 40px);' : '100%'}
      borderRadius="25px"
      h="40px"
      justifyContent="space-between"
      boxShadow="0 0 12px 0 rgba(0, 0, 0, 0.08)"
      bg="white"
      position={isHighScreen ? 'fixed' : 'relative'}
      bottom={isHighScreen ? '20px' : 'none'}
    >
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          label={item.label}
          imageSrc={item.imageSrc}
          isActive={currentPath.startsWith(item.to)}
          to={item.to}
          isFirst={item.isFirst ? item.isFirst : false}
          isLast={item.isLast ? item.isLast : false}
        />
      ))}
    </Flex>
  );
};

export default Footer;
