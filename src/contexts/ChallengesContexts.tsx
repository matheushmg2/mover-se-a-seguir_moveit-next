import { count } from 'node:console';
import { createContext, ReactNode, useEffect, useState } from 'react';

import Cookie from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: String;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenges: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}


export const ChallengesContexts = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {

    const [level, setLevel] = useState(rest.level ??  1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ??  0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ??  0);

    const [activeChallenges, setActiveChallenges] = useState(null);

    const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 2, 3);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookie.set('level', String(level));
        Cookie.set('currentExperience', String(currentExperience));
        Cookie.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setisLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setisLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenges(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === "granted") {
            new Notification('Novo Desafio 🎉', {
                body: `Valendo ${challenge.amount} xp!`
            });
        }
    }

    function resetChallenge() {
        setActiveChallenges(null);
    }

    function completeChallenge() {
        if (!activeChallenges) {
            return;
        }

        const { amount } = activeChallenges;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;

            levelUp();
            console.log(level);
        }

        setCurrentExperience(finalExperience);
        setActiveChallenges(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContexts.Provider value={
            {
                level,
                currentExperience,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChallenges,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
                closeLevelUpModal
            }
        }>
            {children}

            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContexts.Provider>
    );
}