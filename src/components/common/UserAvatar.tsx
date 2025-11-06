interface UserAvatarProps {
  name?: string;
  email?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  name = "User",
  size = "md",
  className = "",
}) => {
  // Get initials from name
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Generate a consistent color based on name
  const getColorFromName = (name: string) => {
    const colors = [
      "bg-brand-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-success-500",
      "bg-warning-500",
      "bg-orange-500",
    ];

    const hash = name.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return colors[Math.abs(hash) % colors.length];
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-2xl",
  };

  const initials = getInitials(name);
  const bgColor = getColorFromName(name);

  return (
    <div
      className={`${sizeClasses[size]} ${bgColor} ${className} flex items-center justify-center rounded-full font-semibold text-white`}
    >
      {initials}
    </div>
  );
};

export default UserAvatar;
