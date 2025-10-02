'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      className="w-full bg-card/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-40 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Logo className="h-10 w-10 text-primary" />
            </motion.div>
            <div className="flex flex-col">
              <motion.h1
                className="text-xl font-bold font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                TECHNEXus 7.0
              </motion.h1>
              <p className="text-xs text-muted-foreground">Registration Portal</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <motion.div
              className="text-right hidden sm:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold font-headline text-accent">7th Edition TECHNEXus</h2>
              <p className="text-sm text-muted-foreground">Upskilling & Learning for Students</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10">
                  <Link href="/admin">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin
                  </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
