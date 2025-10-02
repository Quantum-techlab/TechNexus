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
import { Terminal, User, AtSign, GraduationCap, Hash, Phone, UploadCloud, BookOpenCheck, CheckCircle, UserPlus, BookCopy } from "lucide-react";
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
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  if (formState.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        <Alert variant="success" className="flex flex-col items-center text-center p-10 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-2xl shadow-xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="h-16 w-16 mb-4 text-primary" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AlertTitle className="text-3xl font-bold mb-2">Registration Successful!</AlertTitle>
              <AlertDescription className="mt-3 max-w-prose text-base">
                  {formState.message || "Thank you for registering for TECHNEXus 7.0. We've received your details."}
              </AlertDescription>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={onReset} className="mt-8 px-6 py-6 text-base">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Register Another Student
              </Button>
            </motion.div>
        </Alert>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl font-bold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          Student Registration
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Join the 7th Edition of TECHNEXus
        </motion.p>
      </motion.div>

      <motion.form
        ref={formRef}
        action={formAction}
        className="space-y-5 mt-8"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="space-y-2">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
          >
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input name="fullName" placeholder="Full Name" className="pl-10 h-12 border-primary/20 focus:border-primary transition-all" />
          </motion.div>
          {formState?.errors?.fullName && <p className="text-sm text-destructive">{formState.errors.fullName.join(', ')}</p>}
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input name="department" placeholder="Department" className="pl-10 h-12 border-primary/20 focus:border-primary transition-all" />
            </motion.div>
            {formState?.errors?.department && <p className="text-sm text-destructive">{formState.errors.department.join(', ')}</p>}
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input name="matricNumber" placeholder="Matric Number / Registration Number" className="pl-10 h-12 border-primary/20 focus:border-primary transition-all" />
            </motion.div>
            {formState?.errors?.matricNumber && <p className="text-sm text-destructive">{formState.errors.matricNumber.join(', ')}</p>}
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="email" name="email" placeholder="Valid Email" className="pl-10 h-12 border-primary/20 focus:border-primary transition-all" />
            </motion.div>
            {formState?.errors?.email && <p className="text-sm text-destructive">{formState.errors.email.join(', ')}</p>}
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="tel" name="whatsappNumber" placeholder="WhatsApp Number" className="pl-10 h-12 border-primary/20 focus:border-primary transition-all" />
            </motion.div>
            {formState?.errors?.whatsappNumber && <p className="text-sm text-destructive">{formState.errors.whatsappNumber.join(', ')}</p>}
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
            >
              <Select name="course" onValueChange={setCourse} value={course}>
                  <SelectTrigger className="h-12 border-primary/20">
                    <div className="flex items-center gap-3 pl-1 text-muted-foreground">
                      <BookCopy className="h-5 w-5" />
                      <span className={!course ? 'text-muted-foreground' : ''}>
                        {course ? course : 'Select a Tech Course'}
                      </span>
                    </div>
                  </SelectTrigger>
                <SelectContent>
                    {TECH_COURSES.map((course) => (
                    <SelectItem key={course} value={course}>
                        {course}
                    </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </motion.div>
            {formState?.errors?.course && <p className="text-sm text-destructive">{formState.errors.course.join(', ')}</p>}
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
            <motion.div
              whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary))' }}
              whileTap={{ scale: 0.98 }}
            >
              <Label htmlFor="receipt" className="cursor-pointer border-2 border-dashed border-primary/30 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 transition-all shadow-sm hover:shadow-md">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <UploadCloud className="w-12 h-12 text-primary mb-3" />
                  </motion.div>
                  <span className="font-semibold text-primary text-lg">Upload Payment Receipt</span>
                  <span className="text-sm text-muted-foreground mt-2">PDF, JPEG, or PNG (Max 5MB)</span>
                  {fileName && (
                    <motion.span
                      className="text-sm text-accent font-medium mt-3 px-4 py-2 bg-accent/10 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                    >
                      {fileName}
                    </motion.span>
                  )}
              </Label>
            </motion.div>
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

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <SubmitButton />
        </motion.div>
      </motion.form>
    </>
  );
}
