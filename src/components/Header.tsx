import Link from 'next/link';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-card border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo className="h-9 w-9 text-primary transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold font-headline text-foreground tracking-tight">
                TECHNEXus 6.0
              </h1>
              <p className="text-xs text-muted-foreground">Registration Portal</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <h2 className="text-lg font-semibold font-headline text-accent">6th Edition TECHNEXus</h2>
              <p className="text-sm text-muted-foreground">Upskilling & Learning for Students</p>
            </div>
            <Button asChild variant="outline">
                <Link href="/admin">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
