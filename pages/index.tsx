import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Theme.module.css";
import Mint from "./mint";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const questions = [
  {
    question: "How many dogs have leo?",
    options: [1, 2, 3, "N", 4, 5, 6],
    answer: "N",
  },
  {
    question: "How many hands have nacho?",
    options: [1, 2, 3, 4, 5, 6],
    answer: 2,
  },
  {
    question: "Carbon atomic number?",
    options: [1, 2, 3, 4, 5, 6],
    answer: 6,
  },
];

function getRandomInt() {
  return Math.floor(Math.random() * questions.length);
}

const Home: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [canMint, setCanMint] = useState(false);
  const error = () => toast("Not so easy? Lets try with another one.");

  useEffect(() => {
    setCurrentQuestion(questions[getRandomInt()]);
  }, []);

  if (!canMint)
    return (
      <div className={styles.container}>
        <div className={styles.mintInfoContainer}>
          <div className={styles.imageSide}>
            <h2>{currentQuestion.question}</h2>
            {currentQuestion.options.map((opt) => (
              <button
                id={opt.toString()}
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
  else return <Mint></Mint>;
};

export default Home;
