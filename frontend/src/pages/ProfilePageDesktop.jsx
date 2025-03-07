import Navbar from "../components/Navbar";
import Aside from '../components/Aside'
import React from "react";
import { useState } from "react";
import profile from "../img/profile.png";
import edit from '../img/edit.png';
import bg from "../img/profilebg.png";

const ProfilePageDesktop = () => {
    const [form, setForm] = useState({
        name: "Name",
        username: "Username",
        phone: "Phone",
        location: "Location",
    });

    const [editing, setEditing] = useState({});

    const handleEdit = (field) => {
        setEditing({ ...editing, [field]: true });
    };

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleBlur = (field) => {
        setEditing({ ...editing, [field]: false });
    };

    const handleSubmit = () => {
        console.log("Updated Data:", form);
    };
    return(
        <div className="flex flex-col bg-[#07051B]">
            <div>
                <Navbar />
            </div>
            <div className="flex flex-row items-center justify-center">
                <Aside />
                <div className=" w-full text-white flex flex-col items-center justify-center rounded-none">
            <div className="w-2/3 h-[600px] bg-transparent flex flex-col items-center text-white rounded-none justify-center relative"
    
                                      style={{
                                          backgroundImage: `url(${bg})`,
                                          backgroundSize: "100% 100%", // Растягивает картинку в блок
                                          backgroundRepeat: "no-repeat",
                                          backgroundPosition: "center",
                                        
                                      }}>
                <h1 className="text-[30px] font-semibold mb-3">Profile</h1>
                <div className="w-[120px] h-[120px] mb-6 flex items-center justify-center">
                    <img src={profile} alt="profile" />
                </div>

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
                            onClick={handleSubmit}
                            className="w-[220px] h-[80px] absolute bottom-0 right-16 rounded-t-2xl mx-auto flex items-center justify-center bg-gradient-to-r from-[#4D60FF] to-[#A04DFF] text-white py-3 font-medium gap-2 text-[25px]"
                          >
                            Update
                          </button>
            </div>
            </div>
        </div>
    </div>
    )
}

export default ProfilePageDesktop;