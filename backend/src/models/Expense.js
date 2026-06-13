import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// ── Static Methods ─────────────────────────────────────────────

ExpenseSchema.statics.findByUser = function (userId) {
  return this.find({ userId }).sort({ date: -1 }).populate("category");
};

ExpenseSchema.statics.createExpense = function ({ userId, category, amount, date }) {
  return this.create({ userId, category, amount, date: new Date(date) });
};

ExpenseSchema.statics.deleteById = function (id) {
  return this.findByIdAndDelete(id);
};

ExpenseSchema.statics.aggregateDailyByUser = function (userObjectId, startDate) {
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

ExpenseSchema.statics.aggregateTotalByUser = function (userObjectId) {
  return this.aggregate([
    { $match: { userId: userObjectId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
};

ExpenseSchema.statics.findRecentByUser = function (userId, limit = 5) {
  return this.find({ userId }).sort({ date: -1 }).populate("category").limit(limit);
};

ExpenseSchema.statics.findByUserSince = function (userId, sinceDate) {
  return this.find({ userId, date: { $gte: sinceDate } })
    .sort({ date: -1 })
    .populate("category");
};

ExpenseSchema.statics.aggregateMonthlyByUser = function (userObjectId) {
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

ExpenseSchema.statics.aggregateByCategory = function (userObjectId) {
  return this.aggregate([
    { $match: { userId: userObjectId } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    { $unwind: "$categoryInfo" },
    {
      $project: {
        name: "$categoryInfo.name",
        icon: "$categoryInfo.icon",
        total: 1,
      },
    },
    { $sort: { total: -1 } },
  ]);
};

export default mongoose.model("Expense", ExpenseSchema);
