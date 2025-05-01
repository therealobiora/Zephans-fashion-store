export default function SubscribeSection() {
  return (
    <section className="bg-[#f6f6f6] px-4 md:px-12 py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between bg-transparent">
        {/* Text Section */}
        <div className="w-[95%] md:w-full text-center md:text-left">
          <h2 className="text-[28px] font-montserrat">STAY UPDATED</h2>
          <p className="md:text-xs text-sm mt-2">
            Get heads up on new items so you can grab a piece (or more) before
            it gets sold out 😉
          </p>

          {/* Subscription Form */}
          <form className="mt-4 space-y-3 md:px-5 px-3 py-5 bg-white">
            <div className="flex flex-col items-start justify-center">
              <label className="block text-xs md:pb-2">Name *</label>
              <input
                type="text"
                className="w-full md:h-[30px] border border-gray-500 p-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <label className="block text-xs mb:pb-2">Email *</label>
              <input
                type="email"
                className="w-full md:h-[30px] border border-gray-500 p-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <button className="bg-black h-[35px] md:w-[100px] w-[90px] text-white flex items-center justify-center text-xs hover:bg-gray-800 transition">
              Subscribe
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/3 mt-6 md:mt-0 flex justify-center">
          <img
            src="/images/Mail_Writing-4.png"
            alt="Mailbox"
            className="w-40 md:w-48"
          />
        </div>
      </div>
    </section>
  );
}
