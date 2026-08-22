import mongoose from 'mongoose';

const messageSchema = new Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chats',
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'ai'],
        }
    }
});

const messageModel = mongoose.model('messages', messageSchema);

export default messageModel;