'use client';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import RegistrationForm from '@/components/RegistrationForm';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Briefcase, TrendingUp, Laptop, Users, Award } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';


export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 w-full">
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8 text-foreground p-6 rounded-lg bg-card border shadow-sm">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 flex items-center gap-2"><Award /> A Legacy of Success: The 7th Edition</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="md:w-2/3">
                <p className="text-muted-foreground">
                  Welcome to the 7th Edition of TECHNEXus! For years, we have been dedicated to empowering students with the most in-demand tech skills. We are proud to have successfully trained and certified hundreds of students who have gone on to achieve great things in the tech industry. Join a legacy of excellence and start your journey today.
                </p>
              </div>
              <div className="md:w-1/3 flex flex-col items-center text-center p-4 bg-primary/10 rounded-lg">
                <p className="text-sm font-semibold text-primary">Students Trained</p>
                <AnimatedCounter from={500} to={7587} />
                <p className="text-xs text-muted-foreground">and counting...</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8 text-foreground p-6 rounded-lg bg-card border shadow-sm">
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
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="shadow-lg overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <RegistrationForm />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
      <footer className="w-full py-6 text-center text-muted-foreground text-sm">
        <p className="mb-2">For inquiries, call or message via WhatsApp: <a href="https://wa.me/2348160805643" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">08160805643</a>.</p>
        <p>&copy; {new Date().getFullYear()} Department of Information Technology, University of Ilorin.</p>
      </footer>
    </div>
  );
}
