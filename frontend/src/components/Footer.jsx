import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Job Hunt</h2>
            <p className="text-sm">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 md:mt-0 mt-4">
            <a
              href="https://facebook.com"
              className="hover:text-gray-400"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6 fill-current text-gray-600" viewBox="0 0 24 24">
                <path d="M22.676 0H1.324C.592 0 0 .593 0 1.326v21.348C0 23.407.592 24 1.324 24h11.5v-9.294H9.692V11.25h3.132V8.75c0-3.1 1.893-4.792 4.659-4.792 1.325 0 2.464.098 2.797.143v3.24l-1.919.001c-1.505 0-1.797.715-1.797 1.764v2.313h3.587l-.467 3.456h-3.12V24h6.115c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.407 0 22.676 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-gray-400"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6 fill-current text-gray-600" viewBox="0 0 24 24">
                <path d="M24 4.557a9.941 9.941 0 01-2.828.775 4.936 4.936 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.92 4.92 0 00-8.379 4.482A13.978 13.978 0 011.671 3.149a4.922 4.922 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.053 2.28 1.582 4.415 3.946 4.89a4.935 4.935 0 01-2.224.084 4.923 4.923 0 004.6 3.419A9.868 9.868 0 010 21.539a13.896 13.896 0 007.548 2.209c9.056 0 14.01-7.507 14.01-14.009 0-.213-.004-.425-.014-.637A10.025 10.025 0 0024 4.557z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-gray-400"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6 fill-current text-gray-600" viewBox="0 0 24 24">
                <path d="M20.452 20.452h-3.6v-5.564c0-1.327-.023-3.037-1.852-3.037-1.853 0-2.137 1.447-2.137 2.943v5.658h-3.6V8.982h3.46v1.56h.05c.482-.913 1.66-1.872 3.415-1.872 3.653 0 4.327 2.404 4.327 5.531v6.251zM5.337 7.422a2.079 2.079 0 01-2.078-2.08 2.08 2.08 0 114.157 0 2.08 2.08 0 01-2.079 2.08zm1.8 13.03h-3.6V8.982h3.6v11.47zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.544C0 23.227.792 24 1.771 24h20.454c.978 0 1.775-.774 1.775-1.728V1.728C24 .774 23.203 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
