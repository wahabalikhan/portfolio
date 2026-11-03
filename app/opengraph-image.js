// Share image, rendered once at build time and used by every page.
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SITE_NAME } from '@/lib/metadata';

export const dynamic = 'force-static';
export const alt = `${SITE_NAME} · Product Designer`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const photo = await readFile(join(process.cwd(), 'public/images/profile.png'));
  const photoSrc = `data:image/png;base64,${photo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 64,
          padding: '0 96px',
          background: '#ffffff',
          color: '#111827',
        }}
      >
        <img src={photoSrc} width={240} height={240} style={{ borderRadius: '50%', objectFit: 'cover' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, lineHeight: 1.1, color: '#2563eb' }}>{SITE_NAME}</div>
          <div style={{ fontSize: 40, marginTop: 20 }}>Product Designer</div>
          <div style={{ fontSize: 30, marginTop: 36, color: '#6b7280' }}>wahabalikhan.com</div>
        </div>
      </div>
    ),
    size
  );
}
