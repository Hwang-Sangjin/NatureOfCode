import RandomNumberDistribution from "./p5/RandomNumberDistribution";
import RandomWalks from "./p5/RandomWalks";
import Scene from "./Scene";

const FiberContainer = () => {
  return (
    <>
      {/* <Scene /> */}
      <RandomWalks />
      <RandomNumberDistribution />
    </>
  );
};

export default FiberContainer;
