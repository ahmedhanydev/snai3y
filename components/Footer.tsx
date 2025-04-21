




export const Footer = () => {


    return (

<footer className="bg-gray-800 text-white py-12">
<div className="max-w-7xl mx-auto px-8">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
<div>
<h3 className="text-xl font-bold mb-4">CraftsmenConnect</h3>
<p className="text-gray-400 mb-4">Find the best craftsmen for all your home service needs.</p>
<div className="flex space-x-4">
<a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
<i className="fab fa-facebook-f"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
<i className="fab fa-twitter"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
<i className="fab fa-instagram"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
<i className="fab fa-linkedin-in"></i>
</a>
</div>
</div>
<div>
<h4 className="font-bold mb-4">Services</h4>
<ul className="space-y-2">
<li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Electricity</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Plumbing</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Carpentry</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Painting</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Cleaning</a></li>
</ul>
</div>
<div>
<h4 className="font-bold mb-4">Company</h4>
<ul className="space-y-2">
<li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">About Us</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">How it Works</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Careers</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Press</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Blog</a></li>
</ul>
</div>
<div>
<h4 className="font-bold mb-4">Contact</h4>
<ul className="space-y-2">
<li className="flex items-center text-gray-400">
<i className="fas fa-map-marker-alt mr-2"></i>
<span>123 Main Street, City, Country</span>
</li>
<li className="flex items-center text-gray-400">
<i className="fas fa-phone mr-2"></i>
<span>+1 234 567 890</span>
</li>
<li className="flex items-center text-gray-400">
<i className="fas fa-envelope mr-2"></i>
<span>info@craftsmenconnect.com</span>
</li>
</ul>
<div className="mt-4">
<h4 className="font-bold mb-2">Payment Methods</h4>
<div className="flex space-x-3">
<i className="fab fa-cc-visa text-2xl text-gray-400"></i>
<i className="fab fa-cc-mastercard text-2xl text-gray-400"></i>
<i className="fab fa-cc-paypal text-2xl text-gray-400"></i>
<i className="fab fa-cc-amex text-2xl text-gray-400"></i>
</div>
</div>
</div>
</div>
<div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
<p>&copy; 2025 CraftsmenConnect. All rights reserved.</p>
</div>
</div>
</footer>
    )
}