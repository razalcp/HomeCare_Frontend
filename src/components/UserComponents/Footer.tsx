import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import appLogo from 'src/assets/appLogo.png';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}
// from-sky-100 to-sky-50 
const Footer: React.FC = () => {
    const socialLinks = [
        { icon: <FaFacebook size={20} />, href: '/facebook', label: 'Facebook' },
        { icon: <FaTwitter size={20} />, href: '/twitter', label: 'Twitter' },
        { icon: <FaInstagram size={20} />, href: '/instagram', label: 'Instagram' },
        { icon: <FaLinkedin size={20} />, href: '/linkedin', label: 'LinkedIn' },
      ];

  return (
    <footer className="bg-gradient-to-r py-2 bg-customHeaderBlue">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex justify-start mb-2 ml-4">
              <img
                src={appLogo}
                alt="HomeCare Logo"
                className="h-28 w-auto object-contain"
              />
            </div>
            <p className="text-gray-600 text-sm mb-2 max-w-sm">
              Welcome to HomeCare, where brilliance meets innovation! We are a leading company dedicated to delivering exceptional products and services to cater to your needs.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  to={social.href}
                  className="text-sky-600 hover:text-sky-700 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* For Patients */}
          <div className="col-span-1 mt-16 ml-8">
            <h3 className="font-semibold text-gray-800 mb-2">For Patients</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/search-doctors" className="text-gray-600 hover:text-sky-600 text-sm">
                  Search For Doctors
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-sky-600 text-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-sky-600 text-sm">
                  Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* For Doctors */}
          <div className="col-span-1 mt-16">
            <h3 className="font-semibold text-gray-800 mb-2">For Doctors</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/appointments" className="text-gray-600 hover:text-sky-600 text-sm">
                  Appointments
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-600 hover:text-sky-600 text-sm">
                  Chat
                </Link>
              </li>
              <li>
                <Link to="/doctor-login" className="text-gray-600 hover:text-sky-600 text-sm">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-1 mt-16">
            <h3 className="font-semibold text-gray-800 mb-2">Contact Us</h3>
            <address className="not-italic">
              <p className="text-gray-600 text-sm mb-2">
                90, Old Alabama<br />
                Church Lane, Malawi
              </p>
              <Link
                to="mailto:homecare@gmail.com"
                className="text-gray-600 hover:text-sky-600 text-sm"
              >
                homecare@gmail.com
              </Link>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-4 pt-2">
          <p className="text-center text-gray-600 text-sm">
            © 2023 HomeCare Inc. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
