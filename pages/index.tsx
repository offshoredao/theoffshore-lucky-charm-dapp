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
    question: "1/6 How many underscores had the original Offshore name?",
    options: [1, 2, 3, 4],
    answer: 3,
    pos: 1,
  },
  {
    question: "2/6 How much will the next batch of 12 Genesis maps Cost?",
    options: ["0.12 ETH", "1.2 BTC", "1.2 FTT", "1000 USDC"],
    answer: "0.12 ETH",
    pos: 2,
  },
  {
    question: "3/6 What are Offshore Coordinates in Decentraland?",
    options: ["213;-231", "117;-121", "127;-131", "13;-44"],
    answer: "127;-131",
    pos: 3,
  },
  {
    question: "4/6 What was the first Offshore POAP?",
    options: ["Mint Party", "Wilson Birthday", "Pioneer", "Pizza Day"],
    answer: "Pioneer",
    pos: 4,
  },
  {
    question: "4/6 What's the name of our beloved Offshore bot?",
    options: ["Truck", "Tom Hanks", "Sparling", "Wilson"],
    answer: "Wilson",
    pos: 5,
  },
  {
    question: "6/6 What's the alternative focus of Offshore?",
    options: [
      "Gaming",
      "ETH Mining",
      "Weed Dispensary",
      "Metaverse real estate agency",
    ],
    answer: "Gaming",
    pos: 6,
  },
];

const Home: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [canMint, setCanMint] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const error = () => toast.error("Focus and try again.");

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
              {"Yes"}
            </button>
            <a
              href="https://www.wikihow.com/Be-Brave"
              className={styles.mainButton}
            >
              {"No"}
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
                    if (currentQuestion.pos === questions.length)
                      setCanMint(true);
                    else setCurrentQuestion(questions[currentQuestion.pos]);
                  } else {
                    error();
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
