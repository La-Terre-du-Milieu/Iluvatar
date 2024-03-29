var Schema = mongoose.Schema;

const RankSchema = new Schema({
    player: { type: String, required: true},
    point: { type: Number, default: 0 },
    win: { type: Number, default: 0 },
    lose: { type: Number, default: 0 }
});

module.exports = ltdm.model("Rank", RankSchema)