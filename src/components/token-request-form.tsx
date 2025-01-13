'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function TokenRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      tokenName: formData.get('tokenName'),
      tokenSymbol: formData.get('tokenSymbol'),
      contractAddress: formData.get('contractAddress'),
      description: formData.get('description'),
      contactEmail: formData.get('contactEmail'),
    };

    try {
      const response = await fetch('/api/request-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowSuccess(true);
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 bg-white/90 border-2 border-[var(--ocean-light)]">
      <h3 className="text-xl sm:text-2xl font-bold text-[var(--ocean-dark)] mb-4">
        Request Token Listing 🦘
      </h3>
      
      {showSuccess ? (
        <div className="text-center py-8">
          <p className="text-lg text-[var(--ocean-dark)] mb-2">
            Beauty! We've received your request 🎉
          </p>
          <p className="text-sm text-[var(--ocean-dark)]/60">
            We'll get back to you faster than a kangaroo on a trampoline!
          </p>
          <Button 
            className="mt-4"
            onClick={() => setShowSuccess(false)}
          >
            Submit Another Request
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[var(--ocean-dark)]/60 mb-1 block">
                Token Name
              </label>
              <Input 
                name="tokenName"
                required
                placeholder="e.g. Awesome Token"
                className="border-[var(--ocean-light)]"
              />
            </div>
            <div>
              <label className="text-sm text-[var(--ocean-dark)]/60 mb-1 block">
                Token Symbol
              </label>
              <Input 
                name="tokenSymbol"
                required
                placeholder="e.g. AWSM"
                className="border-[var(--ocean-light)]"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm text-[var(--ocean-dark)]/60 mb-1 block">
              Contract Address
            </label>
            <Input 
              name="contractAddress"
              required
              placeholder="Solana contract address"
              className="font-mono text-sm border-[var(--ocean-light)]"
            />
          </div>

          <div>
            <label className="text-sm text-[var(--ocean-dark)]/60 mb-1 block">
              Project Description
            </label>
            <Textarea 
              name="description"
              required
              placeholder="Tell us about your ripper project..."
              className="border-[var(--ocean-light)] min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-sm text-[var(--ocean-dark)]/60 mb-1 block">
              Contact Email
            </label>
            <Input 
              name="contactEmail"
              type="email"
              required
              placeholder="g'day@example.com"
              className="border-[var(--ocean-light)]"
            />
          </div>

          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[var(--ocean-dark)] text-white hover:bg-[var(--ocean-light)]"
          >
            {isSubmitting ? 'Sending Request...' : 'Submit Token Request 🏄‍♂️'}
          </Button>
        </form>
      )}
    </Card>
  );
} 