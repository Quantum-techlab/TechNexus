'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Header';
import RegistrationForm from '@/components/RegistrationForm';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Briefcase, TrendingUp, Laptop, Users, Award, Sparkles, Rocket, Target } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';


export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 12,
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const featureCards = [
    { icon: Briefcase, title: 'Best Paying Jobs', description: 'Tech roles consistently rank among the highest-paid professions globally.' },
    { icon: TrendingUp, title: 'Personal Growth', description: 'Develop problem-solving skills and a mindset for continuous innovation.' },
    { icon: Laptop, title: 'Remote Work', description: 'Gain the flexibility to work from anywhere, even while you are still a student.' },
    { icon: Users, title: 'Hybrid Classes', description: 'Our program is designed for your convenience, with both virtual and physical class options available.' },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 w-full relative">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="mb-8 text-foreground p-8 rounded-2xl bg-gradient-to-br from-card via-card to-primary/5 border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <motion.div
                className="flex items-center gap-3 mb-6"
                variants={floatingVariants}
                initial="initial"
                animate="animate"
              >
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  A Legacy of Success: The 7th Edition
                </h2>
              </motion.div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <motion.div
                  className="md:w-2/3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    Welcome to the 7th Edition of TECHNEXus! For years, we have been dedicated to empowering students with the most in-demand tech skills. We are proud to have successfully trained and certified hundreds of students who have gone on to achieve great things in the tech industry. Join a legacy of excellence and start your journey today.
                  </p>
                </motion.div>
                <motion.div
                  className="md:w-1/3 flex flex-col items-center text-center p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-primary/30 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="h-6 w-6 text-primary mb-2" />
                  <p className="text-sm font-semibold text-primary mb-1">Students Trained</p>
                  <AnimatedCounter from={500} to={7587} />
                  <p className="text-xs text-muted-foreground mt-1">and counting...</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="mb-8 text-foreground p-8 rounded-2xl bg-gradient-to-br from-accent/5 via-card to-card border-2 border-accent/20 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="p-3 bg-accent/10 rounded-xl">
                  <Rocket className="h-8 w-8 text-accent" />
                </div>
                <h2 className="text-3xl font-bold font-headline bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  The Future is Tech
                </h2>
              </motion.div>
              <motion.p
                className="mb-8 text-foreground/80 leading-relaxed text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                We are in the midst of a new industrial revolution powered by technology. The world is evolving, and the demand for tech skills has never been higher. Whether you're looking to launch a career, find high-paying remote work as a student, or build a profitable side hustle, mastering a tech skill is your gateway to personal growth and financial freedom.
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {featureCards.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-background to-background/50 border border-accent/10 hover:border-accent/30 transition-all shadow-sm hover:shadow-md group"
                  >
                    <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors">{feature.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.005 }}
          >
            <Card className="shadow-2xl overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
              <CardContent className="p-8 md:p-10">
                <RegistrationForm />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
      <motion.footer
        className="w-full py-8 text-center text-muted-foreground text-sm bg-card/50 border-t border-primary/10 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.p
          className="mb-3"
          whileHover={{ scale: 1.02 }}
        >
          For inquiries, call or message via WhatsApp: <a href="https://wa.me/2348160805643" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:text-accent transition-colors hover:underline">08160805643</a>.
        </motion.p>
        <p className="text-xs">&copy; {new Date().getFullYear()} Department of Information Technology, University of Ilorin.</p>
      </motion.footer>
    </div>
  );
}
