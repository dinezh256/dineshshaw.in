import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Dinesh Shaw</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 w-full">
        <h1 className="text-[48px] font-bold text-mn-text-primary mb-2 tracking-tight">
          404
        </h1>
        <p className="text-[15px] font-medium text-mn-text-secondary mb-8">
          This page could not be found.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-[7px] px-[14px] py-[9px] rounded-[8px] border border-mn-divider bg-mn-btn-bg text-[13.5px] font-medium text-mn-text-primary no-underline opacity-85 hover:opacity-100 hover:border-mn-accent hover:text-mn-accent-text transition-[opacity,border-color,color] duration-150"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}
