import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://veronowiti2:56432@cluster0.xax31.mongodb.net/ru-bitez').then(()=>console.log("DB Connected"));
}