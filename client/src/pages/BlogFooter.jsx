import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { asset } from "../assets/asset";
export default function BlogFooter() {
  return (
    <footer className="bg-[#3e3e3e] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo Section */}
        <div>
          <img src = {asset.logo} alt="Lamudi Logo" className="w-28 mb-4" />
        </div>

        {/* Links Section */}
        <div>
          <h3 className="font-semibold mb-2">Rental.Pk</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Terms & Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <div className="text-sm text-gray-300 space-y-1">
            <p className="flex items-center gap-2"><MdPhone /> 0800-786786</p>
            <p className="ml-6">(9:00 AM – 6:00 PM)</p>
            <p className="flex items-center gap-2"><MdEmail /> support@lamudi.pk</p>
          </div>
        </div>

        {/* Address Section */}
        <div>
          <h3 className="font-semibold mb-2">Address</h3>
          <div className="text-sm text-gray-300">
            <p className="flex items-start gap-2">
              <MdLocationOn className="mt-1" />
              8th Floor, Mega Tower,<br />
              63-B, Main Boulevard Gulberg,<br />
              Gulberg II, Lahore, Pakistan.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600 my-6"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        {/* Social Icons */}
        <div className="flex gap-4 text-white">
          <a href="#"><FaFacebookF className="hover:text-rose-500" /></a>
          <a href="#"><FaTwitter className="hover:text-rose-500" /></a>
          <a href="#"><FaLinkedinIn className="hover:text-rose-500" /></a>
        </div>

        {/* Copyright */}
        <p>© 2021 Lamudi.pk. All rights reserved.</p>
      </div>
    </footer>
  );
}
