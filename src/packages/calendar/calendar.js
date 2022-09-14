const countDay = (y, m) => {
    const day31 = [1, 3, 5, 7, 8, 10, 12];
    const day30 = [4, 6, 9, 11];
    if (day31.includes(m)) {
        return 31;
    } else if (day30.includes(m)) {
        return 30;
    } else {
        if (y % 4 === 0) {
            return 29;
        }
    }
    return 28;
};
const getDay = (d, m, y = "") => {
    const nDate = new Date();
    if (!y) y = nDate.getFullYear();
    const day = new Date(`${y}-${m}-${d}`).getDay();
    return day;
};
const hasStatuses = (y, m, d, cs) => {
    const l = y + "-" + m + "-" + d;
    if (cs && cs.includes(l)) return true;
    return false;
};

export const getDateTime = (y, m, d, t = "00:00:00") => {
    return new Date(`${y}-${m}-${d} ${t}`).getTime();
};
export const getCurrentTime = (y, m, cs, isModel) => {
    // 当前月的天数
    const nDate = new Date();
    const currentDays = countDay(y, m);
    let dataList = [];
    // 当前月1号的星期
    const isDay = nDate.getDate();
    const isMonth = nDate.getMonth() + 1;
    const isYear = nDate.getFullYear();
    for (let i = 1; i <= currentDays; i++) {
        const isT = isDay === i && isMonth === m && isYear === y;
        const c = {
            isCurrent: true,
            status: true,
            isToday: isT,
            vrc: false,
            hasStatus: hasStatuses(y, m, i, cs),
            active: isModel === getDateTime(y, m, i),
            day: getDay(i, m, y),
            date: i,
            month: m,
            year: y,
        };
        dataList.push(c);
    }
    const [currentDay] = dataList;
    if (currentDay.day > 0) {
        let prevMonth = m - 1;
        let prevYear = y;
        if (prevMonth === 0) {
            prevMonth = 12;
            --prevYear;
        }
        const prevDays = countDay(prevYear, prevMonth);
        for (let i = prevDays; i > prevDays - currentDay.day; i--) {
            const c = {
                isCurrent: false,
                status: true,
                active: false,
                isToday: false,
                vrc: false,
                hasStatus: hasStatuses(prevYear, prevMonth, i, cs),
                day: getDay(i, prevMonth, prevYear),
                date: i,
                month: prevMonth,
                year: prevYear,
            };
            dataList.unshift(c);
        }
    }
    const len = dataList.length;
    if (len < 42) {
        const n = 42 - len;
        let nextMonth = m + 1;
        let nextYear = y;
        if (nextMonth === 13) {
            nextMonth = 1;
            ++nextYear;
        }
        for (let i = 1; i <= n; i++) {
            const c = {
                isCurrent: false,
                status: true,
                active: false,
                isToday: false,
                vrc: false,
                hasStatus: hasStatuses(nextYear, nextMonth, i, cs),
                day: getDay(i, nextMonth, nextYear),
                date: i,
                month: nextMonth,
                year: nextYear,
            };
            dataList.push(c);
        }
    }
    return dataList;
};
