"use client";

import { useState } from "react";
import { recommendCourseAction, RecommendationState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wand2, Lightbulb, CheckCircle } from "lucide-react";
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
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-headline">
          <Lightbulb className="text-primary" />
          <span>Not Sure Which Course to Pick?</span>
        </CardTitle>
        <p className="text-muted-foreground text-sm">Let our AI guide you to the perfect fit!</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            name="interests"
            placeholder="Tell us about your interests, hobbies, or what you'd like to build. For example: 'I love solving complex problems and I'm fascinated by how data can predict trends.'"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={loading || !interests} className="w-full sm:w-auto">
              {loading ? <Spinner size="small" /> : <Wand2 />}
              Get Recommendation
            </Button>
          </div>
        </form>

        {state.error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {state.courseRecommendation && (
          <Alert variant="success" className="mt-4">
            <AlertTitle className="font-bold text-lg flex flex-wrap items-center justify-between gap-2">
              <span>Recommendation: {state.courseRecommendation}</span>
              <Button size="sm" variant="outline" className="text-accent border-accent hover:bg-accent hover:text-accent-foreground" onClick={handleSelectRecommendation}>
                <CheckCircle className="mr-2 h-4 w-4"/>
                Select this Course
              </Button>
            </AlertTitle>
            <AlertDescription className="mt-2">
              <strong className="font-semibold">Reasoning:</strong> {state.reasoning}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
