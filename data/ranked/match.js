const schema = mongoose.Schema({
    replay: String,
    map: String,
    date: Date,
    Player1: String,
    Player2: String
});
module.exports = mongoose.model("Rank", schema)