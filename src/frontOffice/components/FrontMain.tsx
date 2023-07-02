import Header from "@app/modules/main/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

import "/public/assets/css/style.css"




const FrontMain = () => {

    return(
        <>
            <Outlet></Outlet>
            <Footer/>
        </>
    )

}



export default FrontMain;