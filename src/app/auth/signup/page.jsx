"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import {
  ArrowLeft,
  Envelope,
  Key,
  Person,
  CircleCheck,
  TriangleExclamation,
} from "@gravity-ui/icons";
// Better Auth Client Hook Instance
import { authClient } from "@/lib/auth-client";
import { Label, Radio, RadioGroup } from "@heroui/react";

export default function SignupPage() {
  const router = useRouter();

  // State tracking for the input data fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State management for user experience alerts and load statuses
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("seeker");

  // Tracks HTML5 input changes cleanly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submission routing utilizing the stable Better Auth SDK client hooks
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role,
        callbackURL: "/",
      });

      if (response.error) {
        setIsLoading(false);
        setError(
          response.error.message || "Registration failed. Check details.",
        );
      } else {
        setIsLoading(false);
        setSuccess("Account created successfully! Redirecting...");
        setFormData({ name: "", email: "", password: "" });
        setTimeout(() => router.push("/auth/signin"), 1200);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative font-sans text-white">
      {/* Return Navigation Anchor Tag Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200 group"
        type="button"
      >
        <ArrowLeft
          width={16}
          height={16}
          className="transform group-hover:-translate-x-1 transition-transform"
        />
        Return
      </button>

      {/* Main Semantic HTML5 Signup Wrapper Panel */}
      <article className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden p-8 space-y-6">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create an account
          </h1>
          <p className="text-sm text-zinc-400">
            Join using your email address below
          </p>
        </header>

        {/* Dynamic Warning Alert Messages Block */}
        {error && (
          <section
            className="flex items-center gap-3 bg-red-950/40 border border-red-900/50 p-4 rounded-xl text-sm text-red-400 animate-fadeIn"
            role="alert"
          >
            <TriangleExclamation width={18} height={18} className="shrink-0" />
            <p>{error}</p>
          </section>
        )}

        {success && (
          <section
            className="flex items-center gap-3 bg-emerald-950/40 border border-emerald-900/50 p-4 rounded-xl text-sm text-emerald-400 animate-fadeIn"
            role="alert"
          >
            <CircleCheck width={18} height={18} className="shrink-0" />
            <p>{success}</p>
          </section>
        )}

        {/* Core HTML5 Form Implementation */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Block Input layout */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Full Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-zinc-500">
                <Person width={16} height={16} />
              </span>
              <input
                required
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-zinc-700 placeholder:text-zinc-600 transition-colors"
              />
            </div>
          </div>

          {/* Email Address Block Input layout */}
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
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-zinc-700 placeholder:text-zinc-600 transition-colors"
              />
            </div>
          </div>

          {/* Password Block Input layout */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-zinc-500">
                <Key width={16} height={16} />
              </span>
              <input
                required
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-zinc-700 placeholder:text-zinc-600 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label>Subscription plan</Label>
            <RadioGroup
              value={role}
              name="role"
              onChange={(value) => setRole(value)}
              orientation="horizontal"
            >
              <Radio value="seeker">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Job Seeker</Label>
                </Radio.Content>
              </Radio>
              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Job Recruiter</Label>
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          {/* HeroUI v3 Main Action Button */}
          <Button
            type="submit"
            isDisabled={isLoading}
            className="w-full mt-2 py-2.5 bg-white text-zinc-950 hover:bg-zinc-200 disabled:opacity-50 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
          >
            {isLoading ? "Processing Registration..." : "Sign Up"}
          </Button>
        </form>
      </article>
    </div>
  );
}
