"use client";

import { useState, useMemo, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '@/lib/firebase';
import type { Registration } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { LogOut, ExternalLink, Search, Trash2 } from 'lucide-react';
import { Logo } from './Logo';

const TECH_COURSES = ["Web Development", "Data Science", "Cybersecurity", "Cloud Computing", "UI/UX", "AI/ML"];

export default function AdminDashboard({ initialRegistrations }: { initialRegistrations: Registration[] }) {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations);
  const [courseFilter, setCourseFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState<Registration | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const departments = useMemo(() => {
    const allDepartments = initialRegistrations.map(r => r.department);
    return ['all', ...Array.from(new Set(allDepartments))];
  }, [initialRegistrations]);
  
  const filteredRegistrations = useMemo(() => {
    return registrations
      .filter(r => courseFilter === 'all' || r.course === courseFilter)
      .filter(r => departmentFilter === 'all' || departmentFilter === '' || r.department.toLowerCase().includes(departmentFilter.toLowerCase()))
      .filter(r => 
        r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [registrations, courseFilter, departmentFilter, searchTerm]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const openDeleteDialog = (registration: Registration) => {
    setRegistrationToDelete(registration);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!registrationToDelete) return;

    startTransition(async () => {
      try {
        // Delete receipt from storage
        if (registrationToDelete.receiptUrl) {
          const storageRef = ref(storage, registrationToDelete.receiptUrl);
          await deleteObject(storageRef);
        }
        
        // Delete document from firestore
        await deleteDoc(doc(db, 'registrations', registrationToDelete.id));

        setRegistrations(prev => prev.filter(r => r.id !== registrationToDelete.id));
        toast({
            title: "Success",
            description: "Registration deleted successfully.",
            variant: 'success'
        });

      } catch (error) {
        console.error("Delete Error:", error);
        let errorMessage = "An unknown error occurred during deletion.";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        toast({
            title: "Error",
            description: `Deletion failed: ${errorMessage}`,
            variant: "destructive"
        });
      } finally {
        setIsDeleteDialogOpen(false);
        setRegistrationToDelete(null);
      }
    });
  };

  return (
    <>
      <div className="min-h-screen bg-muted/40">
        <header className="bg-card border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold font-headline">Admin Dashboard</h1>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </header>

        <main className="p-4 md:p-8">
          <div className="bg-card p-6 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by name, matric, email..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {TECH_COURSES.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</SelectItem>
                    ))}
                  </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Total Registrations: {filteredRegistrations.length}</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Matric No.</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Receipt</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map(reg => (
                      <TableRow key={reg.id}>
                        <TableCell className="font-medium">{reg.fullName}</TableCell>
                        <TableCell>{reg.matricNumber}</TableCell>
                        <TableCell>{reg.department}</TableCell>
                        <TableCell><Badge variant="secondary">{reg.course}</Badge></TableCell>
                        <TableCell>
                          <div className="flex flex-col text-sm">
                            <span>{reg.email}</span>
                            <span className="text-muted-foreground">{reg.whatsappNumber}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button asChild variant="outline" size="sm">
                            <a href={reg.receiptUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-3 w-3" /> View
                            </a>
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(reg)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
          </div>
        </main>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the registration for <span className="font-semibold">{registrationToDelete?.fullName}</span> and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isPending} className="bg-destructive hover:bg-destructive/90">
              {isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
