import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';


@Injectable()
export class MyLoggerService extends ConsoleLogger {

    async logToFile(entry: any) {
        console.log('🟢🟢 LOG TO FILE')
        const formattedEntry = `${Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Brazil/East'
        }).format(new Date())}\t${entry}\n`;

        try {
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                console.log('🟢🟢 CRIANDO PASTA DE LOGS')
                await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
            }
            console.log('🟢🟢 CRIANDO ARQUIVO DE LOGS')
            await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'), formattedEntry);
        }
        catch (e) {
            if (e instanceof Error) console.error(`my-logger ERROR: ${e.message}`);
        }
    }

    log(message: string, context?: string) {
        const entry = `${context}\t${message}`;
        this.logToFile(entry);
        super.log(message, context);
    }

    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`;
        this.logToFile(entry);
        super.error(`${message} ${stackOrContext}`);
    }

}
