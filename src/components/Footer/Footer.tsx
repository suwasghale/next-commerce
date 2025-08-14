import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import {
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

const Footer: FC = () => {
  return (
    <footer className="mt-8 bg-violet-900 pt-9">
      <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
        <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
          
          {/* Logo & Description */}
          <div className="md:w-[316px]">
            <h1 className="text-white font-extrabold text-[18px]">
              <span className="text-rose-600">YOUR</span>LOGO
            </h1>
            <p className="mt-[18px] text-[15px] font-normal text-white/[80%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, fugit non. Incidunt dolorum adipisci, tempore asperiores nemo odio facere officiis enim animi placeat eaque nesciunt alias beatae id, at dicta.
            </p>
            {/* Social Icons */}
            <div className="mt-[18px] flex gap-4">
              <Link href="#" target="_blank" className="hover:scale-110"><Facebook size={36} color="white" /></Link>
              <Link href="#" target="_blank" className="hover:scale-110"><Linkedin size={36} color="white" /></Link>
              <Link href="#" target="_blank" className="hover:scale-110"><Instagram size={36} color="white" /></Link>
              <Link href="#" target="_blank" className="hover:scale-110"><Twitter size={36} color="white" /></Link>
              <Link href="https://www.youtube.com/" target="_blank" className="hover:scale-110"><Youtube size={36} color="white" /></Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:w-[316px] mt-6 md:mt-0">
            <div className="mt-[23px] flex items-center">
              <Phone className="h-6 w-6 text-white" />
              <div className="ml-[18px]">
                <Link href="tel:+911800123444" className="font-Inter text-[14px] font-medium text-white">+91 1800123444</Link>
                <p className="font-Inter text-[12px] font-medium text-white">Support Number</p>
              </div>
            </div>
            <div className="mt-[23px] flex items-center">
              <Mail className="h-6 w-6 text-white" />
              <div className="ml-[18px]">
                <Link href="mailto:help@lorem.com" className="font-Inter text-[14px] font-medium text-white">help@lorem.com</Link>
                <p className="font-Inter text-[12px] font-medium text-white">Support Email</p>
              </div>
            </div>
            <div className="mt-[23px] flex items-center">
              <MapPin className="h-6 w-6 text-white" />
              <div className="ml-[18px]">
                <p className="font-Inter text-[14px] font-medium text-white">Sub Nerul, Mumbai, India, 123456</p>
                <p className="font-Inter text-[12px] font-medium text-white">Address</p>
              </div>
            </div>
          </div>

          {/* Pages & Download */}
          <div className="mt-6 flex w-full flex-col justify-between text-white sm:flex-row md:mt-0 md:max-w-[341px]">
            <div>
              <p className="text-white font-inter text-[18px] font-medium leading-normal">Pages</p>
              <ul className="mt-4 space-y-3">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/our-tutors" className="hover:underline">News</Link></li>
                <li><Link href="/become-a-tutor" className="hover:underline">Contact</Link></li>
                <li><Link href="/plans-and-pricing" className="hover:underline">Plans and pricing</Link></li>
                <li><Link href="/terms-and-conditions" className="hover:underline">Terms and conditions</Link></li>
                <li><Link href="/privacy-policy" className="hover:underline">Privacy policy</Link></li>
              </ul>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:mt-0">
              <p className="text-white font-inter text-[18px] font-medium">Download the app</p>
              <div className="flex gap-4 sm:flex-col">
                <Link href="https://play.google.com/store" target="_blank"><Image src="/images/google-play.png" width={168} height={50} alt="Google Store" /></Link>
                <Link href="https://www.apple.com/app-store/" target="_blank"><Image src="/images/apple-store.png" width={168} height={50} alt="Apple Store" /></Link>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-[30px] border-white/40" />
        <div className="flex items-center justify-center pb-8 pt-[9px] md:py-8">
          <p className="text-[10px] md:text-[12px] font-normal text-white">
            © 2025 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
