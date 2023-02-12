import React from "react";
import Link from "next/link";

// interface Props {
//   maxPageNumber?: number;
//   currentPageNumber: number;
//   whatPage?: string;
//   tagId?: string;
// }

// export const Pagination: React.FC<Props> = React.memo((props) => {
//   const { maxPageNumber, currentPageNumber, whatPage, tagId } = props;
//   const prevPage = currentPageNumber - 1;

//   const nextPage = currentPageNumber + 1;

//   const previousLinkHref = tagId
//     ? `/blog/${tagId}/page/${prevPage}`
//     : `/blog/page/${prevPage}`;
//   const nextLinkHref = tagId
//     ? `/blog/${tagId}/page/${nextPage}`
//     : `/blog/page/${nextPage}`;

//   return (
//     <div className="flex px-3 my-12">
//       {currentPageNumber !== 1 && (
//         <Link legacyBehavior href={previousLinkHref}>
//           <a className="text-lg">&lt; Previous</a>
//         </Link>
//       )}
//       {currentPageNumber !== maxPageNumber && (
//         <Link legacyBehavior href={nextLinkHref}>
//           <a className="ml-4 text-lg">Next &gt;</a>
//         </Link>
//       )}
//     </div>
//   );
// });

// Pagination.displayName = "Pagination";

export const Pagination = ({ totalCount }) => {
  const PER_PAGE = 5;

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul className="inline-flex -space-x-px">
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" key={index}>
          <Link href={`/blog/page/${number}`}>{number}</Link>
        </li>
      ))}
    </ul>
  );
};