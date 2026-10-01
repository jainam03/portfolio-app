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
          background: '#101116',
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
            background: 'linear-gradient(to right, rgba(93, 97, 255, 0.38), rgba(79, 70, 229, 0.25))',
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
              color: '#a5a8ff',
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
              background: 'rgba(93, 97, 255, 0.12)',
              border: '1px solid rgba(93, 97, 255, 0.32)',
              borderRadius: '100px',
              color: '#a5a8ff',
              fontSize: '24px',
              fontWeight: 600,
              display: 'flex',
            }}
          >
            Operations Concentration
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
