"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// HeroUI v3
import { Button } from "@heroui/react";

// Gravity UI Icons
import {
  ArrowLeft,
  Envelope,
  Key,
  CircleCheck,
  TriangleExclamation,
} from "@gravity-ui/icons";

// Better Auth Client
import {  authClient, signIn } from "@/lib/auth-client";

export default function SigninPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (response?.error) {
        setError(response.error.message || "Invalid email or password.");
        setIsLoading(false);
        return;
      }

      setSuccess("Successfully signed in! Redirecting...");
      setFormData({
        email: "",
        password: "",
      });

      setIsLoading(false);

      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative font-sans text-white">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200 group"
      >
        <ArrowLeft
          width={16}
          height={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Return
      </button>

      {/* Login Card */}
      <article className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden p-8 space-y-6">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome Back
          </h1>

          <p className="text-sm text-zinc-400">
            Sign in to continue to your account
          </p>
        </header>

        {/* Error Alert */}
        {error && (
          <section
            role="alert"
            className="flex items-center gap-3 bg-red-950/40 border border-red-900/50 p-4 rounded-xl text-sm text-red-400"
          >
            <TriangleExclamation
              width={18}
              height={18}
              className="shrink-0"
            />
            <p>{error}</p>
          </section>
        )}

        {/* Success Alert */}
        {success && (
          <section
            role="alert"
            className="flex items-center gap-3 bg-emerald-950/40 border border-emerald-900/50 p-4 rounded-xl text-sm text-emerald-400"
          >
            <CircleCheck width={18} height={18} className="shrink-0" />
            <p>{success}</p>
          </section>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Email Address
            </label>

            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-zinc-500">
                <Envelope width={16} height={16} />
              </span>

              <input
                required
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-zinc-500">
                <Key width={16} height={16} />
              </span>

              <input
                required
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isDisabled={isLoading}
            className="w-full mt-2 py-2.5 bg-white text-zinc-950 hover:bg-zinc-200 disabled:opacity-50 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Footer */}
        <footer className="text-center pt-2 border-t border-zinc-800">
          <p className="text-sm text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-white font-medium hover:text-zinc-300 transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </footer>
      </article>
    </div>
  );
}