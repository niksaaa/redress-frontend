// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { fetchProfile } from '../api/profile';
// import { fetchUserById, updateUser } from '../api/user';
// import ProfileImage from '../components/ProfileImage';
// import "../styles/edit-profile.css";

// export default function EditProfile() {
//   //   // Отримання даних профілю
//   //   const { data: profileData, isLoading, error } = useQuery({
//   //       queryKey: ['profile'],
//   //       queryFn: fetchProfile,
//   //       staleTime: 1000 * 60 * 5, // Дані будуть "свіжими" 5 хвилин
//   //   });
    
//   //   const { id } = useParams();
//   //   const queryClient = useQueryClient();
//   //   const navigate = useNavigate();

//   //   // Отримання даних користувача
//   // const { data: userData } = useQuery({
//   //   queryKey: ['user', id],
//   //   queryFn: () => fetchUserById(id),
//   // });

//   //   // Локальний стан для форми
//   // const [formData, setFormData] = useState({
//   //   username: userData?.username || '',
//   //   email: userData?.email || '',
//   //   bio: profileData?.bio || '',
//   //   location: profileData?.latitude && profileData?.longitude
//   //     ? 'Харків' // Тут буде логіка перетворення координат
//   //     : '',
//   //   phone: '' // Додайте це поле до вашого DTO якщо потрібно
//   // });
    
//   //   // Оновлення даних
//   // const { mutate: updateUserMutation, isLoading: isUpdating } = useMutation({
//   //   mutationFn: updateUser,
//   //   onSuccess: () => {
//   //     queryClient.invalidateQueries(['user', id]);
//   //     queryClient.invalidateQueries(['profile']);
//   //     navigate('/profile');
//   //   },
//   // });

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData(prev => ({ ...prev, [name]: value }));
//   // };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   updateUserMutation({
//   //     id,
//   //     username: formData.username,
//   //       email: formData.email,
//   //       bio: formData.bio,
//   //       location: formData.location
//   //     // Інші поля, які можна оновити
//   //   });
//   //   };
    
//   //   if (isLoading) return <div className="loading">Завантаження профілю...</div>;
//   //   if (error) return <div className="error">Помилка: {error.message}</div>;
    
//   const location = useLocation();
//   const [profileData, setProfileData] = useState(null);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // Спробуємо отримати дані з location.state
//     if (location.state?.profileData && location.state?.userData) {
//       setProfileData(location.state.profileData);
//       setUserData(location.state.userData);
//     } else {
//       // Якщо немає в location.state, спробуємо з localStorage
//       const savedData = localStorage.getItem('profileEditData');
//       if (savedData) {
//         const { profile, user } = JSON.parse(savedData);
//         setProfileData(profile);
//         setUserData(user);
//       }
//     }
//   }, [location.state]);

//   if (!profileData || !userData) {
//     return <div className="loading">Завантаження даних...</div>;
//   }

  
//     return (
//         <>
//           <link
//             href="https://fonts.googleapis.com/css?family=Inria+Serif&display=swap"
//             rel="stylesheet"
//             />
//             <div className='edit-container'>
//                 <h2 className='header'>Редагування профілю</h2>

//           {/* <form onSubmit={handleSubmit}> */}
//           <form >
//                 <div className="info-sections">
//     <div className="photo-container">
//       <ProfileImage imageUrl={profileData?.profileImage?.url} />
//       <button className="edit-photo-btn">Змінити фото профілю</button>
//     </div>

//     <div className="info-container">
//       <h3 className="section-title">Основна інформація</h3>

//       <div className="input-group">
//         <label htmlFor="username" className="input-label">Нікнейм</label>
//                   <input
//                     id="username" name="username" className="input-field"
//           type="text"
//           value={userData.username}
//           onChange={(e) => setUserData({...userData, username: e.target.value})}
//         />
//       </div>

//       <div className="input-group">
//         <label htmlFor="location" className="input-label">Місцезнаходження</label>
//         <input type="text" id="location" name="location" className="input-field" value={
//   (profileData.latitude && profileData.longitude)
//     ? `${profileData.latitude}, ${profileData.longitude}`
//     : ''
// }
//           onChange={(e) => setProfileData({...profileData, location: e.target.value})}
//                   // onChange={handleChange}
//                   />
//       </div>

//       <div className="input-group">
//         <label htmlFor="bio" className="input-label">Про мене</label>
//                   <textarea
//                     id="bio"
//                     name="bio"
//                     className="input-field textarea-field"
//                     maxLength="200"
//           value={profileData.bio || ''}
//           onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
//         />
//       </div>
//     </div>

//     <div className="info-container">
//       <h3 className="section-title">Прихована інформація</h3>

//       <div className="input-group">
//         <label htmlFor="phone" className="input-label">Номер телефону</label>
//         <input
//           type="tel" id="phone" name="phone" className="input-field"
//           value={userData.phoneNumber}
//           onChange={(e) => setUserData({...userData, phoneNumber: e.target.value})}
//         />
//       </div>

//       <div className="input-group">
//         <label htmlFor="email" className="input-label">Email</label>
//         <input
//           type="email" id="email" name="email" className="input-field"
//           value={userData.email}
//           onChange={(e) => setUserData({...userData, email: e.target.value})}
//         />
//       </div>
//     </div>
//                 </div>
                
//                 <div className='btn-wrapper'>
//                     {/* <button className="save-btn" onClick={() => navigate("/profile")}>
//               Зберегти
//                     </button> */}
//                         <button
//             type="submit"
//             className="save-btn"
//             //disabled={isUpdating}
//           >
//                 {/* {isUpdating ? 'Збереження...' : 'Зберегти'} */}
//                 Зберегти
//               </button>
              
//               <span
//   style={{
//     textDecoration: 'underline',
//     cursor: 'pointer',
//     color: '#000'
//   }}
//   onClick={() => window.history.back()}
// >
//   Повернутися
// </span>
//                 </div>
//                 </form>
                
//             </div>
            
//             </>
//     )
// }


import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ProfileImage from '../components/ProfileImage';
import { updateUser } from '../api/user';
import { updateProfile, uploadProfileImage } from '../api/profile';
import "../styles/edit-profile.css";

export default function EditProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [profileData, setProfileData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (location.state?.profileData && location.state?.userData) {
      setProfileData(location.state.profileData);
      setUserData(location.state.userData);
    } else {
      const savedData = localStorage.getItem('profileEditData');
      if (savedData) {
        const { profile, user } = JSON.parse(savedData);
        setProfileData(profile);
        setUserData(user);
      }
    }
  }, [location.state]);

  // Мутації для оновлення даних
  const { mutate: updateProfileMutation, isLoading: isUpdatingProfile } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
    }
  });

  const { mutate: updateUserMutation, isLoading: isUpdatingUser } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    }
  });

  const { mutate: uploadImageMutation, isLoading: isUploadingImage } = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      alert('Зображення успішно оновлено!');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Оновлення профілю
      if (profileData) {
        const profileUpdateDto = {
          Bio: profileData.bio,
          Latitude: profileData.latitude,
          Longitude: profileData.longitude,
          // Інші поля залишаємо як є
          Balance: profileData.balance,
          RatingCount: profileData.ratingCount,
          RatingStatus: profileData.ratingStatus,
          AverageRating: profileData.averageRating
        };
        
        updateProfileMutation({
          id: profileData.Id,
          updateDto: profileUpdateDto
        });
      }

      // Оновлення користувача
      if (userData) {
        const userUpdateDto = {
          Username: userData.username,
          Email: userData.email,
          PhoneNumber: userData.phoneNumber,
          PasswordHash: userData.passwordHash // Залишаємо оригінальний хеш
        };
        
        updateUserMutation({
          id: userData.id,
          updateDto: userUpdateDto
        });
      }

      // Завантаження зображення (якщо воно було вибране)
      if (selectedImage && profileData?.Id) {
        uploadImageMutation({
          image: selectedImage,
          profileId: profileData.Id
        });
      }

      // Оновлення localStorage
      localStorage.setItem('profileEditData', JSON.stringify({
        profile: profileData,
        user: userData
      }));

      alert('Дані успішно оновлено!');
      navigate('/profile');
    } catch (error) {
      console.error('Помилка при оновленні:', error);
      alert('Сталася помилка при оновленні даних');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      // Оновити прев'ю зображення
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: { ...prev.profileImage, url: event.target.result }
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (!profileData || !userData) {
    return <div className="loading">Завантаження даних...</div>;
  }

  const isLoading = isUpdatingProfile || isUpdatingUser || isUploadingImage;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Inria+Serif&display=swap"
        rel="stylesheet"
      />
      <div className='edit-container'>
        <h2 className='header'>Редагування профілю</h2>

        <form onSubmit={handleSubmit}>
          <div className="info-sections">
            <div className="photo-container">
              <ProfileImage imageUrl={profileData?.profileImage?.url} />
              <input
                type="file"
                id="profile-image-upload"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <label htmlFor="profile-image-upload" className="edit-photo-btn">
                Змінити фото профілю
              </label>
            </div>

            <div className="info-container">
              <h3 className="section-title">Основна інформація</h3>

              <div className="input-group">
                <label htmlFor="username" className="input-label">Нікнейм</label>
                <input
                  id="username"
                  name="username"
                  className="input-field"
                  type="text"
                  value={userData.username || ''}
                  onChange={(e) => setUserData({...userData, username: e.target.value})}
                />
              </div>

              <div className="input-group">
                <label htmlFor="location" className="input-label">Місцезнаходження</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="input-field"
                  value={
                    (profileData.latitude && profileData.longitude)
                      ? `${profileData.latitude}, ${profileData.longitude}`
                      : ''
                  }
                  onChange={(e) => {
                    const [lat, lng] = e.target.value.split(',').map(coord => parseFloat(coord.trim()));
                    setProfileData({
                      ...profileData,
                      latitude: isNaN(lat) ? null : lat,
                      longitude: isNaN(lng) ? null : lng
                    });
                  }}
                />
              </div>

              <div className="input-group">
                <label htmlFor="bio" className="input-label">Про мене</label>
                <textarea
                  id="bio"
                  name="bio"
                  className="input-field textarea-field"
                  maxLength="200"
                  value={profileData.bio || ''}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                />
              </div>
            </div>

            <div className="info-container">
              <h3 className="section-title">Прихована інформація</h3>

              <div className="input-group">
                <label htmlFor="phone" className="input-label">Номер телефону</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="input-field"
                  value={userData.phoneNumber || ''}
                  onChange={(e) => setUserData({...userData, phoneNumber: e.target.value})}
                />
              </div>

              <div className="input-group">
                <label htmlFor="email" className="input-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field"
                  value={userData.email || ''}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                />
              </div>
            </div>
          </div>
          
          <div className='btn-wrapper'>
            <button
              type="submit"
              className="save-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Збереження...' : 'Зберегти'}
            </button>
            
            <span
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
                color: '#000'
              }}
              onClick={() => navigate(-1)}
            >
              Повернутися
            </span>
          </div>
        </form>
      </div>
    </>
  );
}