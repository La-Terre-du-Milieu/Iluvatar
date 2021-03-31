var Schema = mongoose.Schema;

const RankSchema = new Schema({
    player: String,
    point: Number,
});

module.exports = mongoose.model("Rank", RankSchema)