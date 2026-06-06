"use client";

import Link from "next/link";
import { Icon } from "@gravity-ui/uikit";
import {
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
} from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          
          {/* LEFT SECTION */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-white">
              <span className="text-blue-500">hire</span>
              <span className="text-orange-500">loop</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              The AI-native career platform. Built for people who take their work seriously.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <button className="rounded-md bg-white/5 p-2 hover:bg-white/10">
                <Icon data={LogoFacebook} size={16} />
              </button>

              <button className="rounded-md bg-white/5 p-2 hover:bg-white/10">
                <Icon data={LogoLinkedin} size={16} />
              </button>

              <button className="rounded-md bg-white/5 p-2 hover:bg-white/10">
                <Icon data={LogoGithub} size={16} />
              </button>
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="text-sm font-semibold text-blue-400">Product</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/jobs" className="hover:text-white">Job discovery</Link></li>
              <li><Link href="/ai" className="hover:text-white">Worker AI</Link></li>
              <li><Link href="/companies" className="hover:text-white">Companies</Link></li>
              <li><Link href="/salary" className="hover:text-white">Salary data</Link></li>
            </ul>
          </div>

          {/* NAVIGATIONS */}
          <div>
            <h3 className="text-sm font-semibold text-blue-400">Navigations</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/help" className="hover:text-white">Help center</Link></li>
              <li><Link href="/career" className="hover:text-white">Career library</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-sm font-semibold text-blue-400">Resources</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/brand" className="hover:text-white">Brand Guideline</Link></li>
              <li><Link href="/news" className="hover:text-white">Newsroom</Link></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          
          <p className="text-gray-500">
            Copyright 2024 — Programming Hero
          </p>

          <div className="flex gap-6 text-gray-500">
            <Link href="/terms" className="hover:text-white">
              Terms & Policy
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}