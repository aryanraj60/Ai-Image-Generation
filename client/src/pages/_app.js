import "@/styles/globals.css";
import Navbar from "@/Components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-72px)] bg-[#f9fafe]">
        <Component {...pageProps} />
      </main>
    </>
  );
}
