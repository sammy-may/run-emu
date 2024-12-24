import { FaBookOpen, FaHandshake, FaMedal } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoRocket } from "react-icons/io5";
import FullMenu from "./Menu/FullMenu";

const AboutMenu = () => {
    return (
        <FullMenu
            cats={[
                {
                    title: "General",
                    buttons: [
                        {
                            icon: <FaMedal />,
                            text: "Mission",
                            content: (
                                <div>
                                    Hi, I'm Sam. I started RunEmu in 2024.
                                </div>
                            ),
                        },
                        {
                            icon: <FaBookOpen />,
                            text: "Our story",
                            content: <div>Here is our story.</div>,
                        },
                        {
                            icon: <CgProfile />,
                            text: "Team",
                            content: (
                                <div>
                                    It's me and Cletus and Penelope and my dear
                                    wiff.
                                </div>
                            ),
                        },
                    ],
                },
                {
                    title: "Race Organizers",
                    buttons: [
                        {
                            icon: <IoRocket />,
                            text: "Promote your events",
                            content: <div>Make lotsa money with RunEmu!</div>,
                        },
                    ],
                },
                {
                    title: "Advertisers & Sponsors",
                    buttons: [
                        {
                            icon: <FaHandshake />,
                            text: "Parter with RunEmu",
                            content: <div>Make lotsa ad revenue together!</div>,
                        },
                    ],
                },
            ]}
        />
        /*                     cats={[
                        <MenuCategory
                            title={"General"}
                            buttons={[
                                <MenuButton
                                    icon={<FaMedal />}
                                    text={"Mission"}
                                />,
                                <MenuButton
                                    icon={<FaBookOpen />}
                                    text={"Our story"}
                                />,
                                <MenuButton
                                    icon={<CgProfile />}
                                    text={"Team"}
                                />,
                            ]}
                        />,
                        <MenuCategory
                            title={"Race Organizers"}
                            buttons={[
                                <MenuButton
                                    icon={<IoRocket />}
                                    text={"Promote your events"}
                                />,
                            ]}
                        />,
                        <MenuCategory
                            title={"Advertisers & Sponsors"}
                            buttons={[
                                <MenuButton
                                    icon={<FaHandshake />}
                                    text={"Partner with RunEmu"}
                                />,
                            ]}
                        />,
                    ]} */
    );
};

export default AboutMenu;
