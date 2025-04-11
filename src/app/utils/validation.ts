/**
 * src/app/utils/validation.ts
 * Form validation utility functions
 */

/**
 * Checks if a value is empty
 * @param value - The value to check
 * @returns boolean - True if the value is not empty
 */
export const isRequired = (value: string): boolean => {
    return value !== undefined && value !== null && value.trim() !== '';
  };
  
  /**
   * Validates phone number format
   * @param value - The phone number to validate
   * @returns boolean - True if the phone number format is valid or empty
   */
  export const isValidPhone = (value: string): boolean => {
    // Allow empty for optional fields
    if (!value) return true;
    
    // Basic phone validation pattern - accepts various formats
    const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    return phonePattern.test(value);
  };
  
  /**
   * Checks if a string is within a maximum length
   * @param value - The string to check
   * @param maxLength - The maximum allowed length
   * @returns boolean - True if the string length is valid
   */
  export const isValidLength = (value: string, maxLength: number): boolean => {
    // Allow empty for optional fields
    if (!value) return true;
    
    return value.length <= maxLength;
  };
  
  /**
   * Interface for form validation rules
   */
  export interface ValidationRules {
    [key: string]: {
      required?: boolean;
      maxLength?: number;
      isPhone?: boolean;
      custom?: (value: string) => boolean;
      message?: string;
    };
  }
  
  /**
   * Validates a form field based on validation rules
   * @param name - Field name
   * @param value - Field value
   * @param rules - Validation rules
   * @returns string - Error message or empty string if valid
   */
  export const validateField = (
    name: string,
    value: string,
    rules: ValidationRules
  ): string => {
    if (!rules[name]) return '';
  
    const fieldRules = rules[name];
    
    // Required validation
    if (fieldRules.required && !isRequired(value)) {
      return fieldRules.message || `${name} is required`;
    }
    
    // Max length validation
    if (fieldRules.maxLength && !isValidLength(value, fieldRules.maxLength)) {
      return fieldRules.message || `${name} must be less than ${fieldRules.maxLength} characters`;
    }
    
    // Phone validation
    if (fieldRules.isPhone && !isValidPhone(value)) {
      return fieldRules.message || 'Please enter a valid phone number';
    }
    
    // Custom validation
    if (fieldRules.custom && !fieldRules.custom(value)) {
      return fieldRules.message || `Invalid ${name}`;
    }
    
    return '';
  };