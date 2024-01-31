import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./home.scss";

const HomePages = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const routeTo = (path:string) => {
    navigate(path);
  };

  return (
    <div className="conteinerhome">
      <div className="text-header">
      <h1>{t("Home")}</h1>
      </div>
      <div className="home">
        <div className="homebox" onClick={() => routeTo("/layout-style")}>
          <div>{t("Test 1")}</div>
          <div>{t("Layout & Style")}</div>
        </div>
        <div className="homebox">
          <span>{t("Test 2")}</span>
          <div>{t("Connect API")}</div>
        </div>
        <div className="homebox" onClick={() => routeTo("/register")}>
          <span>{t("Test 3")}</span>
          <div>{t("Form & Table")}</div>
        </div>
      </div>
    </div>
  );
};

export default HomePages;
