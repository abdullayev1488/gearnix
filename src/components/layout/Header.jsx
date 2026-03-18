import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconMenu2 } from "@tabler/icons-react";
import { NavLink } from "react-router";
import { navLinks, navIcons } from "@/const";
import { Basket } from "@/components/ui/drawer/Basket.jsx";
import { Wishlist } from "@/components/ui/drawer/Wishlist.jsx";
import { MobileMenu } from "@/components/ui/drawer/MobileMenu.jsx";
import { AuthModal } from "@/components/ui/modals/AuthModal";
import { SearchModal } from "@/components/ui/modals/SearchModal";
import { QuickViewModal } from "@/components/ui/modals/QuickViewModal";
import { CompareModal } from "@/components/ui/modals/CompareModal";
import {
  setBasketOpen,
  setAuthOpen,
  setSearchOpen,
  setWishlistOpen,
  setMobileMenuOpen,
  setQuickViewOpen,
  setCompareModalOpen
} from "@/redux/slice/uiSlice";
import { logout } from "@/redux/slice/authSlice";
import { LogOut} from "lucide-react";

export const Header = () => {
  const dispatch = useDispatch();
  const {authOpen, searchOpen, quickViewOpen, compareModalOpen } = useSelector((state) => state.ui);
  const basketItems = useSelector((state) => state.basket.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.auth.user);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleIconClick = (name) => {
    if (name === "basket") dispatch(setBasketOpen(true));
    if (name === "user") {
      if (user) {
        setUserDropdownOpen((prev) => !prev);
      } else {
        dispatch(setAuthOpen(true));
      }
    }
    if (name === "search") dispatch(setSearchOpen(true));
    if (name === "wishlist") dispatch(setWishlistOpen(true));
  };

  const handleLogout = () => {
    dispatch(logout());
    setUserDropdownOpen(false);
  };

  return (
    <>
      <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg py-5" : "bg-transparent py-5"}`}>
        <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between transition-all duration-300">

          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(setMobileMenuOpen(true))}
              className="md:hidden cursor-pointer text-gray-700 hover:text-black"
            >
              <IconMenu2 size={24} />
            </button>
            <NavLink to="/">
              <img className="w-[130px]" src="/img/Logo.webp" alt="Logo" />
            </NavLink>
          </div>

          <ul className="hidden md:flex gap-10 font-poppins py-[12px] text-[15px]">
            {navLinks.map((link) => (
              <li key={link.title}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `cursor-pointer font-poppins transition-all duration-300 ${isActive
                      ? "text-[#1c1c1c] font-semibold"
                      : "text-gray-700 font-medium hover:text-[#1c1c1c] hover:font-semibold"
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex gap-1 sm:gap-4 text-gray-700">
            {navIcons.map((item) => (
              <div
                key={item.name}
                className="relative"
                ref={item.name === "user" ? dropdownRef : null}
              >
                <div
                  className={`relative cursor-pointer group flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-all ${item.name === "user" && user ? "bg-[#ff512f]/10 text-[#ff512f]" : ""}`}
                  onClick={() => handleIconClick(item.name)}
                >
                  <item.Icon className="group-hover:text-black transition-colors" size={22} />
                  {(item.name === "wishlist" || item.name === "basket") && (
                    <span className="absolute -top-1 -right-1 bg-[#ff512f] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {item.name === "wishlist" ? wishlistItems.length : basketItems.length}
                    </span>
                  )}
                </div>

                {item.name === "user" && user && userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-[999] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 font-poppins truncate">{user.username}</p>
                      <p className="text-xs text-gray-400 font-poppins truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer font-poppins"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <MobileMenu />
      </nav>

      <Basket />
      <Wishlist />
      <AuthModal isOpen={authOpen} onClose={() => dispatch(setAuthOpen(false))} />
      <SearchModal isOpen={searchOpen} onClose={() => dispatch(setSearchOpen(false))} />
      <QuickViewModal isOpen={quickViewOpen} onClose={() => dispatch(setQuickViewOpen(false))} />
      <CompareModal isOpen={compareModalOpen} onClose={() => dispatch(setCompareModalOpen(false))} />
    </>
  );
};
