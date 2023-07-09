export interface Movie {
    tconst: string;
    titleType: string;
    primaryTitle: string;
    originalTitle: string;
    isAdult: number;
    startYear: string;
    endYear: string;
    runtimeMinutes: number;
    genres: string;
    [key: string]: any; // Index signature for dynamic property access
}