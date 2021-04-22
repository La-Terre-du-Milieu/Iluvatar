var Schema = mongoose.Schema;

const ElfeSchema = new Schema({
    player: { type: String, required: true},
    point: { type: Number, default: 0 },
    win: { type: Number, default: 0 },
    lose: { type: Number, default: 0 }
});

module.exports = mongoose.model("Elfe", ElfeSchema)