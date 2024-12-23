import { ReactElement, useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import { unified } from "unified";
import { UseRemarkOptions } from "./types.js";

export function useRemark({ markdown, rehypePlugins = [], rehypeReactOptions, remarkParseOptions, remarkPlugins = [], remarkToRehypeOptions, onError = console.error }: UseRemarkOptions): ReactElement | null {
  const [reactContent, setReactContent] = useState<ReactElement | null>(null);

  useEffect(() => {
    unified()
      .use(remarkParse, remarkParseOptions)
      .use(remarkPlugins)
      .use(remarkToRehype, remarkToRehypeOptions)
      .use(rehypePlugins)
      .use(rehypeReact, { ...rehypeReactOptions, Fragment, jsx, jsxs })
      .process(markdown)
      .then(({ result }: { result: ReactElement }) => setReactContent(result))
      .catch(onError);
  }, [markdown]);

  return reactContent;
}
