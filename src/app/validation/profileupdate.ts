export function validateUsername(username: string): string | null {
  if (username.trim().length < 2) {
    return 'Username must be at least 2 characters!';
  }
  return null;
}

export function validatePhoneNumber(fullNumber: string): string | null {
  const phonePattern = /^\+\d{1,3}\s?\d+$/;
  if (!phonePattern.test(fullNumber.trim())) {
    return 'The phone number does not fit the format';
  }

  const countryCodeMatch = fullNumber.match(/^\+\d+/);
  if (!countryCodeMatch) return 'Invalid country code';

  const countryCode = countryCodeMatch[0];
  const phoneNumber = fullNumber.slice(countryCode.length).trim().replace(/\s+/g, '');

  const validLengths: Record<string, number[]> = {
    '+1': [10],
    '+44': [10],
    '+82': [10],
    '+86': [11],
    '+81': [9, 10],
    '+61': [9, 10],
  };

  const expectedLengths = validLengths[countryCode];
  if (!expectedLengths) {
    return 'Unsupported country code';
  }

  if (!expectedLengths.includes(phoneNumber.length)) {
    return 'The phone number does not fit the format';
  }

  return null;
}
