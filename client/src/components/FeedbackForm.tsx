import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertFeedbackSchema, type InsertFeedback } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<InsertFeedback>({
    resolver: zodResolver(insertFeedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertFeedback) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/submit-feedback", data);
      
      // Show success message
      setShowSuccess(true);
      // Reset form
      reset();
      // Invalidate feedbacks query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["/api/feedbacks"] });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit feedback",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation for staggered field focus
  useEffect(() => {
    const timer = setTimeout(() => {
      setFocusedField("name");
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Reset focused field when form is successfully submitted
  useEffect(() => {
    if (isSubmitSuccessful) {
      setFocusedField(null);
    }
  }, [isSubmitSuccessful]);

  // Handle focus and blur for fields
  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="staggered-animation">
        {/* Name Field */}
        <div className="relative mb-5 group">
          <input
            type="text"
            id="name"
            placeholder=" "
            onFocus={() => handleFocus("name")}
            onBlur={handleBlur}
            className={`w-full rounded-lg border ${
              errors.name ? "border-red-500" : focusedField === "name" ? "border-blue-500 shadow-md" : "border-gray-300"
            } bg-white p-4 pt-6 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 dark:border-gray-600 dark:bg-gray-800 transition-all duration-300`}
            {...register("name")}
          />
          <label
            htmlFor="name"
            className={`absolute left-3 top-3 origin-left transform text-gray-500 transition-all duration-300 dark:text-gray-400 ${
              focusedField === "name" ? "text-blue-500 -translate-y-1 scale-90" : ""
            }`}
          >
            Full Name
          </label>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="relative mb-5 group">
          <input
            type="email"
            id="email"
            placeholder=" "
            onFocus={() => handleFocus("email")}
            onBlur={handleBlur}
            className={`w-full rounded-lg border ${
              errors.email ? "border-red-500" : focusedField === "email" ? "border-blue-500 shadow-md" : "border-gray-300"
            } bg-white p-4 pt-6 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 dark:border-gray-600 dark:bg-gray-800 transition-all duration-300`}
            {...register("email")}
          />
          <label
            htmlFor="email"
            className={`absolute left-3 top-3 origin-left transform text-gray-500 transition-all duration-300 dark:text-gray-400 ${
              focusedField === "email" ? "text-blue-500 -translate-y-1 scale-90" : ""
            }`}
          >
            Email Address
          </label>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.email.message}</p>
          )}
        </div>

        {/* Feedback Field */}
        <div className="relative mb-5 group">
          <textarea
            id="message"
            rows={4}
            placeholder=" "
            onFocus={() => handleFocus("message")}
            onBlur={handleBlur}
            className={`w-full rounded-lg border ${
              errors.message ? "border-red-500" : focusedField === "message" ? "border-blue-500 shadow-md" : "border-gray-300"
            } bg-white p-4 pt-6 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 dark:border-gray-600 dark:bg-gray-800 transition-all duration-300`}
            {...register("message")}
          />
          <label
            htmlFor="message"
            className={`absolute left-3 top-3 origin-left transform text-gray-500 transition-all duration-300 dark:text-gray-400 ${
              focusedField === "message" ? "text-blue-500 -translate-y-1 scale-90" : ""
            }`}
          >
            Your Feedback
          </label>
          {errors.message && (
            <p className="mt-1 text-sm text-red-500 animate-fade-in">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-3 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 dark:focus:ring-offset-gray-800"
        >
          <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </span>
          <span>Submit Feedback</span>
          {isSubmitting && (
            <span className="ml-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          )}
        </button>
      </div>

      {/* Success Message */}
      <div 
        className={`mt-6 rounded-lg bg-green-100 p-4 text-green-800 dark:bg-green-900/30 dark:text-green-100 transition-all duration-500 transform ${
          showSuccess ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 hidden"
        }`}
      >
        <div className="flex items-center">
          <div className="mr-3 flex-shrink-0 rounded-full bg-green-200 p-2 dark:bg-green-800">
            <svg className="h-5 w-5 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <p className="font-medium">Thank you for your feedback!</p>
            <p className="text-sm text-green-700 dark:text-green-200">We appreciate your input and will review it shortly.</p>
          </div>
        </div>
      </div>
    </form>
  );
}
