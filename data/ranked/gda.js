const schema = mongoose.Schema({
    tour: Number,
    img: String,
});
module.exports = mongoose.model("Gda", schema)