import { Schema, model } from 'mongoose';

export interface User {
    username: string;
    email: string;
    password: string;
    role: string; // admin, user
    created_at: Date;
    updated_at: Date;
}

const UserSchema = new Schema<User>({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: "user", enum: ["user", "admin"]},
    created_at: {type: Date, required: true},
    updated_at: {type: Date, required: true},
});

export default model<User>("User", UserSchema);