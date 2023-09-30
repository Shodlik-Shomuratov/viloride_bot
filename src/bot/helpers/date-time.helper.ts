import { DateTime as LuxonDateTime } from "luxon";

export class DateTime {
    static getDateTime(weekCounter: number = 0): any {
        const result: any[] = [];

        for (let i = 0; i < 7; i++) {
            const date = LuxonDateTime.now()
            .plus({
                day: i,
                week: weekCounter
            })
            .setZone("UTC+5")
            .setLocale("uz")
            .toFormat('MMMM dd yyyy')
            .toString();

            const [month, day, year] = date.split(' ');

            result.push({
                day: +day,
                month: month.substring(0, 1).toUpperCase() + month.substring(1),
                year: +year 
            });
        }

        return result
    }

    static getCurrentDate() {
        const currentDate = LuxonDateTime.now()
        .setZone("UTC+5")
        .setLocale("uz")
        .toFormat('MMMM dd, yyyy')
        .toString();

        return currentDate.substring(0, 1).toUpperCase() + currentDate.substring(1);
    }
}