import React from "react";
import {ReactComponent as User} from "./../../image/user.svg";

const Profile = ()=>{
    return (
        <div>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px"


            }}>
                <div>
                    <User style={{width:"160px",height:"160px",borderRadius:"80px"}} />

                </div>
                <div>
                    <h2> Pseudo </h2>
                </div>
            </div>

        </div>
    )
}

export default Profile