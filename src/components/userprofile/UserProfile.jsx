import React, { useEffect, useState } from "react";
import UserProfileForm from "./UserProfileForm";
import UserApi from "../../api/UserApi";

function UserProfile() {
  const [user, setUser] = useState([]);

  const getUser = () => {
    UserApi.getLoggedInUser().then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  function updatedAddress(address) {
       console.log(address);

    UserApi.updateAddress(address)
      .then((res) => {
        alert("Address Updated");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  function updatedPhoneno(phoneno) {
    console.log("Phoneno",phoneno);

    UserApi.updatePhoneno(phoneno)
      .then((res) => {
        alert("Phoneno Updated");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  function updatedPic(image) {
    console.log(image);
    UserApi.updateProfilepic(image)
      .then((res) => {
        alert("Profile picture Updated");
        console.log("RESPONSE",res);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <UserProfileForm
        user={user}
        onUpdateClick={updatedAddress}
        onUpdatePhoneClick={updatedPhoneno}
        onUpdatePicClick={updatedPic}
      />
    </div>
  );
}
export default UserProfile;
