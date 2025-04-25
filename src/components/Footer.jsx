export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-5 md:px-16">
      <div className="max-w-7xl md:max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div className="w-[18vw]">
          <img
            src="/images/zephans-logo-white-.jpg"
            className="w-[200px]"
            alt="Logo"
          />
          <p className="text-white mt-2 text-[13px]">
            We are a ready-to-wear brand for fashion-forward women around the
            world. All pieces are made with ❤️ in Africa. Straight out of Lagos,
            Nigeria.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-white text-xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-white text-xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white text-xl">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <p className="text-gray-500 mt-4 text-[13px]">
            Site by{" "}
            <span className="text-white font-semibold">CM COUTUREMASTER</span>
          </p>
        </div>

        {/* Quick Links & Categories */}
        <div className="grid grid-cols-1 gap-5 ml-4">
          <div>
            <h3 className="font-semibold text-white">QUICK LINKS</h3>
            <ul className="text-[#f6f6f6] space-y-2 mt-2">
              <li>
                <a href="#" className="text-[13px]">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px]">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">HOT CATEGORIES</h3>
            <ul className="text-white space-y-2 mt-2">
              <li>
                <a href="#" className="text-[13px]">
                  Dresses
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px]">
                  Short Sets
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px]">
                  Jumpsuits
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px]">
                  Pant Sets
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-white">CONTACT INFO</h3>
          <p className="text-[#f6f6f6] mt-2 text-sm">Phone: +2348060506980</p>
          <p className="text-[#f6f6f6] text-sm">Email: info@zephansandco.com</p>
          <p className="text-[#f6f6f6] text-sm">
            Store open: 9:00 – 17:30, Mon – Fri
            <br />
            10:00 – 17:00, Sat
          </p>
          <p className="text-[#f6f6f6] mt-2 text-sm">
            Address: Plot 25, Block 72 Adebisi Popoola Crescent Off Victoria
            Arobieke, Lekki Phase 1, Lagos, Nigeria.
          </p>
          <div className="mt-4 flex gap-2">
            <img src="/images/zpayment.png" alt="Visa" className="h-10" />
          </div>
        </div>
      </div>
    </footer>
  );
}
