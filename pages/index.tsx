import { client } from '../libs/client';
import type { Blog } from '../types/blog';
import Link from 'next/link';
import { Pagination } from '../components/Pagination';

type Props = {
  blog: Array<Blog>;
  totalCount: number;
};

export default function Home({ blog, totalCount }: Props) {
  return (
    <>
      <h1 className="container mx-auto px-10 pt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        記事一覧
      </h1>
      <div className="container mx-auto p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {blog.map(blog => (
          <div className="rounded overflow-hidden shadow-lg" key={blog.id}>
            <img
              className="w-full"
              src={blog.thumbnail.url}
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <Link legacyBehavior href={`/blog/${blog.id}`} passHref>
                <a>{blog.title}</a>
              </Link>
            </div>
            <div className="px-6 pt-4 pb-2">
              {blog.tag && (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{blog.tag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination totalCount={totalCount} currentPageNumber={0} />
    </>
  );
}

// ssgでmicroCMSから最新のブログデータを15件取得
export const getStaticProps = async () => {
  const offset = 0;
  const limit = 15;
  const queries = { offset: offset, limit: limit };
  const data = await client.get({
    endpoint: `${process.env.microcmsEndpoint}`,
    queries : queries
  });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount
    },
  };
};