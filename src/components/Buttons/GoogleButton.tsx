interface GoogleButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function GoogleButton({
  onClick,
  disabled = false,
  className = ''
}: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <img 
        src="https://developers.google.com/identity/images/g-logo.png" 
        alt="Google" 
        className="w-5 h-5 mr-3"
      />
      Sign in with Google
    </button>
  );
}
