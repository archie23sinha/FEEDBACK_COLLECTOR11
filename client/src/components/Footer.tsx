export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <p>© {new Date().getFullYear()} Feedback Collector</p>
      <p className="mt-2 text-xs italic">
        <span className="font-semibold">Sarah Johnson</span> - Candidate Task Submission
      </p>
    </footer>
  );
}
