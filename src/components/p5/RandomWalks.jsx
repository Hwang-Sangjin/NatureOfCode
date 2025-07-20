import React, { useRef, useEffect } from "react";
import p5 from "p5"; // p5.js 라이브러리를 npm을 통해 임포트합니다.

/**
 * RandomWalks 컴포넌트는 p5.js를 사용하여 랜덤 워커 스케치를 렌더링합니다.
 * 이 컴포넌트는 p5.js 인스턴스를 관리하고, 스케치의 setup, draw 로직을 포함합니다.
 */
function RandomWalks() {
  // p5.js 캔버스가 렌더링될 DOM 요소를 참조하기 위한 ref를 생성합니다.
  const sketchRef = useRef(null);

  useEffect(() => {
    let p5Instance = null; // p5.js 인스턴스를 저장할 변수

    // p5.js 스케치 정의
    const sketch = (p) => {
      let walker; // 워커 객체를 선언합니다.

      // Walker 클래스 정의 (p5.js 스케치 내부에 포함)
      class Walker {
        constructor() {
          this.x = p.width / 2; // p5.js의 width 변수를 사용합니다.
          this.y = p.height / 2; // p5.js의 height 변수를 사용합니다.
        }

        show() {
          p.stroke(0); // 검은색 선
          p.point(this.x, this.y); // 현재 위치에 점을 그립니다.
        }

        step() {
          const choice = p.floor(p.random(4)); // 0, 1, 2, 3 중 하나를 무작위로 선택
          if (choice === 0) {
            this.x++; // 오른쪽으로 이동
          } else if (choice === 1) {
            this.x--; // 왼쪽으로 이동
          } else if (choice === 2) {
            this.y++; // 아래쪽으로 이동
          } else {
            this.y--; // 위쪽으로 이동
          }
        }
      }

      // setup 함수: 스케치가 시작될 때 한 번 실행됩니다.
      p.setup = () => {
        // 캔버스를 생성하고 sketchRef.current에 연결합니다.
        // Tailwind CSS를 사용하여 캔버스 크기를 반응형으로 만듭니다.
        const canvas = p.createCanvas(
          p.windowWidth * 0.8,
          p.windowHeight * 0.6
        );
        canvas.parent(sketchRef.current); // 캔버스를 특정 DOM 요소에 연결
        walker = new Walker(); // Walker 객체를 초기화합니다.
        p.background(255); // 배경을 흰색으로 설정합니다.
      };

      // draw 함수: 매 프레임마다 반복적으로 실행됩니다.
      p.draw = () => {
        walker.step(); // 워커를 한 단계 이동시킵니다.
        walker.show(); // 워커의 현재 위치에 점을 그립니다.
      };

      // 윈도우 크기가 변경될 때 캔버스 크기를 조정합니다.
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth * 0.8, p.windowHeight * 0.6);
        p.background(255); // 캔버스 크기 변경 시 배경을 다시 그려 기존 점들을 지웁니다.
      };
    };

    // p5.js 스케치 인스턴스를 생성합니다.
    const createSketch = () => {
      if (sketchRef.current) {
        // 이전에 생성된 인스턴스가 있다면 제거합니다.
        if (p5Instance) {
          p5Instance.remove();
        }
        // 새로운 p5.js 인스턴스를 생성하고 sketchRef.current에 연결합니다.
        p5Instance = new p5(sketch, sketchRef.current); // p5를 직접 임포트하여 사용합니다.
      }
    };

    createSketch(); // 컴포넌트가 마운트될 때 스케치 생성

    // 컴포넌트가 언마운트될 때 p5.js 인스턴스를 정리합니다.
    return () => {
      if (p5Instance) {
        p5Instance.remove(); // p5.js 캔버스와 관련 이벤트를 제거합니다.
      }
    };
  }, []); // 빈 의존성 배열은 이 효과가 컴포넌트 마운트 시 한 번만 실행되도록 합니다.

  return (
    // p5.js 캔버스가 렌더링될 컨테이너
    <div
      ref={sketchRef}
      className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center"
      style={{ minHeight: "300px" }} // 최소 높이 설정
    >
      {/* p5.js 캔버스가 여기에 삽입됩니다. */}
    </div>
  );
}

export default RandomWalks;
