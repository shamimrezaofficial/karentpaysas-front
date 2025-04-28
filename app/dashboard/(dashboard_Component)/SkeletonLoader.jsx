function SkeletonLoader({ item, i }) {
  return (
    <td key={i} className="p-3">
      <div
        className={`bg-gray-300 animate-pulse rounded ${item.width} ${item.height}`}
      ></div>
      {item.extra
        ? Array.from({ length: item.extra }).map((_, j) => (
            <div
              key={j}
              className={`bg-gray-300 animate-pulse rounded ${item.width} ${item.height} mt-1`}
            ></div>
          ))
        : null}
    </td>
  );
}

export default SkeletonLoader;
