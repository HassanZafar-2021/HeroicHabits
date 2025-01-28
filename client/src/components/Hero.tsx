const Hero: React.FC = () => {
  return (
    <section className="pt-24 h-[600px] relative overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/273092d4c4-10b634e17123f9dc8a1c.png"
        alt="Hero Background"
      />
      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Level Up Your Life
          </h2>
          <p className="text-xl text-blue-50 mb-8">
            Transform your daily habits into an epic adventure. Track, improve,
            and conquer your goals one quest at a time.
          </p>
          <div className="flex space-x-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg">
              Start Your Journey
            </button>
            <button className="bg-blue-600/20 hover:bg-blue-600/30 text-white px-8 py-3 rounded-lg backdrop-blur-sm">
              Watch Tutorial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
