interface PagesFunctionContext {
  request: Request;
  next: () => Promise<Response>;
}

export const onRequest = async (context: PagesFunctionContext): Promise<Response> => {
  const url = new URL(context.request.url);

  // If path ends with a trailing slash and is not the root path '/', redirect 301 to non-trailing slash
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '');
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
};
