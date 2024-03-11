'use client';

import { useEffect, useState } from 'react';

export default function Timer() {
    const tickAudio = new Audio('https://freesound.org/data/previews/254/254316_4062622-lq.mp3');
    const alarmAudio = new Audio('https://cdn.freesound.org/previews/24/24766_103578-hq.mp3')

    const [time, setTime] = useState(25*60);
    const [isActive, setIsActive] = useState(false);
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    const [breakTime, setBreakTime] = useState(5*60);
    let breakMinutes = Math.floor(breakTime / 60);
    let breakSeconds = breakTime % 60;
    const [isBreakActive, setIsBreakActive] = useState(false);

    let timeEntered = time;
    let breakTimeEntered = breakTime;

    const [timeStarted, setTimeStarted] = useState(false);
    const [breakStarted, setBreakStarted] = useState(false);

    const changeTime = () => {
        if (isActive && time > 0) {
            setTime(time-1);
            minutes = Math.floor(time / 60);
            seconds = time % 60;
            if(time < 4 && time > 0) {
                tickAudio.play();
            }
        }
        if (time === 0 && !isBreakActive && isActive) {
            setIsActive(false);
            setIsBreakActive(true);
            setTime(10);
            minutes = Math.floor(time / 60);
            seconds = time % 60;
            alarmAudio.play();
            setBreakStarted(true);
            setTimeStarted(false);
        }
        if (isBreakActive && breakTime > 0) {
            setBreakTime(breakTime-1);
            breakMinutes = Math.floor(breakTime / 60);
            breakSeconds = breakTime % 60;
            if(time < 4 && time > 0) {
                tickAudio.play();
            }
        }
        if (breakTime === 0 && isBreakActive && !isActive) {
            setIsBreakActive(false);
            setIsActive(true);
            setBreakTime(10);
            breakMinutes = Math.floor(breakTime / 60);
            breakSeconds = breakTime % 60;
            alarmAudio.play();
            setBreakStarted(false);
            setTimeStarted(true);
        }
    
    }
    useEffect(() => {
        const interval = setInterval(() => changeTime(), 1000);
        return () => clearInterval(interval);
}, [time, isActive, isBreakActive, breakTime]);
    return (
        <div className="flex flex-col items-center w-full">
            <form className="flex flex-col items-center p-8 text-black text-lg">
                <label htmlFor="time" className="text-white">Set Time:</label>
                <input 
                type="number" 
                id="time" 
                name="time" 
                value={minutes}
                onChange={(e) => {
                    setTime(e.target.value ? parseInt(e.target.value)*60 : 0)
                }}
                className="w-1/3 align-middle text-center"  
                />
                <label htmlFor="breakTime" className="text-white">Set Break Time:</label>
                <input 
                type="number" 
                id="breakTime" 
                name="breakTime" 
                value={breakMinutes} 
                onChange={(e) => setBreakTime(e.target.value ? parseInt(e.target.value)*60 : 0)}
                className="w-1/3 align-middle text-center" 
                />
            </form>
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-2xl"
            onClick={() => {
                if(!timeStarted && !breakStarted) {
                    setIsActive(true);
                    setTimeStarted(true);
                }
                if(timeStarted){
                    setIsActive(!isActive);
                }
                if(breakStarted){
                    setIsBreakActive(!isBreakActive);
                }
            }}>{isActive || isBreakActive ? 'PAUSE' : 'START'}</button>
            {isActive ? 
            <h1 className="text-lg lg:text-6xl text-white">Time: {minutes}:{seconds > 9 ? seconds : '0' + seconds}</h1> :
            <h1 className="text-lg lg:text-6xl text-gray-500">Time: {minutes}:{seconds > 9 ? seconds : '0' + seconds}</h1>
            }
            {isBreakActive ? 
            <h2 className="text-lg lg:text-4xl text-white">Break Time: {breakMinutes}:{breakSeconds > 9 ? breakSeconds : '0' + breakSeconds}</h2> :
            <h2 className="text-lg lg:text-4xl text-gray-500">Break Time: {breakMinutes}:{breakSeconds > 9 ? breakSeconds : '0' + breakSeconds}</h2>
            }
            
            
        </div>
    );
}