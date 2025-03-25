import { IoHome } from "react-icons/io5";
import { PiStudentDuotone } from "react-icons/pi";
import { BsCashCoin } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";

export const sideBarLinks = [
    {
        name: "Home",
        path: "/dashboard/",
        icon: IoHome
    },
    // {
    //     name: "Tasks",
    //     path: "/dashboard/tasks",
    //     icon: PiStudentDuotone
    // },
    {
        name: "Fee Details",
        path: "/dashboard/fees",
        icon: BsCashCoin
    },
    {
        name: "Queries",
        path: "/dashboard/queries",
        icon: BsCashCoin
    },
    {
        name: "Settings",
        path: "/dashboard/settings",
        icon: BsCashCoin
    },
    // {
    //     name: "Logout"
    // }
]