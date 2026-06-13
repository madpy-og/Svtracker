import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Source",
      required: true,
    },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// ── Static Methods ─────────────────────────────────────────────

IncomeSchema.statics.findByUser = function (userId) {
  return this.find({ userId }).sort({ date: -1 }).populate("source");
};

IncomeSchema.statics.createIncome = function ({ userId, source, amount, date }) {
  return this.create({ userId, source, amount, date: new Date(date) });
};

IncomeSchema.statics.deleteById = function (id) {
  return this.findByIdAndDelete(id);
};

IncomeSchema.statics.aggregateDailyByUser = function (userObjectId, startDate) {
  return this.aggregate([
    { $match: { userId: userObjectId, date: { $gte: startDate } } },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          day: { $dayOfMonth: "$date" },
        },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
  ]);
};

IncomeSchema.statics.aggregateTotalByUser = function (userObjectId) {
  return this.aggregate([
    { $match: { userId: userObjectId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
};

IncomeSchema.statics.findRecentByUser = function (userId, limit = 5) {
  return this.find({ userId }).sort({ date: -1 }).populate("source").limit(limit);
};

IncomeSchema.statics.findByUserSince = function (userId, sinceDate) {
  return this.find({ userId, date: { $gte: sinceDate } })
    .sort({ date: -1 })
    .populate("source");
};

IncomeSchema.statics.aggregateMonthlyByUser = function (userObjectId) {
  return this.aggregate([
    { $match: { userId: userObjectId } },
    {
      $group: {
        _id: { year: { $year: "$date" }, month: { $month: "$date" } },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);
};

IncomeSchema.statics.aggregateBySource = function (userObjectId) {
  return this.aggregate([
    { $match: { userId: userObjectId } },
    { $group: { _id: "$source", total: { $sum: "$amount" } } },
    {
      $lookup: {
        from: "sources",
        localField: "_id",
        foreignField: "_id",
        as: "sourceInfo",
      },
    },
    { $unwind: "$sourceInfo" },
    {
      $project: {
        name: "$sourceInfo.name",
        icon: "$sourceInfo.icon",
        total: 1,
      },
    },
    { $sort: { total: -1 } },
  ]);
};

export default mongoose.model("Income", IncomeSchema);
