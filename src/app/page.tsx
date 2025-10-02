import Header from '@/components/Header';
import RegistrationForm from '@/components/RegistrationForm';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Briefcase, TrendingUp, Laptop, Users, Award } from 'lucide-react';


export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 w-full">
        <div className="max-w-3xl mx-auto">
           <div className="mb-8 text-foreground p-6 rounded-lg bg-card border shadow-sm">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 flex items-center gap-2"><Award /> A Legacy of Success: The 7th Edition</h2>
            <p className="text-muted-foreground">
              Welcome to the 7th Edition of TECHNEXus! For years, we have been dedicated to empowering students with the most in-demand tech skills. We are proud to have successfully trained and certified hundreds of students who have gone on to achieve great things in the tech industry. Join a legacy of excellence and start your journey today.
            </p>
          </div>

          <div className="mb-8 text-foreground p-6 rounded-lg bg-card border shadow-sm">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 flex items-center gap-2"><Lightbulb /> The Future is Tech</h2>
            <p className="mb-4 text-muted-foreground">
              We are in the midst of a new industrial revolution powered by technology. The world is evolving, and the demand for tech skills has never been higher. Whether you're looking to launch a career, find high-paying remote work as a student, or build a profitable side hustle, mastering a tech skill is your gateway to personal growth and financial freedom.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <p><span className="font-bold">Best Paying Jobs:</span> Tech roles consistently rank among the highest-paid professions globally.</p>
                </div>
                <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <p><span className="font-bold">Personal Growth:</span> Develop problem-solving skills and a mindset for continuous innovation.</p>
                </div>
                <div className="flex items-start gap-3">
                    <Laptop className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <p><span className="font-bold">Remote Work:</span> Gain the flexibility to work from anywhere, even while you're still a student.</p>
                </div>
                 <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <p><span className="font-bold">Hybrid Classes:</span> Our program is designed for your convenience, with both virtual and physical class options available.</p>
                </div>
            </div>
          </div>

          <Card className="shadow-lg overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <RegistrationForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="w-full py-6 text-center text-muted-foreground text-sm">
        <p className="mb-2">For any inquiries or issues with registration, please call or send a message on WhatsApp to <strong className="font-bold text-primary">08160805643</strong>.</p>
        <p>&copy; {new Date().getFullYear()} Department of Information Technology, University of Ilorin.</p>
      </footer>
    </div>
  );
}
