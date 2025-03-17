export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">MedInteract</h3>
            <p className="text-gray-600">
              Check potential interactions between your medications with our AI-powered tool.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600 transition">Home</a>
              </li>
              <li>
                <a href="/#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
              </li>
              <li>
                <a href="/#how-it-works" className="text-gray-600 hover:text-blue-600 transition">How It Works</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="text-gray-600 hover:text-blue-600 transition">Terms of Service</a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-blue-600 transition">Privacy Policy</a>
              </li>
              <li>
                <a href="/disclaimer" className="text-gray-600 hover:text-blue-600 transition">Medical Disclaimer</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <a href="mailto:support@medinteract.com" className="text-gray-600 hover:text-blue-600 transition">support@medinteract.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} MedInteract. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Disclaimer: This tool is for informational purposes only and is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
