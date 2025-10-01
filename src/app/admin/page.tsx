import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AdminDashboard from '@/components/AdminDashboard';
import type { Registration } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

async function getRegistrations(): Promise<Registration[]> {
  const registrationsCol = collection(db, 'registrations');
  const q = query(registrationsCol, orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);
  
  const registrations = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Ensure timestamp is serializable
      timestamp: data.timestamp ? {
        seconds: data.timestamp.seconds,
        nanoseconds: data.timestamp.nanoseconds,
      } : null,
    } as Registration;
  });

  return registrations;
}

export default async function AdminPage() {
  try {
    const registrations = await getRegistrations();
    return <AdminDashboard initialRegistrations={registrations} />;
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Fetching Data</AlertTitle>
          <AlertDescription>
            Could not retrieve registration data from the database. Please check Firestore security rules and configuration.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}
