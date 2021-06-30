const schema = mongoose.Schema({
    channel: Number,
    title: String,
    start: Date,
    end: Date,
    class: String,
    content: String
});
module.exports = strapi.model("plannings", schema)