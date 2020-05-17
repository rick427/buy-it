import mongoose from 'mongoose';

const connection = {};

async function connectDatabase() {
    if(connection.isConnected){
        // use existing db connection
        console.log('Using existing connection');
        return;
    }

    const db = await mongoose.connect(process.env.MONGO_SRV, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('Database connected successfully...');
    connection.isConnected = db.connections[0].readyState;
}

export default connectDatabase;