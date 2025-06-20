import { useTranslation } from "react-i18next";

function Guide() {
  const { t } = useTranslation();
  return (
    <div className="mt-20">
      <h3 className="mb-2">{t("guide.mainTitle")}</h3>

      <div className="flex gap-2">
        <strong>{t("guide.first.key")}:</strong>
        {t("guide.first.value")}
      </div>
      <div className="flex gap-2">
        <strong>{t("guide.second.key")}:</strong>
        {t("guide.second.value")}
      </div>
      <div className="flex gap-2">
        <strong>{t("guide.third.key")}:</strong>
        {t("guide.third.value")}
      </div>
      <div className="flex flex-col gap-4 my-4 bg-white">
        <div className="flex flex-col items-start gap-1 overflow-hidden shadow-md rounded-lg">
          <strong className="bg-[#EFF6FF] w-full p-4">
            {t("guide.one.title")}
          </strong>
          <p className="text-[12px] p-3">{t("guide.one.description")}</p>
        </div>
        <div className="flex flex-col items-start gap-1 overflow-hidden shadow-md rounded-lg">
          <strong className="bg-[#EFF6FF] w-full p-4">
            {t("guide.two.title")}
          </strong>
          <p className="text-[12px] p-3">{t("guide.two.description")}</p>
        </div>
        <div className="flex flex-col items-start gap-1 overflow-hidden shadow-md rounded-lg">
          <strong className="bg-[#EFF6FF] w-full p-4">
            {t("guide.three.title")}
          </strong>
          <p className="text-[12px] p-3">{t("guide.three.description")}</p>
        </div>
        <div className="flex flex-col items-start gap-1 overflow-hidden shadow-md rounded-lg">
          <strong className="bg-[#EFF6FF] w-full p-4">
            {t("guide.four.title")}
          </strong>
          <p className="text-[12px] p-3">{t("guide.four.description")}</p>
        </div>
        <div className="overflow-hidden shadow-md rounded-lg flex flex-col items-start gap-1">
          <strong className="bg-[#EFF6FF] w-full p-4">
            {t("guide.five.title")}
          </strong>
          <p className="text-[12px] p-3">{t("guide.five.description")}</p>
        </div>
        <div className="flex flex-col items-start gap-1 overflow-hidden shadow-md rounded-lg">
          <strong className="bg-[#EFF6FF] w-full p-4">
            {t("guide.six.title")}
          </strong>
          <p className="text-[12px] p-3">{t("guide.six.description")}</p>
        </div>
        <div className="flex flex-col items-start gap-1 overflow-hidden shadow-md rounded-lg">
          <strong className="bg-[#EFF6FF] w-full p-4">
            {t("guide.seven.title")}
          </strong>
          <p className="text-[12px] p-3">{t("guide.seven.description")}</p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <strong className="bg-[#EFF6FF] w-full p-4">
            {t("guide.eight.title")}
          </strong>
          <p className="text-[12px] p-3">{t("guide.eight.description")}</p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <strong className="bg-[#EFF6FF] w-full p-4">
            {t("guide.nine.title")}
          </strong>
          <p className="text-[12px]">{t("guide.nine.description")}</p>
        </div>
        <div className="flex flex-col items-start gap-1">
          <strong className="bg-[#EFF6FF] w-full p-4">
            {t("guide.ten.title")}
          </strong>
          <p className="text-[12px]">{t("guide.ten.description")}</p>
        </div>
      </div>
    </div>
  );
}

export default Guide;
