import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true }
});

CategorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
    }
});

export default mongoose.model<ICategory>('Category', CategorySchema);
