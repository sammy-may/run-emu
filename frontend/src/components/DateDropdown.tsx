import { useCallback, useContext, useEffect, useState } from "react";
import { RaceContext } from "../context/RaceFeedContext";
import { FaRegCalendarAlt } from "react-icons/fa";
import ActionButton from "./ActionButton";

interface PeriodType {
    name: string;
    duration: number;
}

const DateDropdown = () => {
    const {
        state: { dateMin, dateMax, dateMenuOpen },
        updateDateMin,
        updateDateMax,
        toggleDateMenu,
        closeDateMenu,
        clearDates,
    } = useContext(RaceContext);

    const [activeButton, setActiveButton] = useState<number>(-1);
    const periods: PeriodType[] = [
        { name: "Next week", duration: 7 },
        { name: "Next month", duration: 30 },
        { name: "Next 3 months", duration: 90 },
    ];

    useEffect(() => {
        if (dateMin === null || dateMax === null) {
            setActiveButton(-1);
            return;
        }
        const timeDiff = dateMax.getTime() - dateMin.getTime();
        const dayDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));
        periods.forEach((period, index) => {
            if (dayDiff === period.duration) {
                setActiveButton(index);
                return;
            }
        });
    }, [dateMin, dateMax]);

    const handleClick = useCallback((period: PeriodType, index: number) => {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + period.duration);

        updateDateMin(startDate.toISOString());
        updateDateMax(endDate.toISOString());
        setActiveButton(index);
    }, []);

    return (
        <div className="relative pr-2 py-1">
            <div>
                <ActionButton
                    content={
                        <>
                            <div>
                                <FaRegCalendarAlt />
                            </div>
                            <p className="max-w-0 absolute -top-96 md:max-w-36 md:relative md:top-0 lg:max-w-0 lg:absolute lg:-top-96 xl:max-w-36 xl:relative xl:top-0">
                                Date
                            </p>
                        </>
                    }
                    dropdown={true}
                    onClick={toggleDateMenu}
                />
                {dateMenuOpen && (
                    <div className="absolute flex flex-col z-50 rounded-lg dark:bg-gray-700 bg-gray-300 border dark:border-dustyRose-500 border-dustyRose-500 py-3 px-3 space-y-3 max-w-80 min-w-80 -left-16 sm:left-0 sm:max-w-80 sm:min-w-80">
                        <div className="pt-2 text-sm font-light dark:text-gray-300 text-gray-700">
                            Select a period:
                        </div>
                        <div className="flex flex-wrap items-center place-content-center rounded-full">
                            {periods.map((period, index) => (
                                <button
                                    onClick={() => {
                                        handleClick(period, index);
                                    }}
                                    className={
                                        index === activeButton
                                            ? `text-xs font-semibold px-2 py-0.5 m-1 rounded-full dark:bg-periwinkleBlue-700 bg-periwinkleBlue-300 dark:text-periwinkleBlue-50 text-periwinkleBlue-900 border dark:border-periwinkleBlue-500 border-periwinkleBlue-500 dark:hover:bg-periwinkleBlue-600 dark:hover:border-periwinkleBlue-400 hover:bg-periwinkleBlue-400 hover:border-periwinkleBlue-600`
                                            : `text-xs font-semibold px-2 py-0.5 m-1 rounded-full dark:bg-gray-700 bg-gray-300 dark:text-gray-50 text-gray-900 border dark:border-gray-500 border-gray-500 dark:hover:bg-periwinkleBlue-600 dark:hover:border-periwinkleBlue-400 hover:bg-periwinkleBlue-400 hover:border-periwinkleBlue-600`
                                    }
                                    key={"period_button" + index}
                                >
                                    {period.name}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <hr className="px-6 border dark:border-gray-500 border-gray-500 w-full" />
                            <div className="rounded-full dark:border-gray-500 border-gray-500 px-2 dark:text-gray-400 text-gray-600 text-sm font-semibold border-2">
                                OR
                            </div>
                            <hr className="px-6 border dark:border-gray-500 border-gray-500 w-full" />
                        </div>
                        <div className="pt-2 text-sm font-light dark:text-gray-300 text-gray-700">
                            Select a range:
                        </div>
                        <form
                            className="flex flex-wrap items-center place-content-between"
                            action="#"
                            onSubmit={(evt) => evt.preventDefault()}
                        >
                            <div className="flex-col items-start pt-2">
                                <label
                                    htmlFor="min_date"
                                    className="text-black dark:text-white font-medium text-sm mb-2 block text-left px-1"
                                >
                                    From
                                </label>
                                <input
                                    type="date"
                                    name="min_date"
                                    id="min_date"
                                    placeholder="No Min"
                                    data-dropdown-toggle="dropdownInfoMin"
                                    className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black dark:text-white dark:placeholder-gray-400 placeholder-gray-600 dark:border-gray-600 border-gray-400 dark:bg-gray-800 bg-gray-200 p-2.5 w-full block"
                                    value={
                                        dateMin === null
                                            ? ""
                                            : dateMin.toISOString().slice(0, 10)
                                    }
                                    onChange={updateDateMin}
                                />
                            </div>
                            <div className="flex-col items-start pt-2">
                                <label
                                    htmlFor="max_date"
                                    className="text-black dark:text-white font-medium text-sm mb-2 block text-left px-1"
                                >
                                    To
                                </label>
                                <input
                                    type="date"
                                    name="max_date"
                                    id="max_date"
                                    placeholder="No Max"
                                    data-dropdown-toggle="dropdownInfoMax"
                                    className="border text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-black dark:text-white dark:placeholder-gray-400 placeholder-gray-600 dark:border-gray-600 border-gray-400 dark:bg-gray-800 bg-gray-200 p-2.5 w-full block"
                                    value={
                                        dateMax === null
                                            ? ""
                                            : dateMax.toISOString().slice(0, 10)
                                    }
                                    onChange={updateDateMax}
                                />
                            </div>
                        </form>
                        <div className="place-content-end flex items-center w-full space-x-3">
                            <button
                                onClick={() => {
                                    clearDates();
                                    setActiveButton(-1);
                                }}
                                className="flex whitespace-nowrap space-x-2 text-black dark:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center dark:bg-dustyRose-600 hover:bg-dustyRose-400 border dark:border-dustyRose-500 border-dustyRose-500 hover:dark:bg-dustyRose-700 bg-dustyRose-300 focus:dark:ring-dustyRose-800 ring-dustyRose-200"
                            >
                                Clear
                            </button>
                            <button
                                onClick={closeDateMenu}
                                className="flex whitespace-nowrap space-x-2 text-black dark:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm py-1 px-3 text-center items-center dark:bg-dustyRose-600 hover:bg-dustyRose-400 border dark:border-dustyRose-500 border-dustyRose-500 hover:dark:bg-dustyRose-700 bg-dustyRose-300 focus:dark:ring-dustyRose-800 ring-dustyRose-200"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DateDropdown;
