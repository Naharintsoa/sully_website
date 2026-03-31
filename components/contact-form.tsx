'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Une erreur s\'est produite');
        return;
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Erreur de connexion. Veuillez réessayer.');
      console.error('Contact form error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-primary-foreground/10 p-8 rounded-lg backdrop-blur-sm">
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-primary-foreground">Message envoyé avec succès!</p>
            <p className="text-primary-foreground/80 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-primary-foreground">Erreur d'envoi</p>
            <p className="text-primary-foreground/80 text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-primary-foreground">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60 border border-primary-foreground/30 focus:outline-none focus:border-primary-foreground/80 focus:ring-2 focus:ring-accent/50 transition"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-primary-foreground">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60 border border-primary-foreground/30 focus:outline-none focus:border-primary-foreground/80 focus:ring-2 focus:ring-accent/50 transition"
              placeholder="votre@email.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-primary-foreground">Sujet</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60 border border-primary-foreground/30 focus:outline-none focus:border-primary-foreground/80 focus:ring-2 focus:ring-accent/50 transition"
            placeholder="Objet de votre message"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-primary-foreground">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60 border border-primary-foreground/30 focus:outline-none focus:border-primary-foreground/80 focus:ring-2 focus:ring-accent/50 transition h-32 resize-none"
            placeholder="Votre message..."
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Mail className="w-5 h-5" />
              Envoyer le Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
