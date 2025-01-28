const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-blue-100">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-gamepad text-blue-300 text-2xl"></i>
              <h4 className="text-xl font-bold">Heroic Habits</h4>
            </div>
            <p className="text-blue-300">
              Level up your life, one habit at a time.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-4">Features</h5>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-blue-300 cursor-pointer">
                  Dashboard
                </span>
              </li>
              <li>
                <span className="hover:text-blue-300 cursor-pointer">
                  Tasks
                </span>
              </li>
              <li>
                <span className="hover:text-blue-300 cursor-pointer">
                  Progress
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Support</h5>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-blue-300 cursor-pointer">
                  Help Center
                </span>
              </li>
              <li>
                <span className="hover:text-blue-300 cursor-pointer">
                  Community
                </span>
              </li>
              <li>
                <span className="hover:text-blue-300 cursor-pointer">
                  Contact
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              <span className="hover:text-blue-300 cursor-pointer">
                <i className="fa-brands fa-twitter text-xl"></i>
              </span>
              <span className="hover:text-blue-300 cursor-pointer">
                <i className="fa-brands fa-discord text-xl"></i>
              </span>
              <span className="hover:text-blue-300 cursor-pointer">
                <i className="fa-brands fa-instagram text-xl"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-400">
          <p>© 2025 Heroic Habits. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
