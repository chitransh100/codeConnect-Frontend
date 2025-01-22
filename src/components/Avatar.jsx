import { fallback } from "../constant";

const Avatar=({user})=>{
    return <>

{/* {<div className="hero bg-base-300 ">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src={user.photoURL||fallback}
      className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Hello, {user.firstName}! 👋</h1>
      <p className="py-6">
        {user.about}
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>} */}

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