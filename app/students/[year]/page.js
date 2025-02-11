import "./students.css";
import { Drower } from "@/components/Drawrer/Drower";
import { Luckiest_Guy } from 'next/font/google'

const lilitaOne = Luckiest_Guy({ subsets: ['latin'], weight: "400" });

export const metadata = {
    title: "Students - CSE Bootcamp 2.0",
    description: "About your peers",
};

export default async function StudentPage({ params: { year } }) {
    let studentsList = [];

    try {
        const intYear = Number.parseInt(year[3]);
        const response = await fetch(process.env.HOST + "/api/db");
        try {
            studentsList = (await response.json())?.filter(
                (a) => a.year === intYear
            );
        } catch (err) {
            throw new Error(response.status);
        }
    } catch (error) {
        return (
            <div className=" mt-52">
                <h1>Something went wrong. Status:{error.message}</h1>
            </div>
        );
    }

    return (
        <>
        <div>
            <p className={'title '+lilitaOne.className}>
                CSE {year}
            </p>
            <p className={'mkc-text '+lilitaOne.className}>
                {(year === "2022") ? "The Sophomores" : "The Neophytes"}
            </p>
        </div>

        <Drower className={lilitaOne.className}
            userlist={studentsList?.sort((a, b) => a.id.localeCompare(b.id))}
        />
        </>
    );
}



export async function generateStaticParams() {
    return [{ year: "2022" }, { year: "2023" }];
}