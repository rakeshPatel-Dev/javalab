export const Logo = ({ className = 'h-10 w-auto', ...props }) => (
  <>
    <img
      src="/logo-black.png"
      alt="Logo"
      className={`block dark:hidden ${className}`}
      {...props}
    />
    <img
      src="/logo-white.png"
      alt="Logo"
      className={`hidden dark:block ${className}`}
      {...props}
    />
  </>
);

export default Logo;
