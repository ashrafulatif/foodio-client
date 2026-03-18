"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Timer, SquareMenu } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTENT = {
  badge: "Food Ordering Service",
  headingNormal: "Where Great Food",
  headingItalic: "Great Taste.",
  headingMid: "Meets",
  description:
    "Experience a symphony of flavors crafted with passion. Premium ingredients, exquisite recipes, delivered to your door.",
};

const slides = [
  { id: 1, image: "/image1.svg" },
  { id: 2, image: "/image2.svg" },
  { id: 3, image: "/image3.svg" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="relative mx-auto w-full max-w-[1440px] min-h-[400px] md:h-[616px]">
        {/* Right cream bg */}
        <div className="hidden md:block absolute top-0 left-[832px] w-[608px] h-[565px] bg-secondary rounded-bl-[210px]" />

        {/* Mobile layout */}
        <div className="flex flex-col md:hidden px-6 pt-[88px] pb-10 gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 font-semibold rounded-full px-3 py-1 text-xs text-primary bg-secondary w-fit">
            <SquareMenu className="h-4 w-4" />
            {CONTENT.badge}
          </div>

          {/* Mobile Image */}
          <div className="relative w-full h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-mobile-${slide.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full"
              >
                <Image
                  src={slide.image}
                  alt="Hero Food"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Heading */}
          <h1
            className="text-primary"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: 40,
              lineHeight: "110%",
              letterSpacing: "-0.04em",
            }}
          >
            {CONTENT.headingNormal}
            <br />
            {CONTENT.headingMid}{" "}
            <span
              className="font-[family-name:var(--font-playfair-display)] italic font-normal"
              style={{
                fontSize: 40,
                lineHeight: "110%",
                letterSpacing: "-0.04em",
              }}
            >
              {CONTENT.headingItalic}
            </span>
          </h1>

          <p
            className="text-[#2D2D2D]"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "140%",
              letterSpacing: "-0.02em",
            }}
          >
            {CONTENT.description}
          </p>

          <Button
            asChild
            className="bg-primary hover:bg-[#234f3c] text-white rounded-tr-none text-sm font-medium w-[154px] h-[45px] gap-[15px] shadow-[0_12px_32px_rgba(26,61,46,0.45)]"
          >
            <Link href="/menu" className="flex items-center">
              View Menu <span className="text-base">→</span>
            </Link>
          </Button>

          {/* Mobile badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 px-4 h-[60px]">
              <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center shrink-0">
                <Timer className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-gray-800 leading-none">
                  Avg. Delivery
                </p>
                <p className="text-xs text-gray-400 leading-none">22 Minutes</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 px-4 h-[60px]">
              <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center shrink-0">
                <span style={{ fontSize: 20 }}>🔥</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-400 leading-none">
                  Today&apos;s Offer
                </p>
                <p className="text-sm font-semibold text-gray-800 leading-none">
                  Free Delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop layout — unchanged */}
        <div className="hidden md:block">
          {/* Left Content */}
          <div className="absolute top-0 left-0 h-full flex flex-col justify-center px-25.75">
            <div className="inline-flex items-center gap-2 font-semibold rounded-full px-3 py-1 text-xs text-primary bg-secondary mb-6 w-fit">
              <SquareMenu className="h-4 w-4 text-primary" />
              {CONTENT.badge}
            </div>

            <h1
              className="text-primary mb-5 max-w-155"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: 74,
                lineHeight: "100%",
                letterSpacing: "-0.05em",
              }}
            >
              {CONTENT.headingNormal}
              <br />
              {CONTENT.headingMid}{" "}
              <span
                className="font-[family-name:var(--font-playfair-display)] italic font-normal"
                style={{
                  fontSize: 74,
                  lineHeight: "100%",
                  letterSpacing: "-0.05em",
                }}
              >
                {CONTENT.headingItalic}
              </span>
            </h1>

            <p
              className="text-[#2D2D2D] mb-8 max-w-115"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 500,
                fontSize: 20,
                lineHeight: "140%",
                letterSpacing: "-0.02em",
              }}
            >
              {CONTENT.description}
            </p>

            <Button
              asChild
              className="bg-primary hover:bg-[#234f3c] text-white rounded-tr-none text-sm font-medium w-[154px] h-[45px] gap-[15px] shadow-[0_12px_32px_rgba(26,61,46,0.45)]"
            >
              <Link href="/menu" className="flex items-center">
                View Menu <span className="text-base">→</span>
              </Link>
            </Button>
          </div>

          {/* Hero Image */}
          <div className="absolute top-[82px] left-[840px] w-[474px] h-[474px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${slide.id}`}
                initial={{ opacity: 0, scale: 0.95, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -30 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full"
              >
                <Image
                  src={slide.image}
                  alt="Hero Food"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Avg Delivery Badge */}
          <div className="absolute top-[415px] left-[732px] w-[190px] h-[60px] bg-white rounded-[12px] shadow-sm border border-gray-100 flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-[6px] bg-secondary flex items-center justify-center shrink-0">
              <Timer className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-800 leading-none">
                Avg. Delivery
              </p>
              <p className="text-xs text-gray-400 leading-none">22 Minutes</p>
            </div>
          </div>

          {/* Today's Offer Badge */}
          <div className="absolute top-[95px] left-[1153px] w-[190px] h-[60px] bg-white rounded-[12px] shadow-sm border border-gray-100 flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-[6px] bg-secondary flex items-center justify-center shrink-0">
              <span style={{ fontSize: 20 }}>🔥</span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-400 leading-none">
                Today&apos;s Offer
              </p>
              <p className="text-sm font-semibold text-gray-800 leading-none">
                Free Delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
