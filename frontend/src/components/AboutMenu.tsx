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
                                <div className="h-full dark:text-white text-black">
                                    <h1 className="text-2xl font-semibold dark:text-white text-black pb-3">
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
                                        className="hover:dark:text-dustyRose-200 hover:text-dustyRose-800 hover:underline dark:text-white text-black"
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
                                <div className="h-full dark:text-white text-black">
                                    <h1 className="text-2xl font-semibold dark:text-white text-black pb-3">
                                        Our Story
                                    </h1>
                                    <p className="pb-3">
                                        Hi, I'm Sam. In 2024, I made a big
                                        change -- I traded loud nights in New
                                        York City for quiet mornings in the
                                        Sierra Nevada wilderness when I moved to
                                        South Lake Tahoe with my wife. I quickly
                                        fell in love with running on the trails
                                        around Lake Tahoe. And, I soon wanted to
                                        sign up for a race.
                                    </p>
                                    <p className="pb-3">
                                        To my disappointment, the experience of
                                        finding a race was frustrating: slow
                                        webpages, pop-up ads galore, poor user
                                        interfaces. Finding a race should be the
                                        easy part. I decided I would build the
                                        tool I wanted: fast, sophisticated, and
                                        most importantly, easy to use.
                                    </p>
                                    <p>
                                        What started as a personal project to
                                        learn web development turned into
                                        RunEmu. I hope RunEmu makes finding your
                                        next challenge a breeze, whether it's
                                        your first 5k or your next ultra.
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
                                <div className="h-full dark:text-white text-black">
                                    <h1 className="text-2xl font-semibold dark:text-white text-black pb-3">
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
                                <div className="h-full dark:text-white text-black">
                                    <h1 className="text-2xl font-semibold dark:text-white text-black pb-3">
                                        Partner with RunEmu
                                    </h1>
                                    <p className="pb-3">
                                        Interested in partnering with RunEmu to
                                        reach runners all over the world
                                        searching for their next race? Reach out
                                        to{" "}
                                    </p>
                                    <address className="pb-3">
                                        <span className="font-mono">
                                            sam@runemu.com
                                        </span>
                                    </address>{" "}
                                    <p className="pb-3">to learn more.</p>
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
