const mongoose = require('mongoose');
const { Schema } = mongoose;

const ListSchema = new Schema({
    name: String
});

const ListModel = mongoose.model("LIST", ListSchema,'LIST');

module.exports = ListModel;
