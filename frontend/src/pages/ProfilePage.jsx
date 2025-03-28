import { useState, useRef, useEffect } from "react";
import Footer from "../components/Footer";
import bell from "../img/bell.png";
import profile from "../img/profile.png";
import edit from '../img/edit.png';

const ProfilePage = () => {

    const [form, setForm] = useState({
        name: "",
        username: "",
        phone: "",
        location: "",
    });

    const [editing, setEditing] = useState({});
    const [avatar, setAvatar] = useState(profile); // Состояние для аватарки
    const fileInputRef = useRef(null); 

    // Получаем user_id и токен из localStorage или sessionStorage
    const savedUserId = localStorage.getItem("user_id") || sessionStorage.getItem("user_id"); // Извлекаем user_id
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    // Функция для получения данных пользователя
    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/user/${savedUserId}/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                },
            });

            if (!response.ok) throw new Error("Failed to fetch user data");

            const userData = await response.json();
            // Обновляем состояние формы только нужными полями
            setForm({
                name: userData.name,
                username: userData.username,
                phone: userData.phone_number,
                location: userData.location,
            });
            // Устанавливаем аватарку, если она есть
            if (userData.avatar) {
                setAvatar(userData.avatar);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Загружаем данные пользователя при монтировании компонента
    useEffect(() => {
        fetchUserData();
    }, []);

    // Обработчик клика на аватарку
    const handleAvatarClick = () => {
        fileInputRef.current.click(); // Открываем диалог выбора файла
    };

    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      if (!savedUserId) {
          console.error("User ID is missing");
          return;
      }
  
      try {
          const formData = new FormData();
          formData.append("file", file); // API требует "file", а не "avatar"
          console.log(formData)
  
          const response = await fetch(`http://127.0.0.1:8000/user/${savedUserId}/avatar/`, {
              method: "POST",
              headers: {
                  "Authorization": `Bearer ${token}`, // Добавляем токен
              },
              body: formData,
          });
  
          if (!response.ok) throw new Error("Failed to upload avatar");
  
          console.log("Avatar uploaded successfully");
          
          // Загружаем обновленные данные пользователя (включая новую аватарку)
          await fetchUserData();
      } catch (error) {
          console.error("Error uploading avatar:", error);
      }
  };
  
  

    // Обработчик обновления данных пользователя
    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/user/${savedUserId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                },
                body: JSON.stringify({
                    name: form.name,
                    username: form.username,
                    phone_number: form.phone,
                    location: form.location,
                }),
            });

            if (!response.ok) throw new Error("Failed to update user data");

            const updatedData = await response.json();
            console.log("User data updated successfully:", updatedData);
            alert("Profile updated successfully!"); // Уведомление пользователя
        } catch (error) {
            console.error("Error updating user data:", error);
            alert("Failed to update profile. Please try again."); // Уведомление об ошибке
        }
    };

    const handleEdit = (field) => {
        setEditing({ ...editing, [field]: true });
    };

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleBlur = (field) => {
        setEditing({ ...editing, [field]: false });
    };

    return (
        <div className="flex flex-col bg-transparent h-full text-white p-4 max-w-md mx-auto">
            <div className="w-full flex justify-between items-center mb-6 relative mt-16">
                <h1 className="text-[20px] font-black text-center w-full">Ai Ur Crypto.Com</h1>
                <div className="absolute right-0 p-2 bg-gradient-to-r from-[#262833] to-[#091025] rounded-full cursor-pointer">
                    <img src={bell} alt="bell" className="w-[20px] h-[20px]" />
                </div>
            </div>
            <div className="bg-transparent min-h-screen flex flex-col items-center p-6 text-white">
                <h1 className="text-[18px] font-semibold mb-3">Profile</h1>
                <div className="w-24 h-24 mb-6 flex items-center justify-center cursor-pointer" onClick={handleAvatarClick}>
                    <img src={avatar} alt="profile" className="w-full h-full rounded-full object-cover" />
                </div>
                <input
                    type="file"
                    name="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                />
                {Object.keys(form).map((field) => (
                    <div key={field} className="w-full max-w-xs mb-4 text-xs">
                        {editing[field] ? (
                            <input
                                type="text"
                                value={form[field]}
                                onChange={(e) => handleChange(field, e.target.value)}
                                onBlur={() => handleBlur(field)}
                                className="w-full p-2 px-4 rounded bg-transparent outline-none border-[#262833] border-[1px] h-9"
                                autoFocus
                            />
                        ) : (
                            <div
                                className="w-full p-2 px-4 rounded bg-transparent flex justify-between items-center cursor-pointer border-[#262833] border-[1px] h-9"
                                onClick={() => handleEdit(field)}
                            >
                                {form[field]}
                                <span>
                                    <img src={edit} alt="edit" className="h-3 w-3" />
                                </span>
                            </div>
                        )}
                    </div>
                ))}
                <button className="w-[111px] h-8 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-r from-[#4D60FF] to-[#A04DFF] text-white py-3 text-xs font-semibold gap-2" onClick={handleUpdate}>
                    Update
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default ProfilePage;
