import { Schema, model } from 'mongoose';

export interface Game {
    name: string;
    address: string;
    numberOfPeople: number;
    date: Date | string;
    time: string;
    fieldNumber: number;
}

const GameSchema = new Schema<Game>({
    name: {type: String, required: true},
    address: {type: String, required: true},
    numberOfPeople: {type: Number, required: true},
    time: {type: String, required: true},
    date: {type: Date, required: true},
    fieldNumber: {type: Number, required: true}
});

export default model<Game>('Game', GameSchema)