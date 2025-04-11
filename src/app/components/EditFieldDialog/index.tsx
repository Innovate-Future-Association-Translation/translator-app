/**
 * src/app/components/EditFieldDialog/index.tsx
 * Dialog component for editing individual profile fields
 */

'use client';

import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface EditFieldDialogProps {
  isOpen: boolean;
  fieldName: string;
  initialValue: string;
  onClose: () => void;
  onSave: (value: string) => void;
  isRequired?: boolean;
  options?: string[]; 
}

const countryCodes = [
  '+61', 
  '+86', 
  '+1',  
  '+44',
  '+33',
  '+49',
  '+81',
  '+82', 
  '+65', 
  '+91', 
  '+55', 
  '+7', 
  '+27',
  '+64',
  '+39', 
  '+34', 
  '+54',
  '+41', 
  '+46', 
  '+47', 
  '+358',
  '+31', 
  '+32',
  '+43', 
  '+351',
  '+353', 
  '+850', 
  '+852', 
  '+853', 
  '+886', 
];

/**
 * Edit Field Dialog Component
 * Provides a modal dialog for editing individual profile fields
 * 
 * @param props Component props
 * @returns Dialog component
 */
export default function EditFieldDialog({
  isOpen,
  fieldName,
  initialValue,
  onClose,
  onSave,
  isRequired = false,
  options = []
}: EditFieldDialogProps) {
  const [countryCode, setCountryCode] = useState('+61');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const [value, setValue] = useState(initialValue);
  
  const [error, setError] = useState('');

  useEffect(() => {
    if (fieldName === 'Phone number') {
      const match = initialValue.match(/^(\+\d+)\s*(.*)$/);
      if (match) {
        setCountryCode(match[1]);
        setPhoneNumber(match[2]);
      } else {
        setCountryCode('+61');
        setPhoneNumber(initialValue);
      }
    } else {
      setValue(initialValue);
    }
    setError('');
  }, [initialValue, isOpen, fieldName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValue(e.target.value);
    
    if (error) setError('');
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    
    if (error) setError('');
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
    
    if (error) setError('');
  };

  const validatePhoneNumber = (): boolean => {
    const phoneRegex = /^[\d\s-]+$/;
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (fieldName === 'Phone number') {
      if (!validatePhoneNumber()) {
        return;
      }
      
      const fullPhoneNumber = phoneNumber.trim() ? `${countryCode} ${phoneNumber}` : '';
      onSave(fullPhoneNumber);
    } else {
      if (isRequired && !value.trim()) {
        setError(`${fieldName} is required`);
        return;
      }
      
      onSave(value);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        {fieldName === 'Self-description' ? (
          <>
            <div className={styles.selfDescHeader}>
              <h2 className={styles.selfDescTitle}>{fieldName}</h2>
              <button 
                className={styles.closeIcon}
                onClick={onClose}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className={styles.selfDescContent}>
              <textarea
                className={styles.selfDescTextarea}
                value={value}
                onChange={handleChange}
                placeholder={`${fieldName}`}
                rows={5}
                aria-label={fieldName}
              />
              <button 
                className={styles.selfDescSaveButton}
                onClick={handleSave}
                aria-label="Save"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.standardHeader}>
              <h2 className={styles.standardTitle}>{fieldName}</h2>
              <button 
                className={styles.closeIcon}
                onClick={onClose}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className={styles.standardContent}>
              {fieldName === 'Phone number' ? (
                <div className={styles.phoneInputWrapper}>
                  <div className={styles.phoneInputContainer}>
                    <select 
                      className={styles.countryCodeSelect}
                      value={countryCode}
                      onChange={handleCountryCodeChange}
                      aria-label="Country code"
                    >
                      {countryCodes.map(code => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
                    </select>
                    <input
                      className={styles.phoneNumberInput}
                      type="tel" 
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder="Phone number"
                      aria-label="Phone number"
                    />
                  </div>
                </div>
              ) : options.length > 0 ? (
                <select 
                  className={styles.standardSelect}
                  value={value}
                  onChange={handleChange}
                  aria-label={fieldName}
                >
                  {options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className={styles.standardInput}
                  type="text"
                  value={value}
                  onChange={handleChange}
                  placeholder={fieldName}
                  aria-label={fieldName}
                />
              )}

              {error && <div className={styles.errorMessage}>{error}</div>}
              
              <button 
                className={styles.standardSaveButton}
                onClick={handleSave}
                aria-label="Save"
                disabled={isRequired && !value.trim()}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}