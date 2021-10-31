import days7Icon from './../assets/achivementsIcons/7days.svg';
import targetIcon from './../assets/achivementsIcons/target.svg';
import trafficLightIcon from './../assets/achivementsIcons/traffic-light.svg';
import signsIcon from './../assets/achivementsIcons/signs.svg';
import roadIcon from './../assets/achivementsIcons/road.svg';
import stars5Icon from './../assets/achivementsIcons/5stars.svg';
import days14Icon from './../assets/achivementsIcons/14days.svg';
import bikeIcon from './../assets/achivementsIcons/bike.svg';
import { getLevelNumber } from './levelHelper';

const badges = [
    {
        icon: days7Icon,
        title: 'Ucz się 7 dni z rzędu'
    },
    {
        icon: targetIcon,
        title: 'Zalicz 3 testy z rzędu'
    },
    {
        icon: signsIcon,
        title: 'Opanuj 30% materiału'
    },
    {
        icon: roadIcon,
        title: 'Opanuj 60% materiału'
    },
    {
        icon: trafficLightIcon,
        title: 'Opanuj 90% materiału'
    },
    {
        icon: stars5Icon,
        title: 'Osiągnij 5 poziom'
    },
    {
        icon: days14Icon,
        title: 'Ucz się 14 dni z rzędu'
    },
    {
        icon: bikeIcon,
        title: 'Zalicz 6 testów'
    },
]

export const getBadges = () => badges;

const parseDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const datediff = (first, second) => {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

export const checkMyBadges = (userStats, tests, lessons) => {
    const myBadges = [];
    let currectLearnLevel, finishedTestNum
    let loginDaysInRow, daysDiff, failed, currentDate;

    finishedTestNum = 0;
    userStats.testsStats.forEach(stats => stats.maksScore === 100 && finishedTestNum++);
    currectLearnLevel = (userStats.lessonsStats.length + finishedTestNum) / (lessons.length + tests.length) * 100;

    loginDaysInRow = 0;
    daysDiff = 0;
    failed = false;
    currentDate = new Date();

    let i = userStats.loginStats.length - 1
    while (i >= 0 && !failed) {
        const element = userStats.loginStats[i];
        if (datediff(parseDate(new Date(element.loginDate)), parseDate(currentDate)) === daysDiff) {
            loginDaysInRow++;
            daysDiff++;
        } else {
            failed = true;
        }
        i--;
    }

    badges.forEach((badge, index) => {
        switch (index) {
            case 0:
                if (loginDaysInRow >= 7) myBadges.push(index);
                break;
            case 1:
                if (userStats.testsInRow >= 3) myBadges.push(index);
                break;
            case 2:
                if (currectLearnLevel >= 30) myBadges.push(index);
                break;
            case 3:
                if (currectLearnLevel >= 60) myBadges.push(index);
                break;
            case 4:
                if (currectLearnLevel >= 90) myBadges.push(index);
                break;
            case 5:
                if (getLevelNumber(userStats.points) >= 5) myBadges.push(index);
                break;
            case 6:
                if (loginDaysInRow >= 14) myBadges.push(index);
                break;
            case 7:
                if (finishedTestNum >= 6) myBadges.push(index);
                break;
            default:
                break;
        }
    });

    return myBadges;
}

