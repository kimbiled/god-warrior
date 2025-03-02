import { useState } from "react";
import Footer from "../components/Footer";
import bell from "../img/bell.png";
import profile from "../img/profile.png";
import edit from '../img/edit.png'
const ProfilePage = () => {

    const [form, setForm] = useState({
        name: "Name",
        username: "Username",
        phone: "Phone",
        password: "******",
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

    return (
         <div className="flex flex-col bg-transparent h-full text-white p-4 max-w-md mx-auto">
              <div className="w-full flex justify-between items-center mb-6 relative mt-16">
                <h1 className="text-[20px] font-black text-center w-full">Ai Ur Crypto.Com</h1>
                <div className="absolute right-0 p-2 bg-gradient-to-r from-[#262833] to-[#091025] rounded-full cursor-pointer">
                  <img src={bell} alt="bell" className="w-[20px] h-[20px]" />
                </div>
              </div>
              <div className="bg-black min-h-screen flex flex-col items-center p-6 text-white">
      <h1 className="text-[18px] font-semibold mb-3">Profile</h1>
      <div className="w-24 h-24  mb-6 flex items-center justify-center">
        <img src={profile} alt="profile" />
      </div>

      {Object.keys(form).map((field) => (
        <div key={field} className="w-full max-w-xs mb-4 text-xs">
          {editing[field] ? (
            <input
              type={field === "password" ? "password" : "text"}
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
                <img src={edit} alt="edit" className="h-3 w-3"/>
              </span>
            </div>
          )}
        </div>
      ))}

<button className="w-[111px] h-8 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-r from-[#4D60FF] to-[#A04DFF] text-white py-3 text-xs font-semibold gap-2"
onClick={handleSubmit}>
         Update
        </button>
    </div>
    <Footer />
        </div>
    )
}
export default ProfilePage;