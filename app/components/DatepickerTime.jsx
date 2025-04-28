import Datepicker from "react-tailwindcss-datepicker";

function DatepickerTime({ handleDateRangeChange, dateRange }) {
    return (
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0 border border-blue-500 rounded-md">
            <div className="flex items-center space-x-3 w-full md:w-auto">
                <Datepicker
                    showShortcuts={true}
                    showFooter={true}
                    configs={{
                        shortcuts: {
                            today: "Today",
                            yesterday: "Yesterday",
                            past: (period) => `Past ${period}`,
                            currentMonth: "Current Month",
                            pastMonth: "Past Month",
                        },
                        footer: {
                            cancel: "Cancel",
                            apply: "Apply",
                        },
                    }}
                    value={dateRange}
                    onChange={handleDateRangeChange}
                />
            </div>
        </div>
    );
}

export default DatepickerTime;