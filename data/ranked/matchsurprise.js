const schema = mongoose.Schema({
    channel: Number,
    name: String,
    value: String,
});
module.exports = ltdm.model("Matchsurprise", schema)