import { ConsoleLogger, Injectable } from '@nestjs/common';
import fs from 'fs';
import { promises as fsPromises } from 'fs'
import path from 'path';


@Injectable()
    export class MyLoggerService extends ConsoleLogger {

        async logToFile(entry: string) {
            const formattedEntry = `${Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'short',
                timeZone: 'Brazil/East'
            }).format(new Date())}\t${entry}\n`;

            try {
                if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                    await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
                }
                await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'), formattedEntry);
            }
            catch (e) {
                e instanceof Error && console.error(e.message);
            }

        }

        log(message: string, context?: string) {
            const entry = `${context}\t${message}`;
            this.logToFile(entry);
            super.log(message, context);
        }

        error(message: any, stackOrContext?: string): void {
            const entry = `${stackOrContext}\t${message}`;
            this.logToFile(entry);
            super.error(message, stackOrContext);
        }

    }
