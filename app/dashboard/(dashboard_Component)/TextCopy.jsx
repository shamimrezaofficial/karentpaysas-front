import { PiClipboardFill } from 'react-icons/pi';
import { toast } from 'react-toastify';

export function TextCopy({ text, fontSize, status }) {
    return (
        <div className=" flex gap-1 whitespace-normal cursor-pointer">
            <span
                onClick={() =>
                    navigator?.clipboard
                        .writeText(text)
                        .then(() => {
                            toast.success("Copied successfully!", {
                                position: "top-center",
                            });
                        })
                        .catch(() => {
                            toast.error(
                                "Failed to copy. Please try again.",
                                {
                                    position: "top-center",
                                }
                            );
                        })
                }
                className="cursor-pointer"
            >
                <PiClipboardFill className="text-xl text-[#08987C] hover:text-[#065A47] transition-colors duration-200" />
            </span>

            <div className={`${fontSize} flex gap-1 justify-start`}>
                <h2 className="whitespace-nowrap">{status && status}</h2>
                <h2 className="break-words whitespace-wrap">{text}</h2>
            </div>
        </div>
    );
}
