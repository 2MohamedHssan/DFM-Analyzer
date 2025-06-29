import { useTranslation } from "react-i18next";

function Guide() {
  const { t } = useTranslation();
  const allData = [
    { title: t("guide.first.key") || "", value: t("guide.first.value") || "" },
    { title: t("guide.second.key") || "", value: t("guide.second.value") || "" },
    { title: t("guide.third.key") || "", value: t("guide.third.value") || "" },
    { title: t("guide.one.title") || "", value: t("guide.one.description") || "" },
    { title: t("guide.two.title") || "", value: t("guide.two.description") || "" },
    { title: t("guide.three.title") || "", value: t("guide.three.description") || "" },
    { title: t("guide.four.title") || "", value: t("guide.four.description") || "" },
    { title: t("guide.five.title") || "", value: t("guide.five.description") || "" },
    { title: t("guide.six.title") || "", value: t("guide.six.description") || "" },
    { title: t("guide.seven.title") || "", value: t("guide.seven.description") || "" },
    { title: t("guide.eight.title") || "", value: t("guide.eight.description") || "" },
    { title: t("guide.nine.title") || "", value: t("guide.nine.description") || "" },
    { title: t("guide.ten.title") || "", value: t("guide.ten.description") || "" },

  ]
  return (
    <div className="mt-20">
      <h3 className="mb-16 text-center">{t("guide.mainTitle")}</h3>
      <div className="flex flex-col gap-4 my-4 bg-white">
        {allData.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-1 overflow-hidden shadow-md rounded-lg">
            <strong className="bg-[#EFF6FF] w-full p-4">
              {item.title || `Guide ${index + 1}`}
            </strong>
            <p className="text-[12px] p-3">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guide;
