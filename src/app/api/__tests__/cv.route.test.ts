/**
 * Route tests for GET /api/cv.
 *
 * The route streams the public CV PDF with a truthful Content-Disposition and
 * returns 404 JSON when the requested locale asset is missing. jest-environment
 * -jsdom v30 provides no Request/Response globals, so next/server is stubbed
 * the same way as the contact route tests: status/body/headers are preserved so
 * the real file read and the route's own branching are exercised.
 */

import { GET } from '@/app/api/cv/route';

jest.mock('next/server', () => {
  class MockNextResponse {
    status: number;
    body: unknown;
    headers: { get: (name: string) => string | null };

    constructor(body: unknown, init?: { status?: number; headers?: Record<string, string> }) {
      this.status = init?.status ?? 200;
      this.body = body;
      this.headers = {
        get: (name: string) => init?.headers?.[name] ?? null,
      };
    }

    static json(body: unknown, init?: { status?: number }) {
      return new MockNextResponse(body, { status: init?.status });
    }

    async json() {
      return this.body;
    }
  }
  return { NextResponse: MockNextResponse };
});

const getRequest = (url: string): Request => ({ url }) as unknown as Request;

describe('GET /api/cv', () => {
  it('returns 200 and streams the PDF with truthful Content-Disposition for the default locale', async () => {
    const response = await GET(getRequest('http://localhost/api/cv'));

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/pdf');
    expect(response.headers.get('Content-Disposition')).toContain('attachment');
    expect(response.headers.get('Content-Disposition')).toContain('CV-Emmanuel_Berrio.pdf');

    const body = response.body as Buffer;
    expect(body.subarray(0, 5).toString('latin1')).toBe('%PDF-');
    expect(body.byteLength).toBeGreaterThan(1000);
  });

  it('returns 200 for an explicit lang=es and names the es file in the disposition', async () => {
    const response = await GET(getRequest('http://localhost/api/cv?lang=es'));

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Disposition')).toBe(
      'attachment; filename="CV-Emmanuel_Berrio.pdf"'
    );
  });

  it('returns 404 JSON when the requested locale asset is missing (en)', async () => {
    const response = await GET(getRequest('http://localhost/api/cv?lang=en'));

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: 'cv_not_found' });
  });
});