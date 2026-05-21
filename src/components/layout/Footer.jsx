export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 Fit City Gym. All rights reserved.
          </p>

          <p className="text-gray-500 text-xs">
            Privacy Policy · Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}