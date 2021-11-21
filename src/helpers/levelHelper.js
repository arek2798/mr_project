const levels = [
    {
        maxPoints: '85',
        name: 'żółtodziób'
    },
    {
        maxPoints: '150',
        name: 'amator'
    },
    {
        maxPoints: '260',
        name: 'kolarz'
    },
    {
        maxPoints: '500',
        name: 'zawodowiec'
    },
]

export const getLevelNumber = (points, next = false) => {
    let levelNumber = 0
    levels.forEach((level, index) => {
        if (!levelNumber && points < level.maxPoints) {
            levelNumber = index + 1;
        }
    });
    return next ? levelNumber + 1 : levelNumber;
}

export const getLevelName = (points, next = false) => {
    let levelName = ''
    levels.forEach((level, index) => {
        if (!levelName && points < level.maxPoints) {
            if (index < levels.length - 1)
                levelName = next ? levels[index + 1].name : level.name;
            else
                levelName = level.name;
        }
    });
    return levelName;
}

export const getPointsLimit = (points) => {
    let limit = 0;
    levels.forEach(level => {
        if (!limit && points < level.maxPoints) {
            limit = level.maxPoints;
        }
    });
    return limit;
}