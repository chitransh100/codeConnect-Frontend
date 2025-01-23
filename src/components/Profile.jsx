import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import BioData from "./BioData";

const Profile = () => {
  const user = useSelector((store) => store.user);
  // console.log(user);
  // const { firstName, lastName, age, photoURL, sex, skills, about } = user;
  return (
    <>
      {user && (<div>
        <BioData user={user}></BioData>
      </div>)}
    </>
  );
};

export default Profile;
