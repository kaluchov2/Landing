"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const ideaSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Please describe your idea in at least 10 characters"),
});

type IdeaFormData = z.infer<typeof ideaSchema>;

export function IdeaSubmissionForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IdeaFormData>({
    resolver: zodResolver(ideaSchema),
  });

  const onSubmit = async (data: IdeaFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/submit-idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit your idea");
      }

      setSubmitStatus("success");
      reset();

      // Close dialog after 2 seconds on success
      setTimeout(() => {
        setOpen(false);
        setSubmitStatus("idle");
      }, 2000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset form when dialog closes
      reset();
      setSubmitStatus("idle");
      setErrorMessage("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="text-sm px-12 py-5 bg-white text-black hover:bg-white/90 transition-all duration-200 uppercase tracking-widest font-light"
          style={{
            fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
            fontWeight: "300",
            letterSpacing: "0.15em",
          }}
        >
          I have an idea...
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl">
        <DialogHeader>
          <DialogTitle
            className="text-white tracking-wider uppercase text-sm mb-2"
            style={{
              fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
              fontWeight: "300",
              letterSpacing: "0.15em",
            }}
          >
            Project Proposal
          </DialogTitle>
          <DialogDescription
            className="text-white/60 text-sm"
            style={{
              fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
              fontWeight: "300",
            }}
          >
            Submit your project concept
          </DialogDescription>
        </DialogHeader>

        {submitStatus === "success" ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Thank you!</h3>
            <p className="text-sm text-white/60">
              Your idea has been submitted successfully. I&apos;ll get back to
              you soon!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none text-white/80"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register("email")}
                disabled={isSubmitting}
                className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-white/20 focus-visible:border-white/30 ${
                  errors.email ? "border-red-500/50 focus-visible:border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium leading-none text-white/80"
              >
                Your Idea
              </label>
              <Textarea
                id="message"
                placeholder="Describe your idea in detail..."
                rows={6}
                {...register("message")}
                disabled={isSubmitting}
                className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-white/20 focus-visible:border-white/30 resize-none ${
                  errors.message ? "border-red-500/50 focus-visible:border-red-500" : ""
                }`}
              />
              {errors.message && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.message.message}
                </p>
              )}
            </div>

            {submitStatus === "error" && (
              <div className="p-3 rounded-md bg-red-900/20 border border-red-500/20">
                <p className="text-sm text-red-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {errorMessage}
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Idea"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
