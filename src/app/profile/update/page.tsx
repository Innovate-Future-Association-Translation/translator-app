/**
 * src/app/profile/update/page.tsx
 * User Profile Update Page
 * 
 * This page allows users to update their profile information following the provided UI design
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import EditFieldDialog from '@/app/components/EditFieldDialog';
import AvatarUpload from '@/app/components/AvatarUpload';
import { validateField, ValidationRules } from '@/app/utils/validation';

/**
 * User Profile Update Page Component
 * @returns JSX Element - Renders the profile update page
 */
export default function ProfileUpdatePage() {
  const router = useRouter();

    
    const [userData, setUserData] = useState({
      email: 'career@jracademy.com',
      username: 'career',
      phoneNumber: '+61 0412 345 678',
      language: 'English',
      selfDescription: 'Here is the content of my self description',
      avatar: ''
    });
  
  
    const [dialogState, setDialogState] = useState({
      isOpen: false,
      fieldName: '',
      currentValue: '',
      options: [] as string[]
    });
  
    const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
 
  const pageBackground = '#f2f2f7';

  const openEditDialog = (field: string, value: string, options: string[] = []) => {
    const displayValue = value || (field === 'Phone number' ? '+61 ' : '');
    
    setDialogState({
      isOpen: true,
      fieldName: field,
      currentValue: displayValue,
      options
    });
  };

  const closeDialog = () => {
    setDialogState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  const saveFieldValue = (value: string) => {
    let fieldKey;
    switch (dialogState.fieldName.toLowerCase()) {
      case 'username':
        fieldKey = 'username';
        break;
      case 'phone number':
        fieldKey = 'phoneNumber';
        break;
      case 'language':
        fieldKey = 'language';
        break;
      case 'self-description':
        fieldKey = 'selfDescription';
        break;
      default:
        fieldKey = dialogState.fieldName.toLowerCase();
    }
    
    console.log(`Saving field: ${dialogState.fieldName} with key: ${fieldKey} and value: ${value}`);
    
    setUserData(prev => ({
      ...prev,
      [fieldKey]: value
    }));
  };

  const openAvatarDialog = () => {
    setAvatarDialogOpen(true);
  };

  const closeAvatarDialog = () => {
    setAvatarDialogOpen(false);
  };

  const saveAvatar = (imageData: string) => {
    setUserData(prev => ({
      ...prev,
      avatar: imageData
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile data saved:', userData);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <button 
          onClick={handleGoBack}
          className={styles.backButton}
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className={styles.headerTitle}>Personal information</h1>
        <button className={styles.menuButton} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </header>

      <main className={styles.main}>
        {/* User Profile Avatar */}
        <div className={styles.avatarContainer} onClick={openAvatarDialog}>
          <div className={styles.avatar}>
            {userData.avatar ? (
              <img 
                src={userData.avatar} 
                alt="User profile" 
                className={styles.avatarImage}
              />
            ) : (
              <img 
                src="/profile-photo.svg" 
                alt="Default profile" 
                className={styles.defaultAvatarImage}
              />
            )}
          </div>
        </div>

        {/* Profile Form */}
        <form className={styles.form}>
          <div className={styles.formGroup}>
            {/* Email (read-only) */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Email</label>
              <div className={styles.fieldValue}>{userData.email}</div>
            </div>

            {/* Username */}
            <div className={styles.fieldGroup} onClick={() => openEditDialog('Username', userData.username)}>
              <label className={styles.fieldLabel}>Username</label>
              <div className={styles.fieldValueEditable}>
                {userData.username ? (
                  <span>{userData.username}</span>
                ) : (
                  <span className={styles.emptyField}>Fill in</span>
                )}
                <svg className={styles.chevron} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Phone Number */}
            <div className={styles.fieldGroup} onClick={() => openEditDialog('Phone number', userData.phoneNumber)}>
              <label className={styles.fieldLabel}>Phone number</label>
              <div className={styles.fieldValueEditable}>
                {userData.phoneNumber ? (
                  <span>{userData.phoneNumber}</span>
                ) : (
                  <span className={styles.emptyField}>Fill in</span>
                )}
                <svg className={styles.chevron} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            {/* Language */}
            <div className={styles.fieldGroup} onClick={() => openEditDialog('Language', userData.language, ['English', 'Chinese', 'Spanish', 'French', 'German', 'Japanese', 'Korean'])}>
              <label className={styles.fieldLabel}>Language</label>
              <div className={styles.fieldValueEditable}>
                {userData.language ? (
                  <span>{userData.language}</span>
                ) : (
                  <span className={styles.fieldPlaceholder}>Fill in</span>
                )}
                <svg className={styles.chevron} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Self-description */}
          <div className={`${styles.fieldGroup} ${styles.vertical}`} onClick={() => openEditDialog('Self-description', userData.selfDescription)}>
              <div className={styles.selfDescriptionHeader}>
                <label className={styles.fieldLabelVertical}>Self-description</label>
                <svg className={styles.chevron} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.fieldValueVertical}>
                {userData.selfDescription ? (
                  <span>{userData.selfDescription}</span>
                ) : (
                  <span className={styles.fieldPlaceholderVertical}>Fill in</span>
                )}
              </div>
            </div>
        </form>

          {/* Fixed Save Button at bottom */}
          <div className={styles.saveButtonContainer}>
            <button type="button" onClick={handleSubmit} className={styles.saveButton}>
              Save
            </button>
          </div>
      </main>

      {/* Edit Field Dialog */}
      <EditFieldDialog 
        isOpen={dialogState.isOpen}
        fieldName={dialogState.fieldName}
        initialValue={dialogState.currentValue}
        options={dialogState.options}
        onClose={closeDialog}
        onSave={saveFieldValue}
        isRequired={dialogState.fieldName === 'Language'}
      />

      {/* Avatar Upload Dialog */}
      <AvatarUpload
        isOpen={avatarDialogOpen}
        onClose={closeAvatarDialog}
        onSave={saveAvatar}
        currentAvatar={userData.avatar}
      />
    </div>
  );
}