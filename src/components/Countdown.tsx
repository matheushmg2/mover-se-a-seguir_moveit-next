import { useContext, useEffect, useState } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {

    const {minutes, secunds, hasFinished, isActive, startCountdown, resetCountdown} = useContext(CountdownContext)

    /*const { startNewChallenge } = useContext(ChallengesContexts);

    var tempo = 0.1 * 60;

    const [time, setTime] = useState(tempo);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const secunds = time % 60;*/

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secundLeft, secundRight] = String(secunds).padStart(2, '0').split('');

    /*function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(tempo);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])*/

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secundLeft}</span>
                    <span>{secundRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button disabled className={styles.countdownButton} onClick={resetCountdown}>
                    Ciclo Encerrado.
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive} `} onClick={resetCountdown}>
                            Abandonar Ciclo
                        </button>
                    ) : (
                        <button type="button" className={styles.countdownButton} onClick={startCountdown}>
                            Iniciar um Ciclo
                        </button>
                    )}
                </>
            ) }




        </div>
    );
}