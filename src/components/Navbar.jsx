"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { Icon } from "@gravity-ui/uikit";
import { Bars, Xmark, Briefcase } from "@gravity-ui/icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  
  console.log("Session Data:", session, "Loading State:", isPending);
  
  const handleLogout = async () => {
    await signOut();
  };
  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-5">
      <nav className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-[#111111]/80 px-6 py-4 backdrop-blur-xl">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Icon data={Briefcase} size={24} className="text-blue-500" />
            <h1 className="text-3xl font-extrabold tracking-tight">
              <span className="text-blue-500">hire</span>
              <span className="text-violet-700">loop</span>
            </h1>
          </Link>

          {/* Desktop Navigation (RIGHT ALIGNED) */}
          <ul className="ml-auto hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-300 transition duration-200 hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider + Desktop Actions */}
          <div className="hidden items-center gap-5 border-l border-white/10 pl-6 ml-6 lg:flex">
            {isPending ? (
              <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
            ) : session?.user ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{session.user.name || session.user.email}</p>
                    <p className="text-xs text-gray-400">{session.user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                >
                  Sign In
                </Link>

                <Link
                  href="/auth/signup"
                  className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white lg:hidden"
          >
            <Icon data={isMenuOpen ? Xmark : Bars} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isMenuOpen ? "mt-3 max-h-125" : "max-h-0"
          }`}
        >
          <div className="rounded-3xl border border-white/10 bg-[#111111]/95 p-6 backdrop-blur-xl">
            <ul className="space-y-5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-300 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-white/10 pt-6">
              <div className="flex flex-col gap-3">
                {isPending ? (
                  <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                ) : session?.user ? (
                  <>
                    <div className="mb-3 p-3 bg-white/5 rounded-lg">
                      <p className="text-sm font-medium text-white">{session.user.name || session.user.email}</p>
                      <p className="text-xs text-gray-400">{session.user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="rounded-xl bg-red-600 px-5 py-3 text-center font-medium text-white transition hover:bg-red-700"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-violet-400 py-2"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/auth/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-xl bg-violet-600 px-5 py-3 text-center font-medium text-white transition hover:bg-violet-700"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
