import type { Metadata } from "next";
import "./globals/reset.css";
import "./globals/global.scss";
import { inter } from "./ui/fonts";

export const metadata: Metadata = {
	title: "Poker"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
