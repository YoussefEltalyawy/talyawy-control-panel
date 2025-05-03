import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "talyawy.dev / control panel",
  description: "Talyawy's Control Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
