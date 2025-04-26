import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Feedback } from "@shared/schema";

export default function FeedbackList() {
  const {
    data: feedbacks,
    isLoading,
    isError,
    error,
  } = useQuery<Feedback[]>({
    queryKey: ["/api/feedbacks"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="my-8 rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-200">
        <p>Failed to load feedback: {error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    );
  }

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="rounded-lg bg-gray-100 p-8 text-center dark:bg-gray-700">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-gray-600 dark:text-gray-300">
          No feedback has been submitted yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-center text-xl font-semibold">
        Submitted Feedback
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="feedback-card rounded-lg bg-white p-5 shadow-md transition-all hover:shadow-lg dark:bg-gray-700"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{feedback.name}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(feedback.createdAt), "yyyy-MM-dd HH:mm")}
              </span>
            </div>
            <p className="mb-2 text-sm italic text-gray-600 dark:text-gray-300">
              {feedback.email}
            </p>
            <p className="text-gray-700 dark:text-gray-300">{feedback.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
