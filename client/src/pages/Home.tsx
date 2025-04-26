import { useState } from "react";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

export default function Home() {
  const [showFeedbackList, setShowFeedbackList] = useState(false);

  const toggleFeedbackList = () => {
    setShowFeedbackList((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 transition-colors duration-300 dark:bg-gray-800 dark:text-gray-200">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-primary dark:text-blue-400">
            Feedback Collector
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            We value your feedback. Please share your thoughts with us.
          </p>
        </header>

        {/* Theme Toggle */}
        <div className="mb-6 flex justify-end">
          <ThemeToggle />
        </div>

        {/* Feedback Form */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-700">
          <h2 className="mb-4 text-xl font-semibold">Submit Feedback</h2>
          <FeedbackForm />
        </div>

        {/* Admin Toggle */}
        <div className="mb-6 flex justify-center">
          <button
            className="flex items-center rounded-full bg-gray-200 px-4 py-2 font-medium transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={toggleFeedbackList}
          >
            <span>View Submitted Feedback</span>
            <svg
              className={`ml-2 h-5 w-5 transform transition-transform ${
                showFeedbackList ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Feedback List */}
        {showFeedbackList && <FeedbackList />}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
