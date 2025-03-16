export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-5 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <img
            src="/images/zephans-logo-white-.jpg"
            className="w-[200px]"
            alt="Logo"
          />
          <p className="text-gray-400 mt-2 text-sm">
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
          <p className="text-gray-500 mt-4">
            Site by{" "}
            <span className="text-white font-semibold">CM COUTUREMASTER</span>
          </p>
        </div>

        {/* Quick Links & Categories */}
        <div className="grid grid-cols-1 gap-5">
          <div>
            <h3 className="font-semibold text-white">QUICK LINKS</h3>
            <ul className="text-gray-400 space-y-2 mt-2">
              <li>
                <a href="#">Shipping & Returns</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">HOT CATEGORIES</h3>
            <ul className="text-gray-400 space-y-2 mt-2">
              <li>
                <a href="#">Dresses</a>
              </li>
              <li>
                <a href="#">Short Sets</a>
              </li>
              <li>
                <a href="#">Jumpsuits</a>
              </li>
              <li>
                <a href="#">Pant Sets</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-white">CONTACT INFO</h3>
          <p className="text-gray-400 mt-2 text-sm">Phone: +2348060506980</p>
          <p className="text-gray-400 text-sm">Email: info@zephansandco.com</p>
          <p className="text-gray-400 text-sm">
            Store open: 9:00 – 17:30, Mon – Fri
            <br />
            10:00 – 17:00, Sat
          </p>
          <p className="text-gray-400 mt-2 text-sm">
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
