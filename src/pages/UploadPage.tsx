import { useState, useRef, useEffect, ChangeEvent, DragEvent } from "react";
import { useTranslation } from "react-i18next";
import { Upload, Image as ImageIcon, FileX } from "lucide-react";
import * as tmImage from "@teachablemachine/image";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Guide from "../components/ui/Guide";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MODEL_URL = "/tm-model/";

type Prediction = {
  className: string;
  probability: number;
};

const UploadPage: React.FC = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const modelRef = useRef<tmImage.CustomMobileNet | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);
  const [suggestedMaterial, setSuggestedMaterial] = useState<string | null>(
    null
  );

  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await tmImage.load(
          `${MODEL_URL}model.json`,
          `${MODEL_URL}metadata.json`
        );
        modelRef.current = model;
      } catch (err) {
        console.error("❌ Error loading model", err);
        setError("Model loading failed");
      }
    };
    loadModel();
  }, []);

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setError(t("imageUpload.error.tooLarge"));
      return false;
    }

    if (!ALLOWED_FORMATS.includes(file.type)) {
      setError(t("imageUpload.error.wrongFormat"));
      return false;
    }
    return true;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError("");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(droppedFile);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!modelRef.current || !imageRef.current) return;
    setIsAnalyzing(true);
    setError("");
    setPrediction(null);
    setRejectionReason(null);
    setSuggestedMaterial(null);

    try {
      const results = await modelRef.current.predict(imageRef.current);
      const bestMatch = results.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );

      setPrediction(bestMatch);

      console.log("🔍 Prediction results:", results);
      console.log("🔍 Best match:", prediction?.className);

      if (
        bestMatch.probability < 0.7 ||
        bestMatch.className === "Rejected For DFM"
      ) {
        setRejectionReason("Low confidence");
        const sorted = [...results].sort(
          (a, b) => b.probability - a.probability
        );
        const nextBest = sorted[1];
        if (nextBest) {
          setSuggestedMaterial(nextBest.className);
        }
      }
    } catch (err) {
      console.error("❌ Error during prediction:", err);
      setError("Error during image analysis");
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t("imageUpload.title")}
        </h1>
        <p className="text-lg text-gray-600">{t("imageUpload.subtitle")}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center ${dragActive ? "border-primary-500 bg-primary-50" : "border-gray-300"
            } transition-colors duration-200`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!preview ? (
            <div className="space-y-4">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-lg font-medium text-gray-700">
                {t("imageUpload.dropzone")}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {t("imageUpload.supported")}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {t("imageUpload.maxSize")}
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-primary mt-4"
              >
                <ImageIcon className="h-5 w-5 me-2" /> Browse Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept={ALLOWED_FORMATS.join(",")}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative mx-auto max-w-xs max-h-64 overflow-hidden rounded-lg">
                <img
                  ref={imageRef}
                  src={preview}
                  alt="Upload preview"
                  className="mx-auto max-h-64 object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    setPrediction(null);
                    setRejectionReason(null);
                    setSuggestedMaterial(null);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-white bg-opacity-90 rounded-full text-gray-700 hover:text-error-500 transition-colors"
                >
                  <FileX className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm font-medium text-gray-700">{file?.name}</p>
              <p className="text-xs text-gray-500">
                {file && typeof file.size === "number"
                  ? (file.size / 1024 / 1024).toFixed(2)
                  : ""}{" "}
                MB
              </p>
              <button onClick={handleAnalyze} className="btn btn-primary">
                {isAnalyzing ? <LoadingSpinner /> : "Analyze Image"}
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-error-50 border border-error-500 text-error-900 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {prediction && !error && !isAnalyzing && (
        <div className="text-center space-y-4">
          {prediction.probability < 0.7 ||
            prediction.className == "Rejected For DFM" ? (
            <>
              <p className="text-red-600 font-semibold">
                ❌ Design Rejected For DFM (Low confidence)
              </p>
              <img
                src="/img.jfif" // حط هنا مسار الصورة اللي عايزها تظهر
                alt="Uncertain result"
                className="mx-auto w-48 h-48 object-contain"
              />
              <p className="text-sm mt-2">Reason: {rejectionReason}</p>
              {suggestedMaterial && (
                <p className="text-sm">
                  Suggested Material:{" "}
                  <span className="font-medium text-blue-500">
                    {suggestedMaterial}
                  </span>
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-xl font-bold text-gray-700">
                Result:{" "}
                <span className="text-blue-600">{prediction.className}</span>
              </p>
              <p className="text-sm text-gray-500">
                Confidence: {(prediction.probability * 100).toFixed(2)}%
              </p>
              <p className="text-green-600 font-semibold">✅ Design Accepted</p>
            </>
          )}
        </div>
      )}
      <Guide />
    </div>
  );
};

export default UploadPage;
