
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import APP_CONFIG from '@/config/app.config';
import ENV_CONFIG from '@/config/env.config';

const ProductionReadinessChecklist = () => {
  const checks = [
    {
      category: 'Configuration',
      items: [
        { name: 'App configuration file created', status: 'completed', critical: true },
        { name: 'Environment variables configured', status: 'needs-setup', critical: true },
        { name: 'External links configured', status: 'completed', critical: false },
      ]
    },
    {
      category: 'Authentication & Backend',
      items: [
        { name: 'Supabase integration', status: 'needs-setup', critical: true },
        { name: 'User authentication flow', status: 'needs-setup', critical: true },
        { name: 'Database schema', status: 'needs-setup', critical: true },
        { name: 'Row Level Security (RLS)', status: 'needs-setup', critical: true },
      ]
    },
    {
      category: 'SEO & Meta',
      items: [
        { name: 'Meta tags configured', status: 'completed', critical: false },
        { name: 'Favicon set', status: 'completed', critical: false },
        { name: 'Open Graph tags', status: 'completed', critical: false },
        { name: 'Sitemap', status: 'needs-setup', critical: false },
      ]
    },
    {
      category: 'Performance',
      items: [
        { name: 'Image optimization', status: 'needs-review', critical: false },
        { name: 'Bundle size optimization', status: 'needs-review', critical: false },
        { name: 'Lazy loading implemented', status: 'needs-setup', critical: false },
      ]
    },
    {
      category: 'Legal & Compliance',
      items: [
        { name: 'Privacy Policy', status: 'needs-content', critical: true },
        { name: 'Terms of Service', status: 'needs-content', critical: true },
        { name: 'Cookie policy', status: 'needs-setup', critical: false },
        { name: 'GDPR compliance', status: 'needs-review', critical: true },
      ]
    },
    {
      category: 'Monitoring & Analytics',
      items: [
        { name: 'Error tracking', status: 'needs-setup', critical: false },
        { name: 'Analytics setup', status: 'needs-setup', critical: false },
        { name: 'Performance monitoring', status: 'needs-setup', critical: false },
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'needs-setup':
      case 'needs-content':
      case 'needs-review':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string, critical: boolean) => {
    if (status === 'completed') return 'text-green-400';
    if (critical) return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Production Readiness Checklist</h2>
        <p className="text-gray-400">Review these items before deploying to production</p>
      </div>

      {checks.map((category) => (
        <Card key={category.category} className="bg-matrix-dark border-matrix-gray/30">
          <CardHeader>
            <CardTitle className="text-neon-green">{category.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {category.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <span className={`${getStatusColor(item.status, item.critical)}`}>
                      {item.name}
                      {item.critical && <span className="text-red-400 ml-1">*</span>}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 capitalize">
                    {item.status.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-matrix-dark border-neon-green/30">
        <CardHeader>
          <CardTitle className="text-neon-green">Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-300">
            <p className="mb-2"><span className="text-red-400">* Critical items</span> must be completed before production deployment.</p>
            
            <h4 className="text-white font-semibold mb-2">Immediate Actions Required:</h4>
            <ul className="space-y-1 text-gray-400">
              <li>• Connect to Supabase for backend functionality</li>
              <li>• Create Privacy Policy and Terms of Service content</li>
              <li>• Set up environment variables in Supabase secrets</li>
              <li>• Configure authentication flows</li>
              <li>• Set up database tables and RLS policies</li>
            </ul>

            <h4 className="text-white font-semibold mb-2 mt-4">Recommended Before Launch:</h4>
            <ul className="space-y-1 text-gray-400">
              <li>• Add error tracking (Sentry, LogRocket, etc.)</li>
              <li>• Set up analytics (Google Analytics, Mixpanel, etc.)</li>
              <li>• Optimize images and bundle size</li>
              <li>• Create sitemap.xml</li>
              <li>• Add loading states and error boundaries</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionReadinessChecklist;
