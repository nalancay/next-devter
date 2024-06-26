type AvatarProps = {
  alt?: string;
  src: string;
  text?: string;
};

export const Avatar: React.FC<AvatarProps> = ({ alt, src, text }) => {
  return (
    <div className="flex items-center">
      <img
        className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover"
        alt={alt}
        src={src}
        title={alt}
      />
      {text && (
        <strong className="ml-2 text-sm sm:text-base">
          {text.length > 10 ? `${text.slice(0, 10)}...` : text}
        </strong>
      )}
    </div>
  );
};
