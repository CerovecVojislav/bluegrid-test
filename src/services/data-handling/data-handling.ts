import { Item } from "../fetch-data/fetch-data";

interface Repository {
    [repoName: string]: Repository;
}

const jsonStructure: Repository = {};

export async function dataHandling(data: Item | undefined): Promise<string> {
    data.items.forEach(item => {

        const parts = item.fileUrl.split('/');
        const firstRepo = parts[2];

        if (!jsonStructure[firstRepo]) {
            jsonStructure[firstRepo] = {};
        }

        let currentLevel = jsonStructure[firstRepo] as Repository;

        for (let i = 3; i < parts.length; i++) {
            const repoName: string = parts[i];
            if (!repoName) {
                continue;
            }
            if (!currentLevel[repoName]) {
                currentLevel[repoName] = {};
            }
            currentLevel = currentLevel[repoName] as Repository;
        }
    });

    var jsonString = JSON.stringify(jsonStructure, null, 4);
    jsonString = jsonString.replace(/:\s*\{\}/g, '');
    return await jsonString;
}