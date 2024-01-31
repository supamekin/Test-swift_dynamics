import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./test-layout.scss";


const TestDirection: React.FC = () => {
  const { t } = useTranslation();
  const initialTopRow = ["squaretop", "circletop", "horizontal-circletop"];
  const initialBottomRow = ["trapezoid", "rectangle", "parallelogram"];
  const navigate = useNavigate();
  const routeTo = (path:string) => {
    navigate(path);
  };

  const [topRow, setTopRow] = useState<string[]>(initialTopRow);
  const [bottomRow, setBottomRow] = useState<string[]>(initialBottomRow);
  const [isTopRowAbove, setIsTopRowAbove] = useState<boolean>(true);

  const shuffleBoxes = () => {
    const shuffledBoxes = [
      "squaretop",
      "circletop",
      "horizontal-circletop",
      "trapezoid",
      "rectangle",
      "parallelogram",
    ].sort(() => Math.random() - 0.5);
    const newTopRow = shuffledBoxes.slice(0, 3);
    const newBottomRow = shuffledBoxes.slice(3, 6);
    setTopRow(newTopRow);
    setBottomRow(newBottomRow);
  };

  const moveLeft = () => {
    const tempTop = topRow[0];
    const tempBottom = bottomRow[0];
    const newTopRow = [topRow[1], topRow[2], tempBottom];
    const newBottomRow = [bottomRow[1], bottomRow[2], tempTop];
    setTopRow(newTopRow);
    setBottomRow(newBottomRow);
  };

  const moveRight = () => {
    const tempTop = topRow[2];
    const tempBottom = bottomRow[2];
    const newTopRow = [tempBottom, topRow[0], topRow[1]];
    const newBottomRow = [tempTop, bottomRow[0], bottomRow[1]];
    setTopRow(newTopRow);
    setBottomRow(newBottomRow);
  };

  const swapRows = () => {
    const tempTop = [...topRow];
    setTopRow(bottomRow);
    setBottomRow(tempTop);
    setIsTopRowAbove(!isTopRowAbove); 
  };

  // const resetBoxes = () => {
  //     setTopRow(initialTopRow);
  //     setBottomRow(initialBottomRow);
  //     setIsTopRowAbove(true); // Reset the state to default
  // };

  return (
    <>
    <div className="ConteinerLayout">
    <div className="text-header" >
      <h1>{t("Layout & Style")}</h1>
      <h1 onClick={() => routeTo("/home")} >{t("Back")}</h1>
      </div>
      <div className="LayoutStyle">
        <div className="conLayout">
          <div className="box-action">
            <button onClick={moveLeft} className="moveLeft">
              <div className="triangle-left"></div>
            </button>
            <div className="text-button">{t('Move Left')}</div>
          </div>
          <div className="box-action">
            <button onClick={swapRows} className="swapRows">
              <div className="triangle-up"></div>
              <div className="triangle-down"></div>
            </button>
            <div className="text-button">{t('Move Position')}</div>
          </div>
          <div className="box-action">
            <button onClick={moveRight} className="moveRight">
              <div className="triangle-right"></div>
            </button>
            <div className="text-button">{t('Move Right')}</div>
          </div>
          {/* <button onClick={resetBoxes} className="reset">
                <div className='arrow'></div>
                <span>Reset</span>
                </button> */}
        </div>
        <div className="containerTap">
          <div className={`tapOne ${isTopRowAbove ? "row1" : "row2"}`}>
            {topRow.map((shape, index) => (
              <div
                key={"top_" + index}
                className={`box${index + 1}`}
                onClick={shuffleBoxes}
              >
                <div className={shape}></div>
              </div>
            ))}
          </div>
          <div className={`tapTwo ${isTopRowAbove ? "row2" : "row1"}`}>
            {bottomRow.map((shape, index) => (
              <div
                key={"bottom_" + index}
                className={`box${index + 4}`}
                onClick={shuffleBoxes}
              >
                <div className={shape}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default TestDirection;
