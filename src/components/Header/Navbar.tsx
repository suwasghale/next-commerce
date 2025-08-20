import { MegaMenu } from "./MegaMenu";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          {/* <MobileMenu /> */}
          <span className="text-xl font-bold">MyStore</span>
        </div>
        <MegaMenu />
      </div>
    </header>
  );
}
