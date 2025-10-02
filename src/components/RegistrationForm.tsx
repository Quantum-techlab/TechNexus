"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useEffect, useRef, useState } from "react";
import { RegistrationState, registerStudent } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, User, AtSign, Building, Hash, Phone, UploadCloud, BookOpenCheck, CheckCircle, UserPlus } from "lucide-react";
import { CourseRecommender } from "./CourseRecommender";
import { Spinner } from "./ui/spinner";
import { Label } from "./ui/label";
import { motion } from "framer-motion";

const TECH_COURSES = [
  "Web Development",
  "Data Science",
  "Cybersecurity",
  "Cloud Computing",
  "UI/UX",
  "AI/ML",
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Spinner size="small" /> : <BookOpenCheck />}
      Register Now
    </Button>
  );
}

export default function RegistrationForm() {
  const [key, setKey] = useState(() => Date.now().toString());

  const handleReset = () => {
    setKey(Date.now().toString());
  };

  return <RegistrationFormCore key={key} onReset={handleReset} />;
}


function RegistrationFormCore({ onReset }: { onReset: () => void }) {
  const [formState, formAction] = useActionState<RegistrationState, FormData>(
    registerStudent,
    { message: null, errors: {}, success: false }
  );
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [course, setCourse] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (formState.message && !formState.success) {
      toast({
        variant: "destructive",
        title: "Registration Error",
        description: formState.message,
      });
    }
  }, [formState, toast]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (formState.success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <Alert variant="success" className="flex flex-col items-center text-center p-8">
            <CheckCircle className="h-12 w-12 mb-4 text-primary" />
            <AlertTitle className="text-2xl font-bold">Registration Successful!</AlertTitle>
            <AlertDescription className="mt-2 max-w-prose">
                {formState.message || "Thank you for registering for TECHNEXus 7.0. We've received your details."}
            </AlertDescription>
            <Button onClick={onReset} className="mt-6">
                <UserPlus className="mr-2 h-4 w-4" />
                Register Another Student
            </Button>
        </Alert>
      </motion.div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">Student Registration</h1>
        <p className="text-muted-foreground">Join the 7th Edition of TECHNEXus</p>
      </div>

      <CourseRecommender onCourseRecommended={setCourse} />

      <motion.form 
        ref={formRef} 
        action={formAction} 
        className="space-y-6 mt-8"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input name="fullName" placeholder="Full Name" className="pl-10" />
          </div>
          {formState?.errors?.fullName && <p className="text-sm text-destructive">{formState.errors.fullName.join(', ')}</p>}
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
            <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input name="department" placeholder="Department" className="pl-10" />
            </div>
            {formState?.errors?.department && <p className="text-sm text-destructive">{formState.errors.department.join(', ')}</p>}
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
            <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input name="matricNumber" placeholder="Matric Number / Registration Number" className="pl-10" />
            </div>
            {formState?.errors?.matricNumber && <p className="text-sm text-destructive">{formState.errors.matricNumber.join(', ')}</p>}
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
            <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="email" name="email" placeholder="Valid Email" className="pl-10" />
            </div>
            {formState?.errors?.email && <p className="text-sm text-destructive">{formState.errors.email.join(', ')}</p>}
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
            <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="tel" name="whatsappNumber" placeholder="WhatsApp Number" className="pl-10" />
            </div>
            {formState?.errors?.whatsappNumber && <p className="text-sm text-destructive">{formState.errors.whatsappNumber.join(', ')}</p>}
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
            <Select name="course" onValueChange={setCourse} value={course}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a Tech Course" />
                </SelectTrigger>
                <SelectContent>
                    {TECH_COURSES.map((course) => (
                    <SelectItem key={course} value={course}>
                        {course}
                    </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {formState?.errors?.course && <p className="text-sm text-destructive">{formState.errors.course.join(', ')}</p>}
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="receipt" className="cursor-pointer border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-accent/10 transition-colors">
                <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
                <span className="font-semibold text-primary">Upload Payment Receipt</span>
                <span className="text-xs text-muted-foreground mt-1">PDF, JPEG, or PNG (Max 5MB)</span>
                {fileName && <span className="text-sm text-accent font-medium mt-2">{fileName}</span>}
            </Label>
            <Input id="receipt" name="receipt" type="file" className="sr-only" accept=".pdf,.jpeg,.jpg,.png" onChange={onFileChange}/>
            {formState?.errors?.receipt && <p className="text-sm text-destructive">{formState.errors.receipt.join(', ')}</p>}
        </motion.div>

        {formState?.errors?._form && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Registration Failed</AlertTitle>
            <AlertDescription>{formState.errors._form.join(", ")}</AlertDescription>
          </Alert>
        )}

        <motion.div variants={itemVariants}>
          <SubmitButton />
        </motion.div>
      </motion.form>
    </>
  );
}
