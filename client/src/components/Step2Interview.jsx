import React, { useEffect, useRef, useState } from "react";
import maleVideo from "../assets/videos/male-ai.mp4";
import femaleVideo from "../assets/videos/female-ai.mp4";
import Timer from "./Timer";
import { motion } from "motion/react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import axios from "axios";
import { ServerUrl } from "../App";

function Step2Interview({ interviewData, onFinish }) {

  const interviewId =
    interviewData?.interviewId ||
    interviewData?._id ||
    interviewData?.id ||
    null;

  const questions = Array.isArray(interviewData?.questions)
    ? interviewData.questions
    : [];

  const userName =
    interviewData?.userName ||
    interviewData?.username ||
    interviewData?.name ||
    "there";


  const [isIntroPhase, setIsIntroPhase] =useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] =useState("");
  const [feedback, setFeedback] =useState("");
 const [isMicOn, setIsMicOn] =useState(false);
 const [isAIPlaying, setIsAIPlaying] =useState(false);
 const [isSubmitting, setIsSubmitting] =useState(false);
 const [selectedVoice, setSelectedVoice] =useState(null);
 const [voiceGender, setVoiceGender] =useState("female");
 const [subtitle, setSubtitle] =useState("");
const [error, setError] =useState("");

  const [timeLeft, setTimeLeft] =useState( questions[0]?.timeLimit || 60);

  // Timer should start ONLY after AI finishes asking question
  const [isQuestionReady, setIsQuestionReady] =useState(false);
  const recognitionRef = useRef(null);
  const videoRef = useRef(null);
 const finalTranscriptRef = useRef("");
 const timeoutSubmittedRef = useRef(false);
const currentQuestion = questions[currentIndex];


  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;


  useEffect(() => {
  if (!window.speechSynthesis) {
      return;
    }

    const loadVoices = () => {

      const voices =
        window.speechSynthesis.getVoices();

      if (!voices.length) {
        return;
      }

      const femaleVoice =
        voices.find((voice) => {

          const name =
            voice.name.toLowerCase();

          return (
            name.includes("zira") ||
            name.includes("samantha") ||
            name.includes("female") ||
            name.includes("susan") ||
            name.includes("karen")
          );
        });


      if (femaleVoice) {

        setSelectedVoice(femaleVoice);
        setVoiceGender("female");

        return;
      }

      const maleVoice =
        voices.find((voice) => {

          const name =
            voice.name.toLowerCase();

          return (
            name.includes("david") ||
            name.includes("mark") ||
            name.includes("male") ||
            name.includes("daniel")
          );
        });


      if (maleVoice) {

        setSelectedVoice(maleVoice);
        setVoiceGender("male");

        return;
      }

      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };


    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;

     return () => {window.speechSynthesis.onvoiceschanged =null;
    };

  }, []);

  const speakText = (text) => {

    return new Promise((resolve) => {
      if (!text) {
        resolve();
        return;
      }

 if (
        !window.speechSynthesis ||!selectedVoice
      ) {
        resolve();
        return;
      }


      const humanText = text
        .replace(/,/g, ", ...")
        .replace(/\./g, ".  ...");


      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;

      utterance.rate =0.92;
      utterance.pitch =1.05;
      utterance.volume =1;

  utterance.onstart = () => {

        console.log("AI started speaking");
        setIsAIPlaying(true);
        setSubtitle(text);

        // Stop microphone
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch (error) {
            console.log(error);
          }

        }
        setIsMicOn(false);


        // Start interviewer video
        if (videoRef.current) {

          videoRef.current.currentTime = 0;

          videoRef.current
            .play()
            .catch((error) => {
              console.log(
                "Video play error:",
                error
              );
            });

        }

      };

      utterance.onend = () => {

        console.log("AI finished speaking");

        setIsAIPlaying(false);

        setSubtitle("");

        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;

        }
       resolve();

      };

      utterance.onerror = (event) => {

        console.log("Speech error:",event);

        setIsAIPlaying(false);
        setSubtitle("");


        if (videoRef.current) {
           videoRef.current.pause();
           videoRef.current.currentTime = 0;
          }
      resolve();

      };


      setSubtitle(text);

      window.speechSynthesis.speak(
        utterance
      );

    });

  };

  const startMic = () => {

    if (isAIPlaying) {

      console.log(
        "AI is speaking. Cannot start microphone."
      );

      return;

    }


    if (!isQuestionReady) {

      console.log(
        "Question is not ready yet."
      );

      return;

    }


    if (feedback) {
      return;
    }


    if (isSubmitting) {

      return;

    }


    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      alert(
        "Speech recognition is not supported in this browser. Please use Google Chrome."
      );

      return;

    }


    // Stop old recognition if any
    if (recognitionRef.current) {

      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log(error);
      }

    }


    // Keep existing typed answer
    finalTranscriptRef.current =
      answer.trim();


    const recognition =
      new SpeechRecognition();


    recognition.continuous =
      true;

    recognition.interimResults =
      true;

    recognition.lang =
      "en-US";


    // ------------------------------
    // START
    // ------------------------------

    recognition.onstart = () => {

      console.log(
        "Microphone started"
      );

      setIsMicOn(true);

    };


    // ------------------------------
    // RESULT
    // ------------------------------

    recognition.onresult = (
      event
    ) => {

      let finalText = "";
      let interimText = "";


      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {

        const transcript =
          event.results[i][0].transcript;


        if (
          event.results[i].isFinal
        ) {

          finalText +=
            transcript + " ";

        } else {

          interimText +=
            transcript;

        }

      }


      // Add only FINAL speech to permanent text
      if (finalText.trim()) {

        finalTranscriptRef.current =
          finalTranscriptRef.current
            ? `${finalTranscriptRef.current} ${finalText.trim()}`
            : finalText.trim();

      }


      // Show final + current interim
      const combinedText =
        `${finalTranscriptRef.current} ${
          interimText || ""
        }`.trim();


      setAnswer(
        combinedText
      );

    };


    // ------------------------------
    // ERROR
    // ------------------------------

    recognition.onerror = (
      event
    ) => {

      console.log(
        "Speech recognition error:",
        event.error
      );


      if (
        event.error !== "no-speech" &&
        event.error !== "aborted"
      ) {

        setError(
          `Microphone error: ${event.error}`
        );

      }


      setIsMicOn(false);

    };


    // ------------------------------
    // END
    // ------------------------------

    recognition.onend = () => {

      console.log(
        "Microphone stopped"
      );

      setIsMicOn(false);

    };


    recognitionRef.current =
      recognition;


    try {

      recognition.start();

    } catch (error) {

      console.log(
        "Could not start microphone:",
        error
      );

    }

  };


  // =====================================================
  // STOP MICROPHONE
  // =====================================================

  const stopMic = () => {

    if (
      recognitionRef.current
    ) {

      try {

        recognitionRef.current.stop();

      } catch (error) {

        console.log(
          "Stop microphone error:",
          error
        );

      }

    }

    setIsMicOn(false);

  };


  // =====================================================
  // TOGGLE MICROPHONE
  // =====================================================

  const toggleMic = () => {

    if (isAIPlaying) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    if (!isQuestionReady) {
      return;
    }


    if (isMicOn) {

      stopMic();

    } else {

      startMic();

    }

  };


  // =====================================================
  // INTRO + QUESTION
  // =====================================================

  useEffect(() => {

    if (!selectedVoice) {
      return;
    }

    if (!questions.length) {
      return;
    }


    let cancelled = false;


    const runSpeech = async () => {

      // =================================================
      // INTRO
      // =================================================

      if (isIntroPhase) {

        await speakText(
          `Hi ${
            userName || "there"
          }, it's great to meet you today. I hope you're feeling confident and ready.`
        );


        if (cancelled) return;


        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        );


        if (cancelled) return;


        setIsIntroPhase(false);

        return;

      }


      // =================================================
      // QUESTION
      // =================================================

      if (
        !currentQuestion
      ) {
        return;
      }


      setIsQuestionReady(false);

      setTimeLeft(
        currentQuestion.timeLimit ||
          60
      );

      timeoutSubmittedRef.current =
        false;


      await new Promise(
        (resolve) =>
          setTimeout(resolve, 700)
      );


      if (cancelled) return;


      // Last question announcement
      if (
        currentIndex ===
        questions.length - 1
      ) {

        await speakText(
          "Alright, this one might be a bit more challenging."
        );

        if (cancelled) return;

      }


      // Speak question
      await speakText(
        currentQuestion.question
      );


      if (cancelled) return;


      // IMPORTANT:
      // Timer starts only now
      setTimeLeft(
        currentQuestion.timeLimit ||
          60
      );

      setIsQuestionReady(true);

    };


    runSpeech();


    return () => {

      cancelled = true;

    };

  }, [selectedVoice,isIntroPhase,currentIndex,]);


  // =====================================================
  // TIMER
  // =====================================================

  useEffect(() => {

    if (isIntroPhase) {
      return;
    }

    if (!currentQuestion) {
      return;
    }

    if (!isQuestionReady) {
      return;
    }

    if (isAIPlaying) {
      return;
    }

    if (feedback) {
      return;
    }

    if (isSubmitting) {
      return;
    }


    const timer =
      setInterval(() => {
        setTimeLeft((prev) => {

          if (prev <= 1) {
            clearInterval(timer);
             return 0;
        }

          return prev - 1;

        });

      }, 1000);


    return () => {

      clearInterval(timer);

    };

  }, [
    isIntroPhase,
    currentQuestion,
    currentIndex,
    isQuestionReady,
    isAIPlaying,
    feedback,
    isSubmitting,
  ]);


  // =====================================================
  // AUTO SUBMIT WHEN TIMER = 0
  // =====================================================

  useEffect(() => {

    if (isIntroPhase) return;

    if (!currentQuestion) return;

    if (!isQuestionReady) return;

    if (timeLeft !== 0) return;

    if (isSubmitting) return;

    if (feedback) return;

    if (
      timeoutSubmittedRef.current
    ) {
      return;
    }


    timeoutSubmittedRef.current =
      true;


    submitAnswer(true);

  }, [
    timeLeft,
    isIntroPhase,
    currentQuestion,
    isQuestionReady,
    isSubmitting,
    feedback,
  ]);


  // =====================================================
  // SUBMIT ANSWER
  // =====================================================

  const submitAnswer = async (
    isTimeout = false
  ) => {

    if (isSubmitting) {
      return;
    }


    if (!currentQuestion) {

      setError(
        "Current question was not found."
      );

      return;

    }


    if (!interviewId) {
     setError("Interview ID is missing. Please restart the interview.");

      console.error(
        "Missing interviewId:",
        interviewData
      );

      return;

    }


    if (
      !isTimeout &&
      !answer.trim()
    ) {

      setError(
        "Please enter or speak an answer before submitting."
      );

      return;

    }


    stopMic();
    setIsSubmitting(true);
     setError("");
   
     try {

      const timeTaken =
        Math.max(0,(currentQuestion.timeLimit || 60) - timeLeft);

   console.log("Submitting answer:",
        {
          interviewId,
          questionIndex:currentIndex,
          answer:answer.trim(),
          timeTaken,
        }
      );
  const result = await axios.post(`${ServerUrl}/api/interview/submit-answer`,
          {
            interviewId,
            questionIndex:currentIndex,
            answer: answer.trim(),
            timeTaken,
          },{withCredentials: true,}
        );


      console.log("Submit answer response:",result.data);

   const generatedFeedback = result.data?.feedback || "Thank you for your answer.";

   // Show feedback
      setFeedback(generatedFeedback);

      await speakText(generatedFeedback);


    } catch (error) {

      console.error("FAILED TO SUBMIT ANSWER:",error);
      console.error("BACKEND RESPONSE:", error?.response?.data);

       setError(
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to submit answer. Please try again."
      );


    } finally {
      setIsSubmitting(false);
    }

  };

  const handleNext = async () => {
     if (isAIPlaying) {
      return;
    }

    if (isSubmitting) {
      return;
    }
    stopMic();

    if (
      currentIndex + 1 >= questions.length
    ) {

      await finishInterview();
      return;

    }

    setAnswer("");
    setFeedback("");
    setSubtitle("");
    setError("");
    setIsQuestionReady(false);
    finalTranscriptRef.current = "";

 setCurrentIndex((prev) => prev + 1);
 };


  // =====================================================
  // FINISH INTERVIEW
  // =====================================================

  const finishInterview = async () => {
    stopMic();
    setIsMicOn(false);
     if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
     }

    if (videoRef.current) {
        try {
           videoRef.current.pause();
           videoRef.current.currentTime = 0;
       } catch (error) {
          console.log(error);

        }

      }

   if (!interviewId) {

        setError("Interview ID is missing. Cannot finish interview.");
        return;
    }

    try {
        const result = await axios.post(`${ServerUrl}/api/interview/finish`,
            {
              interviewId,
            },
            {
              withCredentials: true,
            }
          );

  console.log("Interview finished:",result.data);

   if (onFinish) {
      onFinish(result.data);
    }
   } catch (error) {
      console.error("Finish interview error:",error);
     
      setError(error?.response?.data?.message || "Could not finish the interview.");

      }

    };

  useEffect(() => {
     return () => {

      if (
        recognitionRef.current
      ) {

        try {
          recognitionRef.current.stop();
        } catch (error) {
           console.log(error);
       }

    try {
       recognitionRef.current.abort();
      } catch (error) {
         console.log(error);
       }
    }


      if(window.speechSynthesis) {

        window.speechSynthesis.cancel();

      }
      if (videoRef.current) {

        try {
          videoRef.current.pause();

        } catch (error) {
          console.log(error);
       }

      }
   };

  }, []);

  if (!interviewData) {
     return (
         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
         <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
         <h2 className="text-xl font-bold text-red-600">
            Interview data is missing
          </h2>

          <p className="text-gray-500 mt-2">Please restart the interview.</p>

        </div>
      </div>

    );

  }

  if (!questions.length) {
     return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
           <h2 className="text-xl font-bold text-red-600">
            No interview questions found
            </h2>
            <p className="text-gray-500 mt-2">Please restart the interview.</p>

        </div>

      </div>

    );

  }

  return (
    <div className=" min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 flex items-center
        justify-center p-4 sm:p-6"
    >

      <div
        className="w-full max-w-[1400px] min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col
          lg:flex-row overflow-hidden"
      >


        {/* =================================================
            LEFT SIDE - INTERVIEWER
        ================================================== */}

        <div
          className="w-full lg:w-[35%] bg-white flex flex-col
            items-center p-6 space-y-5 border-b lg:border-b-0 lg:border-r border-gray-200"
        >


          {/* ==============================
              VIDEO
          =============================== */}

          <div
            className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl bg-black"
          >

            <video
              ref={videoRef}
              src={videoSource}
              muted
              playsInline
              preload="auto"
              className="w-full aspect-video object-cover"
            />

          </div>


          {/* ==============================
              SUBTITLE
          =============================== */}

          {subtitle && (

            <div
              className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-4
                shadow-sm"
            >

              <p
                className="text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed"
              >
                {subtitle}
              </p>

            </div>

          )}


          {/* ==============================
              TIMER BELOW INTERVIEWER
          =============================== */}

          {!isIntroPhase && currentQuestion && (

            <div
              className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-5">

              {/* Interview status */}

              <div
                className="flex justify-between items-center mb-4"
              >

                <span
                  className="text-sm text-gray-500">
                  Interview Status
                </span>


                {isAIPlaying && (

                  <span
                    className="text-sm font-semibold text-emerald-600">
                    AI Speaking
                  </span>

                )}


                {!isAIPlaying &&
                  isMicOn && (

                    <span
                      className="text-smfont-semibold text-red-500">
                      Listening...
                    </span>

                  )}


                {!isAIPlaying && !isMicOn &&
                  !feedback && (

                    <span
                      className="text-sm font-semibold text-gray-400">
                      Ready
                    </span>

                  )}

              </div>
        <div
                className="h-px bg-gray-200 mb-5"/>


              {/* TIMER */}

              <div
                className="flex justify-center">

                <Timer
                  timeLeft={
                    timeLeft
                  }
                  totalTime={
                    currentQuestion.timeLimit || 60
                  }
                />

              </div>


              <div
                className="h-px bg-gray-200 my-5"/>


              {/* QUESTION COUNTER */}

              <div
                className="grid grid-cols-2 gap-6 text-center">

                <div>

                  <div
                    className="text-2xl font-bold text-emerald-600">
                    {currentIndex + 1}
                  </div>

                  <div
                    className="text-xs text-gray-400">
                    Current Question
                  </div>

                </div>


                <div>

                  <div
                    className="text-2xl font-bold text-emerald-600">
                    {questions.length}
                  </div>

                  <div
                    className="text-xs text-gray-400">
                    Total Questions
                  </div>

                </div>

              </div>

            </div>

          )}

        </div>


        {/* =================================================
            RIGHT SIDE - QUESTION + ANSWER
        ================================================== */}

        <div
          className="flex-1 flex flex-col p-4 sm:p-6 md:p-8">


          {/* ==============================
              TITLE
          =============================== */}

          <h2
            className="text-xl sm:text-2xl font-bold text-emerald-600 mb-6">
            AI Smart Interview
          </h2>


          {/* ==============================
              QUESTION
          =============================== */}

          {!isIntroPhase && (

            <div
              className="relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">

              <p
                className="
                  text-xs
                  text-gray-400
                  mb-2
                "
              >
                {currentIndex + 1} of{" "}
                {questions.length}
              </p>


              <div
                className="text-base sm:text-lg font-semibold text-gray-800 leading-relaxed">
                {currentQuestion?.question}
              </div>

            </div>

          )}


          {/* ==============================
              INTRO MESSAGE
          =============================== */}

          {isIntroPhase && (

            <div
              className="flex-1 flex items-center justify-center text-center p-6">

              <div>

                <h3
                  className="text-2xl font-bold text-gray-800 mb-3">
                  Welcome
                  {userName
                    ? `, ${userName}`
                    : ""}
                  !
                </h3>

                <p
                  className="text-gray-500">
                  Please listen to the AI
                  interviewer.
                </p>

              </div>

            </div>

          )}


          {/* ==============================
              ANSWER AREA
          =============================== */}

          {!isIntroPhase && (

            <>

              <textarea
                value={answer}
                onChange={(e) => {

                  setAnswer(
                    e.target.value
                  );

                  finalTranscriptRef.current =
                    e.target.value;

                }}
                disabled={
                  isAIPlaying ||
                  isSubmitting ||
                  !isQuestionReady ||
                  !!feedback
                }
                placeholder={
                  isAIPlaying
                    ? "Please wait for the interviewer..."
                    : !isQuestionReady
                    ? "Please wait..."
                    : feedback
                    ? "Answer submitted."
                    : "Type your answer here..."
                }
                className="flex-1 min-h-[200px] bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none
                  border border-gray-200 focus:ring-2 focus:ring-emerald-500 transition text-gray-800 disabled:opacity-70
                  disabled:cursor-not-allowed"/>


              {/* ==============================
                  ERROR
              =============================== */}

              {error && (

                <div
                  className="mt-4 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3
                    text-sm">
                  {error}
                </div>

              )}


              {/* =================================================
                  BEFORE FEEDBACK
              ================================================== */}

              {!feedback && (

                <div
                  className="flex items-center gap-4 mt-6">

                  {/* MIC */}

                  <motion.button
                    type="button"
                    onClick={toggleMic}
                    whileTap={{
                      scale: 0.9,
                    }}
                    disabled={
                      isAIPlaying ||
                      isSubmitting ||
                      !isQuestionReady
                    }
                    title={
                      isMicOn
                        ? "Stop microphone"
                        : "Start microphone"
                    }
                    className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full text-white
                      shadow-lg transition
                      ${
                        isMicOn
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-black hover:bg-gray-800"
                      }
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    `}
                  >

                    {isMicOn ? (

                      <FaMicrophone
                        size={20}
                      />

                    ) : (

                      <FaMicrophoneSlash
                        size={20}
                      />

                    )}

                  </motion.button>


                  {/* SUBMIT */}

                  <motion.button
                    type="button"
                    onClick={() =>
                      submitAnswer(false)
                    }
                    disabled={
                      isSubmitting ||
                      isAIPlaying ||
                      !isQuestionReady ||
                      !answer.trim()
                    }
                    whileTap={{
                      scale: 0.95,
                    }}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg
                      hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed">

                    {isSubmitting
                      ? "Submitting..."
                      : "Submit Answer"}

                  </motion.button>

                </div>

              )}


              {/* ==============================
                  FEEDBACK
              =============================== */}

              {feedback && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm">

                  <h3
                    className="font-semibold text-emerald-700 mb-3">
                    AI Feedback
                  </h3>


                  <p
                    className="text-gray-700 leading-relaxed">
                    {feedback}
                  </p>


                  {/* NEXT */}

                  <button
                    type="button"
                    onClick={
                      handleNext
                    }
                    disabled={
                      isAIPlaying ||
                      isSubmitting
                    }
                    className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md
                      hover:opacity-90 transition flex items-center justify-center gap-2 font-semibold disabled:opacity-50
                      disabled:cursor-not-allowed">

                    {currentIndex + 1 >=
                    questions.length
                      ? "Finish Interview"
                      : "Next Question"}

                    <BsArrowRight
                      size={18}
                    />

                  </button>


                  {isAIPlaying && (

                    <p
                      className="text-xs text-gray-400 text-center mt-3">
                      Please wait while the
                      AI finishes speaking.
                    </p>

                  )}

                </motion.div>

              )}

            </>

          )}

        </div>

      </div>

    </div>

  );
}

export default Step2Interview;