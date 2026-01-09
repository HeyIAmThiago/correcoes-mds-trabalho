import React from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const toastConfig = {
  position: "top-right",
  autoClose: 6000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  style: {
    borderRadius: '12px',
    padding: '20px',
    fontSize: '15px',
    fontWeight: '600',
    minWidth: '350px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  }
};

// Remove emojis da mensagem
const removeEmojis = (str) => {
  return str.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
};

export const showSuccessToast = (message) => {
  const cleanMessage = removeEmojis(message);
  toast.success(
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <FontAwesomeIcon icon={faCheckCircle} size="lg" />
      <span>{cleanMessage}</span>
    </div>,
    {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        background: '#ecfdf5',
        color: '#065f46',
        border: '1px solid #10b981',
      },
      progressStyle: {
        background: '#10b981',
      }
    }
  );
};

export const showErrorToast = (message) => {
  const cleanMessage = removeEmojis(message);
  toast.error(
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <FontAwesomeIcon icon={faTimesCircle} size="lg" />
      <span>{cleanMessage}</span>
    </div>,
    {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        background: '#fef2f2',
        color: '#991b1b',
        border: '1px solid #ef4444',
      },
      progressStyle: {
        background: '#ef4444',
      }
    }
  );
};

export const showInfoToast = (message) => {
  const cleanMessage = removeEmojis(message);
  toast.info(
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <FontAwesomeIcon icon={faInfoCircle} size="lg" />
      <span>{cleanMessage}</span>
    </div>,
    {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        background: '#eff6ff',
        color: '#1e40af',
        border: '1px solid #3b82f6',
      },
      progressStyle: {
        background: '#3b82f6',
      }
    }
  );
};

export const showWarningToast = (message) => {
  const cleanMessage = removeEmojis(message);
  toast.warning(
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <FontAwesomeIcon icon={faExclamationCircle} size="lg" />
      <span>{cleanMessage}</span>
    </div>,
    {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        background: '#fffbeb',
        color: '#92400e',
        border: '1px solid #f59e0b',
      },
      progressStyle: {
        background: '#f59e0b',
      }
    }
  );
};

