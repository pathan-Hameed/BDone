import mongoose from "mongoose";

const dailySchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    isComplete: { type: Boolean, default: false}
}, { timestamps: true })

const Daily = mongoose.model('Daily', dailySchema);
export default Daily;