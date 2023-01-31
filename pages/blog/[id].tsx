import { GetServerSideProps } from 'next';
import type { Blog } from '../../types/blog';
import type { Highlightbody } from '../../types/highlightbody';
import { client } from '../../libs/client';
import { load } from "cheerio";
import hljs from 'highlight.js'
import 'highlight.js/styles/tech-blog-original.css'

type Props = {
  blog: Blog;
  highlightbody: Highlightbody;
};

export default function Article({ blog, highlightbody }: Props) {
  return (
    <div className="bg-gray-50">
      <div className="px-0 sm:px-10 py-6 mx-auto">
        <div className="max-w-6xl px-0 sm:px-10 py-6 mx-auto bg-gray-50">
          <img
            className="object-cover w-full shadow-sm h-full"
            src={blog.thumbnail.url}
          />
          <div className="mt-2">
            <div className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-blue-500">
              {blog.title}
            </div>
          </div>
          {blog.tag && (
            <div className="flex items-center justify-start mt-4 mb-4">
              <div className="px-2 py-1 font-bold bg-red-400 text-white rounded-lg">
                #{blog.tag}
              </div>
            </div>
          )}
          <div className="mt-2">
            <div
              dangerouslySetInnerHTML={{ __html: `${highlightbody}` }}
              className=" text-gray-700 mt-4 rounded "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ssrでブログ詳細を取得
export const getServerSideProps: GetServerSideProps = async ctx => {
  const id = ctx.params?.id;
  const idExceptArray = id instanceof Array ? id[0] : id;
  const data = await client.get({
    endpoint: 'blog',
    contentId: idExceptArray,
  });

  // シンタックスハイライト処理
  const $ = load(data.body);  // data.contentはmicroCMSから返されるリッチエディタ部分
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });
  data.content = $.html();

  return {
    props: {
      blog: data,
      highlightbody: data.content
    },
  };
};