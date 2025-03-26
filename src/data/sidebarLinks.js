import { IoHome } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import { MdContactSupport } from "react-icons/md";

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
        icon: MdContactSupport
    },
    {
        name: "Settings",
        path: "/dashboard/settings",
        icon: MdOutlineSettings
    }
]