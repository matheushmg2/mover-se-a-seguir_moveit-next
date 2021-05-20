import { useContext } from 'react';
import { ChallengesContexts } from '../contexts/ChallengesContexts';
import styles from '../styles/components/ExperienceBar.module.css';



export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContexts);

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

    return(
        <header className={styles.experienceBar}>
            <span>0xp</span>
            <div>
                <div className="" style={{width: `${percentToNextLevel}%`}}></div>
                <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>{currentExperience} xp</span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}