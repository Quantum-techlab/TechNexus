import Header from '@/components/Header';
import RegistrationForm from '@/components/RegistrationForm';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 w-full">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <RegistrationForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="w-full py-6 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Department of Information Technology, University of Ilorin.</p>
      </footer>
    </div>
  );
}
