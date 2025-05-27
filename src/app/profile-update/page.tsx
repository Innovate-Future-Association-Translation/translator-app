'use client';

import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import EditFieldDrawer from '@/app/module/profile-update/EditFieldDrawer';
import { validateUsername, validatePhoneNumber } from '@/app/validation/profileupdate';
import ProfileUpdateForm from '@/app/module/profile-update/ProfileUpdateForm';
import MobileProfileForm from '@/app/module/profile-update/MobileProfileForm';
import ProfileHeader from '@/app/module/profile-update/ProfileHeader';
import { SaveMessage, SaveButton, useSaveMessage } from '@/app/module/profile-update/SaveMessage';
import AvatarManager from '@/app/module/profile-update/AvatarManager';

export interface UserData {
  email: string;
  userName: string;
  mobile: string;
  language: string;
  selfDescription: string;
  showText: boolean;
  profileImage: string | null;
}

export interface EditingField {
  key: keyof UserData;
  label: string;
  type: 'text' | 'textarea' | 'select';
}

export default function ProfileUpdatePage() {
  const [userData, setUserData] = useState<UserData>({
    email: 'career@jracademy.com',
    userName: '',
    mobile: '',
    language: 'en',
    selfDescription: '',
    showText: false,
    profileImage: null,
  });

  const [originalData, setOriginalData] = useState<UserData>({
    email: 'career@jracademy.com',
    userName: '',
    mobile: '',
    language: 'en',
    selfDescription: '',
    showText: false,
    profileImage: null,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingField, setEditingField] = useState<EditingField | null>(null);
  const [editingInline, setEditingInline] = useState<keyof UserData | null>(null);
  const [tempValues, setTempValues] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const formWidth = isDesktop ? '33.33%' : '95%';
  const { message, showSuccess, showError } = useSaveMessage();
  const hasUnsavedChanges = Object.keys(tempValues).length > 0;
  const hasDataChanges = JSON.stringify(userData) !== JSON.stringify(originalData);

  const handleCancelInline = useCallback(() => {
    if (editingInline) {
      const newTempValues = { ...tempValues };
      delete newTempValues[editingInline];
      setTempValues(newTempValues);
    }
    setEditingInline(null);
  }, [editingInline, tempValues]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDesktop && editingInline) {
        const target = event.target as HTMLElement;
        if (
          !target.closest('.editable-field') &&
          !target.closest('.inline-editor') &&
          !target.closest('.save-button')
        ) {
          handleCancelInline();
        }
      }
    };

    if (isDesktop) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [editingInline, isDesktop, handleCancelInline]);

  const getFieldValueAsString = (key: keyof UserData): string => {
    const value = userData[key];
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    if (typeof value !== 'string') return String(value || '');
    return value;
  };

  const handleEditField = (
    key: keyof UserData,
    label: string,
    type: 'text' | 'textarea' | 'select' = 'text'
  ) => {
    if (isDesktop) {
      setEditingInline(key);
      if (tempValues[key] === undefined) {
        setTempValues((prev) => ({ ...prev, [key]: userData[key] || '' }));
      }
    } else {
      setEditingField({ key, label, type });
      setIsDrawerOpen(true);
    }
  };

  const handleAvatarChange = useCallback((imageUrl: string) => {
    setUserData((prev) => ({ ...prev, profileImage: imageUrl }));
  }, []);

  const handleValueChange = (newValue: string) => {
    if (!editingField) return;
    const updates =
      editingField.key === 'showText'
        ? { [editingField.key]: newValue === 'true' }
        : { [editingField.key]: newValue };
    setUserData((prev) => ({ ...prev, ...updates }));
  };

  const handleDrawerClose = () => setIsDrawerOpen(false);
  const handleSaveDrawer = () => {
    setIsDrawerOpen(false);
    showSuccess('Successfully saved!');
  };

  const updateTempValue = useCallback((key: keyof UserData, value: unknown) => {
    setTempValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSaveField = (key: keyof UserData, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (tempValues[key] === undefined) return;
    const value = tempValues[key];
    if (key === 'mobile' && value) {
      const error = validatePhoneNumber(String(value).trim());
      if (error) {
        showError(error);
        return;
      }
    }
    if (key === 'userName' && value) {
      const error = validateUsername(String(value));
      if (error) {
        showError(error);
        return;
      }
    }

    const newUserData = { ...userData };
    if (key === 'showText') {
      newUserData[key] = Boolean(value);
    } else if (key === 'profileImage') {
      newUserData[key] = value as string | null;
    } else {
      newUserData[key as 'email' | 'userName' | 'mobile' | 'language' | 'selfDescription'] = String(
        value || ''
      );
    }
    setUserData(newUserData);
    setTimeout(() => {
      const newTempValues = { ...tempValues };
      delete newTempValues[key];
      setTempValues(newTempValues);
      setEditingInline(null);
    }, 0);
    showSuccess('Successfully saved!');
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      if (hasUnsavedChanges) {
        const newUserData: UserData = { ...userData };
        for (const [key, value] of Object.entries(tempValues) as Array<[keyof UserData, unknown]>) {
          if (value === undefined) continue;
          if (key === 'mobile' && value) {
            const error = validatePhoneNumber(String(value).trim());
            if (error) {
              showError(error);
              return;
            }
          }
          if (key === 'userName' && value) {
            const error = validateUsername(String(value));
            if (error) {
              showError(error);
              return;
            }
          }
          if (key === 'showText') {
            newUserData[key] = Boolean(value);
          } else if (key === 'profileImage') {
            newUserData[key] = value as string | null;
          } else {
            newUserData[key as 'email' | 'userName' | 'mobile' | 'language' | 'selfDescription'] =
              String(value || '');
          }
        }
        setUserData(newUserData);
        setTempValues({});
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOriginalData({ ...userData });
      showSuccess('All changes saved successfully!');
      setEditingInline(null);
    } catch {
      showError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleSwitch = () => {
    setUserData((prev) => ({ ...prev, showText: !prev.showText }));
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <Box bg="#f9f9f9" minH="100vh" w="100%" maxW="100%" fontFamily="Helvetica, Arial, sans-serif">
      <ProfileHeader title="Personal information" onBackClick={handleBackClick} />
      <Flex direction="column" align="center" position="relative">
        <SaveMessage message={message} />
        <AvatarManager
          profileImage={userData.profileImage}
          onImageChange={handleAvatarChange}
          showSuccessMessage={showSuccess}
        />
        {isDesktop ? (
          <ProfileUpdateForm
            userData={userData}
            editingInline={editingInline}
            tempValues={tempValues}
            onEditField={handleEditField}
            onSaveField={handleSaveField}
            onToggleSwitch={handleToggleSwitch}
            updateTempValue={updateTempValue}
          />
        ) : (
          <MobileProfileForm
            userData={userData}
            onEditField={handleEditField}
            onToggleSwitch={handleToggleSwitch}
          />
        )}
        <SaveButton
          width={formWidth}
          onSave={handleSaveAll}
          hasChanges={hasUnsavedChanges || hasDataChanges}
          loading={saving}
          disabled={false}
        />
      </Flex>
      {editingField && !isDesktop && (
        <EditFieldDrawer
          isOpen={isDrawerOpen}
          onClose={handleDrawerClose}
          title={editingField.label}
          value={getFieldValueAsString(editingField.key)}
          onChange={handleValueChange}
          onSave={handleSaveDrawer}
          fieldType={editingField.type}
        />
      )}
    </Box>
  );
}
