import { Link } from "react-router-dom";
import { Rocket, Github, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer 
      className="border-t border-white/10 mt-auto"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}
    >
      {/* Main Footer */}
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">
                OnboardX
              </span>
            </div>
            <p className="text-sm text-white/90">
              Streamline your onboarding experience and empower new team members.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link to="/features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/updates" className="hover:text-white transition-colors">
                  Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-Footer */}
      <div className="border-t border-white/10 bg-white/5">
        <div className="container px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white">
              © OnboardX 2025. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:scale-110 transition-transform"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:scale-110 transition-transform"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
