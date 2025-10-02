"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { recommendCourseAction, RecommendationState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wand2, Lightbulb, CheckCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "./ui/spinner";

export function CourseRecommender({ onCourseRecommended }: { onCourseRecommended: (course: string) => void; }) {
  const [state, setState] = useState<RecommendationState>({});
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setState({});
    const result = await recommendCourseAction(interests);
    setState(result);
    setLoading(false);
  };

  const handleSelectRecommendation = () => {
    if (state.courseRecommendation) {
      onCourseRecommended(state.courseRecommendation);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border-2 border-primary/30 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <CardHeader className="relative z-10">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="flex items-center gap-3 text-2xl font-headline">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Lightbulb className="text-primary h-7 w-7" />
              </motion.div>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Not Sure Which Course to Pick?
              </span>
            </CardTitle>
          </motion.div>
          <motion.p
            className="text-muted-foreground text-base mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Let our AI guide you to the perfect fit!
          </motion.p>
        </CardHeader>
        <CardContent className="relative z-10">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileFocus={{ scale: 1.01 }}
          >
            <Textarea
              name="interests"
              placeholder="Tell us about your interests, hobbies, or what you'd like to build. For example: 'I love solving complex problems and I'm fascinated by how data can predict trends.'"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="min-h-[120px] border-primary/30 focus:border-primary transition-all"
            />
          </motion.div>
          <div className="flex justify-end">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button type="submit" disabled={loading || !interests} className="w-full sm:w-auto">
                {loading ? <Spinner size="small" /> : <Wand2 />}
                Get Recommendation
              </Button>
            </motion.div>
          </div>
        </motion.form>

        <AnimatePresence mode="wait">
          {state.error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Oops!</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {state.courseRecommendation && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            >
              <Alert variant="success" className="mt-4 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/40">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  <Sparkles className="h-5 w-5 text-primary" />
                </motion.div>
                <AlertTitle className="font-bold text-xl flex flex-wrap items-center justify-between gap-3 mt-2">
                  <span>Recommendation: {state.courseRecommendation}</span>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="sm" variant="outline" className="text-accent border-accent hover:bg-accent hover:text-accent-foreground" onClick={handleSelectRecommendation}>
                      <CheckCircle className="mr-2 h-4 w-4"/>
                      Select this Course
                    </Button>
                  </motion.div>
                </AlertTitle>
                <AlertDescription className="mt-3 text-base">
                  <strong className="font-semibold text-foreground">Reasoning:</strong> {state.reasoning}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
    </motion.div>
  );
}
