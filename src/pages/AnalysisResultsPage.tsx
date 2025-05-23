import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Download,
  Share2,
  Tag,
  BarChart2,
  FileText,
  Users,
  Info,
} from "lucide-react";
import LoadingSpinner from "../components/ui/LoadingSpinner";

// Mock data for analysis results
const mockResults = {
  id: "mock123",
  date: new Date(2025, 4, 15),
  imageUrl:
    "https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  objectDetection: [
    { label: "Person", confidence: 0.98 },
    { label: "Car", confidence: 0.87 },
    { label: "Tree", confidence: 0.92 },
    { label: "Building", confidence: 0.76 },
  ],
  sceneClassification: [
    { label: "Urban", confidence: 0.95 },
    { label: "Street", confidence: 0.89 },
    { label: "City", confidence: 0.82 },
  ],
  textRecognition: [
    { text: "STOP", confidence: 0.94 },
    { text: "ONE WAY", confidence: 0.88 },
  ],
  faceDetection: [
    { confidence: 0.96, attributes: { gender: "Male", age: "25-35" } },
  ],
};

const AnalysisResultsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [results, setResults] = useState<typeof mockResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("objectDetection");

  useEffect(() => {
    // Simulating API loading
    const timer = setTimeout(() => {
      setResults(mockResults);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!results) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-lg shadow p-8">
          <Info className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Analysis not found
          </h1>
          <p className="text-gray-600">
            The analysis results you're looking for don't exist or have been
            removed.
          </p>
        </div>
      </div>
    );
  }

  const TabButton = ({
    id,
    label,
    icon,
  }: {
    id: string;
    label: string;
    icon: React.ReactNode;
  }) => (
    <button
      className={`flex items-center px-4 py-2 rounded-md ${
        activeTab === id
          ? "bg-primary-100 text-primary-800 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={() => setActiveTab(id)}
    >
      {icon}
      <span className="ms-2">{label}</span>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("analysis.results.title")}
          </h1>
          <p className="text-gray-600">{t("analysis.results.subtitle")}</p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
              <img
                src={results.imageUrl}
                alt="Analyzed image"
                className="w-full h-auto"
              />
            </div>

            <div className="flex justify-between">
              <button className="btn btn-outline">
                <Download className="h-4 w-4 me-2" />
                {t("analysis.results.downloadButton")}
              </button>
              <button className="btn btn-outline">
                <Share2 className="h-4 w-4 me-2" />
                {t("analysis.results.shareButton")}
              </button>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto scrollbar-thin">
              <TabButton
                id="objectDetection"
                label={t("analysis.results.objectDetection")}
                icon={<Tag className="h-4 w-4" />}
              />
              <TabButton
                id="sceneClassification"
                label={t("analysis.results.sceneClassification")}
                icon={<BarChart2 className="h-4 w-4" />}
              />
              <TabButton
                id="textRecognition"
                label={t("analysis.results.textRecognition")}
                icon={<FileText className="h-4 w-4" />}
              />
              <TabButton
                id="faceDetection"
                label={t("analysis.results.faceDetection")}
                icon={<Users className="h-4 w-4" />}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              {activeTab === "objectDetection" && (
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {t("analysis.results.objectDetection")}
                  </h3>
                  {results.objectDetection.length === 0 ? (
                    <p className="text-gray-500">
                      {t("analysis.results.noObjects")}
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {results.objectDetection.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="font-medium">{item.label}</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2.5 me-2">
                              <div
                                className="bg-primary-600 h-2.5 rounded-full"
                                style={{ width: `${item.confidence * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {(item.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeTab === "sceneClassification" && (
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {t("analysis.results.sceneClassification")}
                  </h3>
                  {results.sceneClassification.length === 0 ? (
                    <p className="text-gray-500">
                      {t("analysis.results.noObjects")}
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {results.sceneClassification.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="font-medium">{item.label}</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2.5 me-2">
                              <div
                                className="bg-secondary-600 h-2.5 rounded-full"
                                style={{ width: `${item.confidence * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {(item.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeTab === "textRecognition" && (
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {t("analysis.results.textRecognition")}
                  </h3>
                  {results.textRecognition.length === 0 ? (
                    <p className="text-gray-500">
                      {t("analysis.results.noText")}
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {results.textRecognition.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="font-medium">{item.text}</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2.5 me-2">
                              <div
                                className="bg-accent-500 h-2.5 rounded-full"
                                style={{ width: `${item.confidence * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {(item.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeTab === "faceDetection" && (
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {t("analysis.results.faceDetection")}
                  </h3>
                  {results.faceDetection.length === 0 ? (
                    <p className="text-gray-500">
                      {t("analysis.results.noFaces")}
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {results.faceDetection.map((item, index) => (
                        <li key={index} className="flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">
                              {t("analysis.results.confidence")}
                            </span>
                            <div className="flex items-center">
                              <div className="w-32 bg-gray-200 rounded-full h-2.5 me-2">
                                <div
                                  className="bg-primary-600 h-2.5 rounded-full"
                                  style={{ width: `${item.confidence * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-500">
                                {(item.confidence * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {Object.entries(item.attributes).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="bg-gray-100 p-2 rounded"
                                >
                                  <span className="text-xs text-gray-500 block">
                                    {key}
                                  </span>
                                  <span className="font-medium">{value}</span>
                                </div>
                              )
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultsPage;
