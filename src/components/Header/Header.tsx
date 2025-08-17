'use client'
import Link from "next/link";
import { FC } from "react";

import { useAppSelector } from "@/store/hooks";
import { selectCartCount } from "@/store/cartSlice";

const Header: FC = () => {
    const totalItems = useAppSelector(selectCartCount);
  return (
    <header className="bg-white">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="inline-flex">
              <span className="sr-only">Logo</span>
              <span className="font-bold text-xl">Logo</span>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="hidden lg:flex lg:justify-start lg:ml-16 lg:space-x-8 xl:space-x-14">
            <Link
              href="/products"
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Products
            </Link>

            <Link
              href="/categories"
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Categories
            </Link>

            <Link
              href="#"
              className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Contact
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center justify-end ml-auto">
            {/* Auth Links */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <Link
                href="#"
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Create Free Account
              </Link>

              <Link
                href="#"
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu & Cart */}
            <div className="flex items-center justify-end space-x-5">
              {/* Mobile Menu Button */}
              <button
                type="button"
                title="Open Mobile Menu"
                className="p-2 -m-2 text-gray-900 transition-all duration-200 lg:hidden hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Cart Button */}
              <button
                type="button"
                className="relative p-2 -m-2 text-gray-900 transition-all duration-200 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>

                {/* Cart Count */}
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                  3
                </span>
              </button>

                  <div className="relative">
        <Link href="/cart" className="text-gray-700 hover:text-gray-900">
          🛒 Cart
        </Link>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
