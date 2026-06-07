import { RiInstagramLine } from "react-icons/ri";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            {t('footer', 'copyright')}
          </p>

          <a
            href="https://www.instagram.com/fitcity.rak?igsh=MWZnajNxdWo2dGwycw=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 text-xs hover:text-red-500 transition-colors duration-300 group"
          >
            <RiInstagramLine className="text-base group-hover:text-red-500 transition-colors duration-300" />
            @fitcity.rak
          </a>

          <p className="text-gray-500 text-xs">
            {t('footer', 'privacy')}
          </p>
        </div>
      </div>
    </footer>
  );
}
