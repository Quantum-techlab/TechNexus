"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { Registration } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LogOut, Filter, Download, ExternalLink, Search } from 'lucide-react';
import { Logo } from './Logo';

const TECH_COURSES = ["Web Development", "Data Science", "Cybersecurity", "Cloud Computing", "UI/UX", "AI/ML"];

export default function AdminDashboard({ initialRegistrations }: { initialRegistrations: Registration[] }) {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations);
  const [courseFilter, setCourseFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
        </div>
      </main>
    </div>
  );
}
