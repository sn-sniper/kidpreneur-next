import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Documentation | The Kidpreneur Journey',
  description: 'Interactive OpenAPI 3.0 documentation for The Kidpreneur Journey API',
};

export default function DocsPage() {
  return (
    <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <iframe
        src="/swagger.html"
        title="Swagger UI"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
}
