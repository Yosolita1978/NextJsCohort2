'use client';
import { useState } from 'react';
import styles from './SubscribeForm.module.css';

export default function SubscribeForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate email in real-time
  const validateEmail = (email) => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validate name
  const validateName = (name) => {
    if (!name.trim()) {
      setNameError('Full name is required');
      return false;
    }
    if (name.trim().length < 2) {
      setNameError('Full name must be at least 2 characters');
      return false;
    }
    setNameError('');
    return true;
  };

  // Handle name change
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value) validateName(value); // Only validate if user has typed something
  };

  // Handle email change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) validateEmail(value); // Only validate if user has typed something
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    
    if (!isNameValid || !isEmailValid) {
      return; // Don't submit if validation fails
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing! 🎉');
        setName('');
        setEmail('');
        setEmailError('');
        setNameError('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
            disabled={status === 'loading'}
            className={nameError ? styles.error : ''}
            placeholder="Enter your full name"
          />
          {nameError && <span className={styles.errorText}>{nameError}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            disabled={status === 'loading'}
            className={emailError ? styles.error : ''}
            placeholder="your.email@example.com"
          />
          {emailError && <span className={styles.errorText}>{emailError}</span>}
          {email && !emailError && (
            <span className={styles.successText}>✓ Valid email</span>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || emailError || nameError || !name || !email}
          className={styles.submitButton}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>

        {message && (
          <div className={`${styles.message} ${styles[status]}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}