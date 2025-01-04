import { FaBookOpen, FaHandshake, FaMedal } from "react-icons/fa";
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
                                <div className="h-full">
                                    <h1 className="text-2xl font-semibold text-white pb-3">
                                        Our Mission
                                    </h1>
                                    <p className="pb-3">
                                        Our mission is to help you run more.
                                        Using our simple and intuitive race
                                        explorer, you'll find your ideal next
                                        race with ease.
                                    </p>
                                    <a
                                        href="/"
                                        className="hover:text-dustyRose-200 hover:underline text-white"
                                    >
                                        <h2 className="text-lg font-semibold pb-3">
                                            Race Explorer
                                        </h2>
                                    </a>
                                    <p className="pb-3">
                                        The RunEmu database contains thousands
                                        of races all around the world. Our race
                                        exploration tool makes it easy to find
                                        the exact one for you. To our knowledge,
                                        we provide{" "}
                                        <strong>
                                            the only race directory that allows
                                            users to view and filter by typical
                                            weather conditions
                                        </strong>{" "}
                                        for each race.
                                    </p>
                                </div>
                            ),
                        },
                        {
                            icon: <FaBookOpen />,
                            text: "Story",
                            content: (
                                <div className="h-full">
                                    <h1 className="text-2xl font-semibold text-white pb-3">
                                        Our Story
                                    </h1>
                                    <p className="pb-3">
                                        Hi, I'm Sam. In 2024, I quit my job in
                                        quantitative finance in New York City
                                        and moved to South Lake Tahoe with my
                                        wife. I fell in love with trail running
                                        around Tahoe and soon wanted to sign up
                                        for a race.
                                    </p>
                                    <p className="pb-3">
                                        However, I found the experience of
                                        finding a race frustrating: directories
                                        with poorly designed user interfaces,
                                        pop-up ads, and slow response times.
                                    </p>
                                </div>
                            ),
                        },
                        /*                         {
                            icon: <CgProfile />,
                            text: "Team",
                            content: (
                                <div className="h-full">
                                    It's me and Cletus and Penelope and my dear
                                    wiff.
                                </div>
                            ),
                        }, */
                    ],
                },
                {
                    title: "Race Organizers",
                    buttons: [
                        {
                            icon: <IoRocket />,
                            text: "Promote",
                            content: (
                                <div className="h-full">
                                    <h1 className="text-2xl font-semibold text-white pb-3">
                                        Promote your races
                                    </h1>
                                    <p className="pb-3">
                                        Are you a race organizer looking to
                                        attract more runners to your next event?
                                        Check back soon to create a free RunEmu
                                        account to claim your existing events,
                                        add new events, and more.
                                    </p>
                                </div>
                            ),
                        },
                    ],
                },
                {
                    title: "Sponsors",
                    buttons: [
                        {
                            icon: <FaHandshake />,
                            text: "Partner",
                            content: (
                                <div className="h-full">
                                    <h1 className="text-2xl font-semibold text-white pb-3">
                                        Partner with RunEmu
                                    </h1>
                                    <p className="pb-3">
                                        Interested in partnering with RunEmu?
                                        Reach out to{" "}
                                        <span className="font-mono">
                                            sam@runemu.com
                                        </span>{" "}
                                        to learn how you can reach runners all
                                        over the world.
                                    </p>
                                </div>
                            ),
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
