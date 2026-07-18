import { Schema, model, Document } from 'mongoose';

export const USER_ROLES = ['public', 'admin'] as const; 
export type UserRole = typeof USER_ROLES[number];

export interface IUser extends Document {
    clerkUserId: string;
    name: string;
    email: string;
    phoneNumber?: string;
    whatsappNumber?: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        clerkUserId: {
            type: String,
            required: true,
            unique: true, 
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
        whatsappNumber: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: USER_ROLES,
            default: 'public',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true } // gives you createdAt / updatedAt automatically
);

export const User = model<IUser>('User', userSchema);