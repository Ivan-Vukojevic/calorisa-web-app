import { useState, ChangeEvent, FormEvent } from 'react';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  message: string;
  consent?: boolean;
  // Nutrition-specific fields
  age: string;
  height: string;
  weight: string;
  bodyFat: string;
  diseases: string;
  diseasesOther: string;
  dailyTraining: string;
  nutritionGoal: string;
  bloodTest: string;
  // Training-specific fields
  trainingType: string;
  // Honeypot to reduce spam
  gotcha?: string;
}

interface UseContactFormReturn {
  formData: ContactFormData;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  status: { ok: boolean | null; message: string };
}

const initialFormData: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  service: '',
  message: '',
  consent: false,
  age: '',
  height: '',
  weight: '',
  bodyFat: '',
  diseases: '',
  diseasesOther: '',
  dailyTraining: '',
  nutritionGoal: '',
  bloodTest: '',
  trainingType: '',
  gotcha: ''
};

export const useContactForm = (): UseContactFormReturn => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<{ ok: boolean | null; message: string }>({ ok: null, message: '' });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName) {
      alert('Please enter your first and last name.');
      return;
    }
    
    if (!formData.email) {
      alert('Please enter your email address.');
      return;
    }
    
    if (!formData.service) {
      alert('Please select a service.');
      return;
    }
    
    if (!formData.message) {
      alert('Please enter your message.');
      return;
    }

    if (!formData.consent) {
      alert('Please accept the terms and privacy policy.');
      return;
    }
    
    // Prevent bot submissions
    if (formData.gotcha) {
      setStatus({ ok: false, message: 'Spam detected. Submission blocked.' });
      return;
    }

    // Submit to Formspree
    const envId = (import.meta as any).env?.VITE_FORMSPREE_FORM_ID as string | undefined;
    if (!envId || envId === 'yourFormId') {
      setStatus({ ok: false, message: 'Form configuration error: missing Formspree ID. Please set VITE_FORMSPREE_FORM_ID in .env.local.' });
      return;
    }
    const endpoint = `https://formspree.io/f/${envId}`;

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        payload.append(key, String(value));
      }
    });
    // Provide a subject and reply-to for convenience
    payload.append('_subject', `New contact via Calorisa — ${formData.service || 'contact'}`);
    payload.append('_replyto', formData.email);

    setIsSubmitting(true);
    fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: payload
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setStatus({ ok: true, message: 'Thank you! Your message has been sent.' });
          setFormData(initialFormData);
        } else {
          let msg = (data?.errors && Array.isArray(data.errors) && data.errors[0]?.message) || 'Submission failed. Please try again.';
          if (res.status === 403) {
            msg = 'Submission blocked: verify Allowed Domains in Formspree (e.g., localhost:5173) or disable reCAPTCHA if enabled.';
          }
          setStatus({ ok: false, message: msg });
          if ((import.meta as any).env?.DEV) {
            // eslint-disable-next-line no-console
            console.error('Formspree error', { status: res.status, data });
          }
        }
      })
      .catch(() => setStatus({ ok: false, message: 'Network error. Please try again.' }))
      .finally(() => setIsSubmitting(false));
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    status
  };
};
