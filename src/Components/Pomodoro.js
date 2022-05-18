import React, { useEffect, useState } from "react";

export default function App() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [timer, setTimer] = useState();
    const [breakTimeLeft, setBreakTimeLeft] = useState(5 * 60);
    const [showMainTimer, setShowMainTimer] = useState(false);
    const [breakTimer, setBreakTimer] = useState();
    const [hasBreakTimeStarted, setHasBreakTimeStarted] = useState(false);

    const startTimer = function (){
        setShowMainTimer(true);
        const timer = setInterval(() => {
            setTimeLeft((secondsLeft) => secondsLeft - 1);
            if (timeLeft === 0) {
                clearInterval(timer);
            }
        }, 10);
        setTimer(timer);
    };
    const startBreakTimer = function (){
        setHasBreakTimeStarted(true);
        const timer = setInterval(() => {
            setBreakTimeLeft((secondsLeft) => secondsLeft - 1);
            if (breakTimeLeft === 0) {
                clearInterval(timer);
            }
        }, 10);
        setBreakTimer(timer);
    };

    useEffect(() => {
        if (timeLeft === 0) {
            startBreakTimer();
            clearInterval(timer);
            setShowMainTimer(false);
        }
    }, [timeLeft, timer]);

    useEffect(() => {
        if (breakTimeLeft === 0) {
            clearInterval(breakTimer);
            setHasBreakTimeStarted(false);
        }
    }, [breakTimeLeft, breakTimer]);


    useEffect(() => {
        return () => {
            clearInterval(timer);
        };
    }, [timer]);
    useEffect(() => {
        return () => {
            clearInterval(breakTimer);
        };
    }, [breakTimer]);

    return (
        <div className="App">
            {!showMainTimer&& !hasBreakTimeStarted && <h1>Start Working Now</h1>}
            {showMainTimer && !hasBreakTimeStarted && <h1>Happy Focusing!</h1>}
            {hasBreakTimeStarted && <h1>Time for a break</h1>}
             {!showMainTimer && !hasBreakTimeStarted && <button onClick={startTimer}>start</button>}
            {showMainTimer && <div>{Math.floor(timeLeft/60)} : { (timeLeft % 60)} seconds left</div>}
            {hasBreakTimeStarted && <div>{Math.floor(breakTimeLeft/60)} : { (breakTimeLeft % 60)} seconds left</div>}
            {!hasBreakTimeStarted &&
            <div id="myProgress">
                <div id="myBar" style={{width: ((timeLeft/(25*60)) * 100) + "%"}}></div>
            </div>}
        </div>
    );
}