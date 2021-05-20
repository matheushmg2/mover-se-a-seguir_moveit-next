import { useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';
export function ChallengeBox() {

    const { activeChallenges, resetChallenge, completeChallenge } = useContext(ChallengesContexts);

    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded(){
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenges ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenges.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenges.type}.svg`} />
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenges.description}</p>
                    </main>
                    <footer>
                        <button type="button" className={styles.challengeFailedButton} onClick={handleChallengeFailed}>
                            Falhei
                        </button>
                        <button type="button" className={styles.challengeSucceededButton} onClick={handleChallengeSucceeded}>
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeBoxNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                    Avance de level completando o desafio.
                </p>
                </div>
            )}
        </div>
    );
}