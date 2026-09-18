import { useLanguage } from "../i18n/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex overflow-hidden rounded-full border border-void-600 text-sm">
      {(["th", "en"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={`cursor-pointer px-3 py-1.5 transition-colors duration-200 ${
            language === lang ? "bg-gold-400 text-void-950" : "text-starlight-300 hover:text-starlight-50"
          }`}
        >
          {lang === "th" ? "ไทย" : "EN"}
        </button>
      ))}
    </div>
  );
}
