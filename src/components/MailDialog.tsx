import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface MailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionName: string;
  price: number;
}

export const MailDialog: React.FC<MailDialogProps> = ({ isOpen, onClose, subscriptionName, price }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('sending');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subscriptionName,
          price,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setStatus('sent');
      
      // Reset after a delay
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setStatus('idle');
          setEmail('');
        }, 300);
      }, 2000);
    } catch (error: any) {
      console.error('Mail Error:', error);
      alert(error.message || 'Failed to send email. Please check your RESEND_API_KEY in secrets.');
      setStatus('idle');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-surface-container-lowest rounded-[2rem] p-8 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary">
                <Mail size={32} />
              </div>

              <div className="space-y-2">
                <h3 className="font-headline font-bold text-2xl text-on-surface">Send Reminder</h3>
                <p className="text-on-surface-variant text-sm">
                  Send a payment nearing notification for <span className="font-bold text-primary">{subscriptionName}</span> (${price})
                </p>
              </div>

              {status === 'sent' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center space-y-2 py-4"
                >
                  <CheckCircle2 size={48} className="text-secondary" />
                  <p className="text-secondary font-bold">Mail Sent Successfully!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSend} className="w-full space-y-4">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                      Email Address
                    </label>
                    <input
                      autoFocus
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter recipient email"
                      className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary transition-all outline-none"
                    />
                  </div>

                  <button
                    disabled={status === 'sending'}
                    type="submit"
                    className="w-full bg-gradient-to-br from-primary to-primary-container text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending Prototype Mail...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Notification
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
