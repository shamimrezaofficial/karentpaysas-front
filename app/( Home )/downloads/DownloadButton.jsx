import { IoMdDownload } from "react-icons/io";

function DownloadButton({ downloadFile }) {
  return (
    <div>
      <a
        href={downloadFile}
        download
        className="rounded-md py-2 px-4 flex items-center gap-1 bg-blue-500 text-white hover:bg-blue-600"
      >
        Download
        <IoMdDownload size={20} />
      </a>
    </div>
  );
}

export default DownloadButton;
