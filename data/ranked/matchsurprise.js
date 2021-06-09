const schema = mongoose.Schema({
    channel: Number,
    name: String,
    value: String,
});
module.exports = mongoose.model("Matchsurprise", schema)