interface AvatarProps {
  avatarUrl: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatarUrl }: AvatarProps) => {
  return (
    <div className="avatar">
      <img src={avatarUrl} alt="User Avatar" />
    </div>
  );
};

export default Avatar;
