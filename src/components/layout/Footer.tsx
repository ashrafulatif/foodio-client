import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border mt-36">
      <div className="max-w-360 mx-auto px-6 md:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left — Logo + copyright */}
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
          <span
            className="text-primary font-bold text-[20px] tracking-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Foodio.
          </span>
          <span className="text-muted-foreground text-[14px]">
            © 2026 Foodio Inc.
          </span>
        </div>

        {/* Right — Links */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link
            href="/privacy"
            className="text-muted-foreground text-[14px] hover:text-primary transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-muted-foreground text-[14px] hover:text-primary transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-muted-foreground text-[14px] hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
