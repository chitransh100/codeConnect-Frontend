import { fallback } from "../constant";
import React from "react";

const ConnectionCard=({connections})=>{
    return<>
    <tr >
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={connections?.photoURL||fallback}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{connections?.firstName} {connections?.lastName}</div>
                  <div className="text-sm opacity-50">{connections?.sex} | {connections?.age}</div>
                </div>
              </div>
            </td>
            <td>
            {connections?.skills.map((element, index) => (
                //A React.Fragment is a special component in React that allows you to group multiple elements without adding extra nodes to the DOM. It is often used to avoid unnecessary wrapping elements like <div> or <span> in your code when you want to return multiple children from a component.
          <React.Fragment key={index}>
            <span className="badge badge-ghost badge-sm">{element}</span>
            {(index + 1) % 3 === 0 && <br />} {/* Add a line break after every 3 skills */}
          </React.Fragment>
        ))}
              <br />
              
            </td>
            <td><button className="btn btn-ghost btn-xs">Details</button></td>
          </tr>
        </>
}

export default ConnectionCard;