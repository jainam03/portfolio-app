import { ImageResponse } from 'next/og';
import { personalInfo } from '@/data/content';

export const runtime = 'edge';
export const alt = 'Jainam Chheda Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#020817', // Match your dark mode bg
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background gradient blob simulation */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '600px',
            height: '600px',
            background: 'linear-gradient(to right, rgba(251, 191, 36, 0.4), rgba(251, 146, 60, 0.4))',
            filter: 'blur(100px)',
            borderRadius: '50%',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', gap: '20px' }}>
          <div
            style={{
              padding: '16px 32px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px',
              color: '#00C6FF',
              fontSize: '24px',
              fontWeight: 600,
              display: 'flex',
            }}
          >
            PGDM Business Design · WeSchool
          </div>
          <div
            style={{
              padding: '16px 32px',
              background: 'rgba(0, 198, 255, 0.1)',
              border: '1px solid rgba(0, 198, 255, 0.3)',
              borderRadius: '100px',
              color: '#00C6FF',
              fontSize: '24px',
              fontWeight: 600,
              display: 'flex',
            }}
          >
            Available Summer &apos;26
          </div>
        </div>

        <h1
          style={{
            fontSize: '96px',
            fontWeight: 800,
            color: 'white',
            margin: '0 0 24px 0',
            lineHeight: 1.1,
            display: 'flex',
          }}
        >
          {personalInfo.name}
        </h1>

        <p
          style={{
            fontSize: '48px',
            fontWeight: 500,
            color: '#94a3b8',
            margin: '0 0 40px 0',
            display: 'flex',
          }}
        >
          {personalInfo.title}
        </p>

        <div style={{ display: 'flex', marginTop: 'auto', borderTop: '2px solid rgba(255,255,255,0.1)', width: '100%', paddingTop: '40px' }}>
          <p style={{ fontSize: '32px', color: '#64748b', display: 'flex' }}>
            jainamchheda.com
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
