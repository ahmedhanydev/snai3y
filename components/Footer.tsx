export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">صنايعي</h3>
            <p className="text-gray-400 mb-4">
              اعثر على أفضل الحرفيين لجميع احتياجات منزلك
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">خدماتنا</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  الكهرباء
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  السباكة
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  النجارة
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  الدهان
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  التنظيف
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">الشركة</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  من نحن
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  كيف نعمل
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  الوظائف
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  الأخبار
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  المدونة
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400 ">
                <span>123 الشارع الرئيسي، المدينة</span>
                <i className="fas fa-map-marker-alt mr-2 ml-2"></i>
              </li>
              <li className="flex items-center text-gray-400 ">
                <span>+20 123 456 789</span>
                <i className="fas fa-phone mr-2 ml-2"></i>
              </li>
              <li className="flex items-center text-gray-400 ">
                <span>info@snai3y.com</span>
                <i className="fas fa-envelope mr-2 ml-2"></i>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-bold mb-2">طرق الدفع</h4>
              <div className="flex space-x-3 justify-end">
                <i className="fab fa-cc-visa text-2xl text-gray-400"></i>
                <i className="fab fa-cc-mastercard text-2xl text-gray-400"></i>
                <i className="fab fa-cc-paypal text-2xl text-gray-400"></i>
                <i className="fab fa-cc-amex text-2xl text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>جميع الحقوق محفوظة &copy; 2025 صنايعي</p>
        </div>
      </div>
    </footer>
  );
};
