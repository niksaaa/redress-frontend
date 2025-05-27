import defaultProfileImage from '../images/profileImage.png';

const ProfileImage = ({ imageUrl }) => {
    return (
        <img
          src={imageUrl || defaultProfileImage}
          alt="Фото профілю"
          className="profile-image"
        />
      );
};

export default ProfileImage;