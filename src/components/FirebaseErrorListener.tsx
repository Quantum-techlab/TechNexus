"use client";

import React, { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import type { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

// This component is responsible for listening to Firestore permission errors
// and throwing them as uncaught exceptions to be handled by Next.js's error overlay.
// This provides a better debugging experience during development.
const FirebaseErrorListener = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      console.error("Caught Firestore Permission Error:", error.message);
      
      // In a production environment, you might want to show a toast notification
      // instead of throwing an error.
      if (process.env.NODE_ENV === 'production') {
        toast({
          variant: 'destructive',
          title: 'Permission Denied',
          description: 'You do not have permission to perform this action.',
        });
      } else {
        // In development, we throw the error to leverage the Next.js error overlay
        // for a rich debugging experience.
        throw error;
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      // It's good practice to have a way to remove listeners, even if this component
      // is at the root and never unmounts.
    };
  }, [toast]);

  return <>{children}</>;
};

export default FirebaseErrorListener;
