import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Theme.module.css";
import Mint from "./mint";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const intro = {
  title: "Let's prove you are worth a Mystic reward.",
  ready: "Are you ready?",
};

const questions = [
  {
    question: "How many underscores had the original Offshore name?",
    options: [1, 2, 3, 4],
    answer: 3,
  },
  {
    question: "How much will the next batch of 12 Genesis maps Cost?",
    options: ["1.2 ETH", "1.2 BTC", "1.2 FTT", "12 MATIC", "1000 USDC"],
    answer: "1.2 ETH",
  },
  {
    question: "What are Offshore Coordinates in Decentraland?",
    options: ["213;-231", "117;-121", "127;-131", "13;-44"],
    answer: "127;-131",
  },
];

function getRandomInt() {
  return Math.floor(Math.random() * questions.length);
}

const Home: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [canMint, setCanMint] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const error = () => toast.error("Not so easy? Lets try with another one.");

  useEffect(() => {
    setCurrentQuestion(questions[getRandomInt()]);
  }, []);

  if (!isReady) {
    return (
      <div className={styles.container}>
        <div className={styles.mintInfoContainer}>
          <div className={styles.imageSide}>
            <h2>{intro.title}</h2>
            <h2>{intro.ready}</h2>
            <button
              onClick={() => {
                <ToastContainer theme="dark" />;
                setIsReady(true);
              }}
              className={styles.mainButton}
            >
              Yes
            </button>
            <a href="https://www.wikihow.com/Be-Brave" className={styles.mainButton}>
              No
            </a>
          </div>
        </div>
        <ToastContainer theme="dark" />
      </div>
    );
  }

  if (!canMint)
    return (
      <div className={styles.container}>
        <div className={styles.mintInfoContainer}>
          <div className={styles.imageSide}>
            <h2>{currentQuestion.question}</h2>
            {currentQuestion.options.map((opt) => (
              <button
                id={opt.toString()}
                key={opt.toString()}
                onClick={() => {
                  if (currentQuestion.answer === opt) {
                    setCanMint(true);
                  } else {
                    error();
                    setCurrentQuestion(questions[getRandomInt()]);
                  }
                }}
                className={styles.mainButton}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <ToastContainer theme="dark" />
      </div>
    );
  if (canMint && isReady) return <Mint></Mint>;
  else return <></>;
};

export default Home;
