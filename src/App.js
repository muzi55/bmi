import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bmiCalculator, resetBmi } from "./redux/modules/bmi";
import "./style/style.scss";
import Layout from "./Layout";

function App() {
  return (
    <Layout>
      <h1 className="hidden">bmi 계산기</h1>
      <BmiFormSection />
      <ResultSection />
      <VisualSection />
    </Layout>
  );
}

export default App;

const BmiFormSection = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const dispatch = useDispatch();
  return (
    <form id="bmiform" action="#" method="#" onSubmit={(e) => e.preventDefault()}>
      <p>
        <label>
          <span>신장</span>
          <input
            value={height}
            type="number"
            placeholder="170"
            onChange={(e) => {
              setHeight(e.target.value);
            }}
          />
          cm
        </label>
      </p>
      <p>
        <label>
          <span>몸무게</span>
          <input
            value={weight}
            type="number"
            placeholder="70"
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          />
          kg
        </label>
      </p>
      <button
        type="submit"
        onClick={() => {
          // 값이 입력받지 않았으면, return 으로 함수를 끝냅니다.
          if (!weight || !height) return;
          dispatch(bmiCalculator({ height, weight }));
        }}>
        계산
      </button>
      <button
        type="submit"
        onClick={() => {
          dispatch(resetBmi());
          setHeight("");
          setWeight("");
        }}>
        초기화
      </button>
    </form>
  );
};

const ResultSection = () => {
  // bmi
  const [obesity, setObesity] = useState(0);
  const bmiSelector = useSelector((state) => state.bmiSlice);
  // to - many 가 떠서 useEffect를 사용했다.
  // deps에 bmiSelector를 넣어 bmiSelector 값이 바뀔때만 리렌더링 되게끔 했다.
  useEffect(() => {
    if (bmiSelector > 25) {
      return setObesity("비만");
    } else if (bmiSelector > 23) {
      return setObesity("과체중");
    } else if (bmiSelector > 18.5) {
      return setObesity("정상");
    } else {
      return setObesity("저체중");
    }
  }, [bmiSelector]);
  return (
    <section className="bm-result">
      <h2 className="hidden">bmi 결과 섹션</h2>
      {/* 초기화를 누르고 계산 버튼을 클릭하면 맛탱이가 가버림 */}
      <p>
        BMI 지수 <span>{bmiSelector.toFixed(2) > 0 ? bmiSelector.toFixed(2) : null}</span>
      </p>
      <p>
        비만도 결과 <span>{bmiSelector !== 0 ? `${obesity}입니다` : null} </span>
      </p>
    </section>
  );
};

const VisualSection = () => {
  return (
    <>
      <section className="visual">
        <h2 className="hidden">비만도 이미지</h2>
        <div>저체중</div>
        <div>정상</div>
        <div>과체중</div>
        <div>비만</div>
      </section>
    </>
  );
};
