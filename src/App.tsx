import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Box = styled(motion.div)`
  width: 500px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  &:nth-child(1) {
    transform-origin: bottom right;
  }
  &:nth-child(2) {
    transform-origin: bottom left;
  }
  &:nth-child(3) {
    transform-origin: top right;
  }
  &:nth-child(4) {
    transform-origin: top left;
  }
`;

const Circle = styled(motion.div)`
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  place-self: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled(motion.button)`
  color: tomato;
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 8px;
`;
const OverlayBtn = styled(motion.button)`
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 8px;
  scale: 1.2;
  color: blue;
`;

const boxVariants = {
  normal: { scale: 1 },
  hover: { scale: 1.2 },
};

const btnVariants = {
  start: { scale: 1 },
  end: { scale: 1.2 },
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [show, setShow] = useState(false);
  const onClick = () => setShow((i) => !i);

  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            variants={boxVariants}
            whileHover="hover"
            initial="normal"
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
          >
            {show && n === "2" && <Circle layoutId="show" />}
            {!show && n === "3" && <Circle layoutId="show" />}
          </Box>
        ))}
      </Grid>

      {show ? (
        <OverlayBtn onClick={onClick}>Switch</OverlayBtn>
      ) : (
        <Btn variants={btnVariants} onClick={onClick}>
          Switch
        </Btn>
      )}

      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Box
              layoutId={id}
              style={{ width: 500, height: 500, backgroundColor: "white" }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
