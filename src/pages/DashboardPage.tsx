import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BarChart, PieChart, Image as ImageIcon, Clock, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Mock data
const mockAnalyses = [
  {
    id: '1',
    imageUrl: 'https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: new Date(2025, 4, 15),
    type: 'Object Detection',
    results: ['Person', 'Car', 'Tree']
  },
  {
    id: '2',
    imageUrl: 'https://images.pexels.com/photos/17483417/pexels-photo-17483417/free-photo-of-city-skyline-with-clouds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: new Date(2025, 4, 14),
    type: 'Scene Classification',
    results: ['Urban', 'Cityscape', 'Building']
  },
  {
    id: '3',
    imageUrl: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: new Date(2025, 4, 13),
    type: 'Object Detection',
    results: ['Cat', 'Indoor']
  }
];

const DashboardPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState(mockAnalyses);
  const [stats, setStats] = useState({
    imagesAnalyzed: 0,
    lastUpload: null as Date | null,
    avgConfidence: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setStats({
        imagesAnalyzed: 24,
        lastUpload: new Date(2025, 4, 15),
        avgConfidence: 0.87
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('dashboard.welcome', { name: user?.name })}
        </h1>
        <Link to="/upload" className="btn btn-primary mt-4 md:mt-0">
          {t('nav.upload')}
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-primary-100 p-3 me-4">
              <ImageIcon className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.stats.imagesAnalyzed')}</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.imagesAnalyzed}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-secondary-100 p-3 me-4">
              <Clock className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.stats.lastUpload')}</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {stats.lastUpload ? new Intl.DateTimeFormat(t('common.language') === 'ar' ? 'ar-SA' : 'en-US').format(stats.lastUpload) : '-'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-accent-100 p-3 me-4">
              <BarChart className="h-6 w-6 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.stats.avgConfidence')}</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {(stats.avgConfidence * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Recent Analyses */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{t('dashboard.recentAnalyses.title')}</h2>
          <Link to="/analyses" className="text-primary-600 hover:text-primary-700 flex items-center font-medium">
            {t('dashboard.recentAnalyses.viewAll')}
            <ChevronRight className="h-4 w-4 ms-1 rtl-flip" />
          </Link>
        </div>

        {analyses.length === 0 ? (
          <div className="p-6 text-center text-gray-500">{t('dashboard.recentAnalyses.noAnalyses')}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('dashboard.recentAnalyses.image')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('dashboard.recentAnalyses.date')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('dashboard.recentAnalyses.type')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('dashboard.recentAnalyses.results')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('common.view')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyses.map((analysis) => (
                  <tr key={analysis.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-md object-cover" src={analysis.imageUrl} alt="" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Intl.DateTimeFormat(t('common.language') === 'ar' ? 'ar-SA' : 'en-US').format(analysis.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {analysis.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {analysis.results.map((result, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {result}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      <Link to={`/analysis/${analysis.id}`} className="text-primary-600 hover:text-primary-900">
                        {t('common.view')}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Analytics Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Categories</h3>
          <div className="flex justify-center">
            <div className="w-64 h-64 flex items-center justify-center">
              <PieChart className="w-full h-full text-primary-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Trend</h3>
          <div className="flex justify-center">
            <div className="w-full h-64 flex items-center justify-center">
              <BarChart className="w-full h-full text-secondary-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;