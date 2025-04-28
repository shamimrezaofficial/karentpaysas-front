const Table = ({ headers, children, classCss }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr className="border-y border-gray-200 text-[#374151]">
            {headers?.map((header, index) => (
              <th
                key={index}
                className={`${
                  index === 0 ? "px-6" : classCss || "p-4"
                } text-left font-semibold whitespace-nowrap`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
