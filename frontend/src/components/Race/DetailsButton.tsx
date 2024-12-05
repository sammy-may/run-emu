import { Link } from "react-router-dom";
import RaceType from "../../types/race";
import { FaExpandAlt } from "react-icons/fa";

const DetailsButton = ({ race }: { race: RaceType }) => {
    return (
        <Link to={`races/${race.name_url}`}>
            <div className="w-full flex px-3 items-center">
                <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                    <div>More details</div>
                    <div>
                        <FaExpandAlt />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default DetailsButton;
