import React from "react";
import Header  from './../header/header';
import Profile  from './../profile/profile';

const Home = ()=>{
    return (
        <div>
            <div>
                <Header/>
            </div>    
            <div>
                <Profile/>
            </div>
        </div>
    )
}

export default Home