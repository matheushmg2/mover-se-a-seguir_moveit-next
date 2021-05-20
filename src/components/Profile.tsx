import { useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

    const { level } = useContext(ChallengesContexts);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/diego3g.png" alt="Show Time" />
            <div>
                <strong>Show Time</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                    </p>
            </div>
        </div>
    );
}