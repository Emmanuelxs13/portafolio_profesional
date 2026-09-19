/**
 * GET /api/cv?lang=…
 *
 * Streams the CV PDF for the active locale with a truthful Content-Disposition
 * so the downloaded file keeps its real name. When the requested locale asset
 * is missing the route returns 404 JSON instead of a broken download; the
 * About control falls back to the available asset in that case.
 *
 * - 200: PDF bytes (Content-Type application/pdf, attachment filename)
 * - 404: { error: 'cv_not_found' } when the locale PDF does not exist
 */

import { NextResponse } from 'next/server';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const CV_FILENAMES: Record<string, string> = {
  es: 'CV-Emmanuel_Berrio.pdf',
  en: 'CV-Emmanuel_Berrio_EN.pdf',
};

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang');
  const filename = CV_FILENAMES[lang ?? 'es'] ?? CV_FILENAMES.es;
  const filePath = path.join(process.cwd(), 'public', filename);

  try {
    const info = await stat(filePath);
    if (!info.isFile()) {
      throw new Error(`not a file: ${filePath}`);
    }
  } catch {
    return NextResponse.json({ error: 'cv_not_found' }, { status: 404 });
  }

  const data = await readFile(filePath);
  return new NextResponse(data, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(data.byteLength),
    },
  });
}