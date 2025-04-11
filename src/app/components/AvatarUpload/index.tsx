/**
 * src/app/components/AvatarUpload/index.tsx
 * Avatar upload bottom sheet component
 */

'use client';

import React, { useState, useRef } from 'react';
import styles from './styles.module.css';

interface AvatarUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (imageData: string) => void;
  currentAvatar?: string;
}

/**
 * Avatar Upload Component
 * Provides a bottom sheet with camera and gallery options
 * 
 * @param props Component props
 * @returns Avatar upload component
 */
export default function AvatarUpload({
  isOpen,
  onClose,
  onSave,
  currentAvatar
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onSave(event.target.result as string);
        onClose();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTakePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.capture = 'environment';
      fileInputRef.current.click();
    }
  };

  const handleSelectFromGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.bottomSheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.optionsContainer}>
          <div className={styles.option} onClick={handleTakePhoto}>
            <div className={styles.iconContainer}>
              <img src="/camera.svg" alt="Take a picture" className={styles.optionIcon} />
            </div>
            <span className={styles.optionText}>Take a picture</span>
          </div>
          
          <div className={styles.option} onClick={handleSelectFromGallery}>
            <div className={styles.iconContainer}>
              <img src="/photo-album.svg" alt="Photo album" className={styles.optionIcon} />
            </div>
            <span className={styles.optionText}>Photo album</span>
          </div>
        </div>

        <button className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>

        <input 
          type="file"
          ref={fileInputRef}
          className={styles.fileInput}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      
      {error && (
        <div className={styles.errorToast}>
          {error}
        </div>
      )}
    </div>
  );
}