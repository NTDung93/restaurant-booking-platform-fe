import { NextRequest } from 'next/server';

const UnauthorizedPages = ['/access-denied'];

export default function routingMiddleware(request: NextRequest) {
  return UnauthorizedPages.some((page) =>
    request.nextUrl.pathname.includes(page),
  );
}
