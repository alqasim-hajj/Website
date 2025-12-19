import { useConfig } from "@/contexts/ConfigContext";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  textClassName?: string;
}

const Logo = ({
  className = "",
  showTagline = true,
  size = "md",
  onClick,
  href,
  textClassName
}: LogoProps) => {
  const config = useConfig();

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-14 h-14 lg:w-20 lg:h-20",
    lg: "w-24 h-24",
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const Component = href ? "a" : "div";

  const logo = config.general?.logo;

  return (
    <Component
      href={href}
      onClick={handleClick}
      className={`flex items-center gap-3 lg:gap-4 ${href ? "cursor-pointer" : ""} ${className}`}
    >
      {logo?.image && (
        <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center overflow-hidden shadow-sm border border-emerald/10 bg-white/5`}>
          <img
            src={logo.image}
            alt={`${logo.text} Logo`}
            className="w-full h-full object-contain p-1"
          />
        </div>
      )}

      <div className="flex flex-col leading-none">
        <span className={`font-serif text-xl lg:text-3xl font-bold bg-gradient-to-r from-gold-dark via-gold to-gold-dark bg-clip-text text-transparent drop-shadow-sm ${textClassName || ""}`}>
          {logo?.text}
        </span>

        {showTagline && (
          <span className={`text-[10px] lg:text-xs tracking-[0.2em] uppercase text-emerald-dark/80 font-medium ${textClassName || ""}`}>
            {logo?.subText}
          </span>
        )}
      </div>
    </Component>
  );
};

export default Logo;
