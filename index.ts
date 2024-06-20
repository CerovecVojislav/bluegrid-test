import { dataHandling } from "./src/services/data-handling/data-handling";
import { fetchData, Item } from "./src/services/fetch-data/fetch-data";
import express, { Request, Response } from 'express';

const app = express();
const port = 8000;

app.get('/api/files', async (req: Request, res: Response) => {
    try{
        const data: Item | undefined = await fetchData();
        const output = await dataHandling(data);
        res.status(200).send(output);
    }
    catch(error){
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});