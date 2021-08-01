import days7Icon from './../assets/achivementsIcons/7days.svg';
import targetIcon from './../assets/achivementsIcons/target.svg';
import trafficLightIcon from './../assets/achivementsIcons/traffic-light.svg';
import signsIcon from './../assets/achivementsIcons/signs.svg';
import roadIcon from './../assets/achivementsIcons/road.svg';
import stars5Icon from './../assets/achivementsIcons/5stars.svg';
import days14Icon from './../assets/achivementsIcons/14days.svg';
import bikeIcon from './../assets/achivementsIcons/bike.svg';

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

