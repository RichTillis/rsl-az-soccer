import { Team } from "./team";

export interface Favorite {
    team: Team;
    tournamentId: number;
    tournamentName: string;
}