import Head from "next/head";

export default function UserLogin() {
  return (
    <>
      <Head>
        <title>User Login</title>
        <meta name="description" content="Login to Heroic Habits" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <div
        id="wrapper"
        className="relative bg-gradient-to-b from-sky-400 to-sky-600 overflow-hidden"
      >
        <div className="absolute inset-0 bottom-20">
          <img
            className="w-full h-full object-cover opacity-0"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2706035b51-264a42c688573c5215f3.png"
            alt="pixel art style blue sky with white clouds, 8-bit retro gaming aesthetic"
          />
        </div>

        <header
          id="header"
          className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-blue-100"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-gamepad text-blue-600 text-2xl"></i>
                <h1 className="text-xl font-bold text-blue-800">
                  Heroic Habits
                </h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                {["Dashboard", "Tasks", "Progress", "Settings"].map((item) => (
                  <span
                    key={item}
                    className="text-blue-700 hover:text-blue-500 cursor-pointer"
                  >
                    {item}
                  </span>
                ))}
              </nav>
              <div className="flex items-center space-x-4">
                <button className="text-blue-700 hover:text-blue-500">
                  <i className="fa-regular fa-bell text-xl"></i>
                </button>
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-300"
                />
              </div>
            </div>
          </div>
        </header>

        <main
          id="main"
          className="relative min-h-[800px] flex items-center justify-center"
        >
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-sky-300/30">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-sky-100">Continue your heroic journey</p>
              </div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sky-100 mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-sky-800/30 border border-sky-300/30 rounded-lg text-white placeholder-sky-200 focus:outline-none focus:border-sky-400"
                    placeholder="hero@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sky-100 mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-3 bg-sky-800/30 border border-sky-300/30 rounded-lg text-white placeholder-sky-200 focus:outline-none focus:border-sky-400"
                    placeholder="••••••••"
                  />
                </div>
                <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-sky-900 font-bold py-3 px-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200">
                  Login to Your Quest
                </button>
              </form>
              <p className="mt-6 text-center text-sky-100">
                Not a current user?{" "}
                <span className="text-yellow-400 hover:text-yellow-300 cursor-pointer">
                  Create an account now!
                </span>
              </p>
            </div>
          </div>
        </main>

        <footer id="footer" className="bg-blue-900 text-blue-100">
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
                  {["Dashboard", "Tasks", "Progress"].map((feature) => (
                    <li key={feature}>
                      <span className="hover:text-blue-300 cursor-pointer">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-4">Support</h5>
                <ul className="space-y-2">
                  {["Help Center", "Community", "Contact"].map((support) => (
                    <li key={support}>
                      <span className="hover:text-blue-300 cursor-pointer">
                        {support}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-4">Follow Us</h5>
                <div className="flex space-x-4">
                  {["twitter", "discord", "instagram"].map((icon) => (
                    <span
                      key={icon}
                      className="hover:text-blue-300 cursor-pointer"
                    >
                      <i className={`fa-brands fa-${icon} text-xl`}></i>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-400">
              <p>© 2025 Heroic Habits. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
