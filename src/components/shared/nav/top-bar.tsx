import Link from 'next/link';

const TopBar = () => {
  return (
    <div className="border-border border-b">
      <div className="my-container flex flex-col items-center justify-between gap-2 py-2.5 sm:flex-row sm:gap-0">
        <p className="text-muted-foreground text-center text-xs sm:text-left">
          We are available 24/7, Need help?{' '}
          <Link
            href="tel:+4733378901"
            className="text-primary hover:text-primary/80 font-semibold transition-colors hover:underline"
          >
            +4733378901
          </Link>
        </p>
        <div className="text-muted-foreground flex items-center gap-3 text-xs">
          <Link
            href="/about"
            className="hover:text-primary transition-colors hover:underline"
          >
            About us
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/contact"
            className="hover:text-primary transition-colors hover:underline"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
