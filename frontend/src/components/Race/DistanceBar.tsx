import { PiPathBold } from "react-icons/pi";
import DistanceBadge from "../DistanceBadge";
import RaceType from "../../types/race";

const DistanceBar = ({ race }: { race: RaceType }) => {
    return (
        <div className="px-3 font-normal text-gray-400 flex items-center space-x-3 overflow-scroll w-full">
            <div>
                <PiPathBold />
            </div>
            <div className="flex items-center">
                {race.distances["data"].length > 0 ? (
                    race.distances["data"].map((dist, index) => (
                        <DistanceBadge
                            key={"mainbadge" + String(index) + race.name}
                            title={dist.name}
                            active={dist.match ?? true}
                        />
                    ))
                ) : (
                    <>None</>
                )}
            </div>
        </div>
    );
};

export default DistanceBar;
