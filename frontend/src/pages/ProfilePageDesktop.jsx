import Navbar from "../components/Navbar";
import Aside from '../components/Aside';
import React, { useState, useEffect, useRef } from "react";
import profile from "../img/profile.png";
import edit from '../img/edit.png';
import bg from "../img/profilebg.png";

const ProfilePageDesktop = () => {
    const [form, setForm] = useState({
        name: "",
        username: "",
        phone: "",
        location: "",
    });

    const [editing, setEditing] = useState({});
    const [avatar, setAvatar] = useState(profile); // Состояние для аватарки
    const fileInputRef = useRef(null); // Реф для input type="file"

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

    // Обработчик выбора файла
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append("avatar", file);

                const response = await fetch(`http://127.0.0.1:8000/user/${savedUserId}/avatar/`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
                    },
                    body: formData,
                });

                if (!response.ok) throw new Error("Failed to upload avatar");

                const result = await response.json();
                setAvatar(result.avatar); // Обновляем аватарку в состоянии
                console.log("Avatar uploaded successfully:", result);
            } catch (error) {
                console.error("Error uploading avatar:", error);
            }
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
        <div className="flex flex-col bg-[#07051B]">
            <div>
                <Navbar />
            </div>
            <div className="flex flex-row items-center justify-center">
                <Aside />
                <div className="w-full text-white flex flex-col items-center justify-center rounded-none">
                    <div
                        className="w-2/3 h-[600px] bg-transparent flex flex-col items-center text-white rounded-none justify-center relative"
                        style={{
                            backgroundImage: `url(${bg})`,
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                        }}
                    >
                        <h1 className="text-[30px] font-semibold mb-3">Profile</h1>
                        <div
                            className="w-[120px] h-[120px] mb-6 flex items-center justify-center cursor-pointer"
                            onClick={handleAvatarClick}
                        >
                            <img src={avatar} alt="profile" className="w-full h-full rounded-full object-cover" />
                        </div>
                        {/* Скрытый input для выбора файла */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            accept="image/*" // Разрешаем только изображения
                        />

                        <div className="grid grid-cols-2 gap-6 mx-auto justify-center">
                            {Object.keys(form).map((field) => (
                                <div key={field} className="w-[480px] h-[64px] text-[21px]">
                                    {editing[field] ? (
                                        <input
                                            type="text"
                                            value={form[field]}
                                            onChange={(e) => handleChange(field, e.target.value)}
                                            onBlur={() => handleBlur(field)}
                                            className="w-full h-full p-4 rounded bg-transparent outline-none border-[#262833] border-[1px]"
                                            autoFocus
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full p-4 rounded bg-transparent flex justify-between items-center cursor-pointer border-[#262833] border-[1px]"
                                            onClick={() => handleEdit(field)}
                                        >
                                            {form[field]}
                                            <span>
                                                <img src={edit} alt="edit" className="h-4 w-4" />
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleUpdate}
                            className="w-[220px] h-[80px] absolute bottom-0 right-16 rounded-t-2xl mx-auto flex items-center justify-center bg-gradient-to-r from-[#4D60FF] to-[#A04DFF] text-white py-3 font-medium gap-2 text-[25px]"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePageDesktop;