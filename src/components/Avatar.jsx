import { fallback } from "../constant";

const Avatar=({user})=>{
    return <>
    {user&&<div className="flex flex-row items-center">
        <div className="avatar mx-9 my-9">
          <div className="w-28 rounded-lg">
            <img src={user.photourl || fallback} />
          </div>
        </div>
        <div className="text-center items-center ">
          <h1 className="text-4xl font-bold text-gradient bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Hello, {user.name}! 👋
          </h1>
        </div>
      </div>}

    </>
}

export default Avatar