export const inputStyles = {
  size: "md" as const,
  borderRadius: "full",
  pl: 4,
  _placeholder: { color: "gray.400", fontSize: "sm" },
  border: "1px solid",
  borderColor: "gray.300",
  color: "gray.800",
  width: "100%",
  maxWidth: "400px", 
  mx: "auto", 
  '::-ms-reveal': { 
    display: 'none',
  },
  '&::-webkit-credentials-auto-fill-button': {
    visibility: 'hidden',
    position: 'absolute',
    right: '0'
  },
  _invalid: {
    borderColor: "red.500", 
    boxShadow: "none",
  },
  _focus: {
    borderColor: "blue.500", 
    boxShadow: "none",
  },
};
