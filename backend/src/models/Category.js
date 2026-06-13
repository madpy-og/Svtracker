import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

// ── Static Methods ─────────────────────────────────────────────

CategorySchema.statics.findAllSorted = function () {
  return this.aggregate([
    {
      $addFields: {
        sortOrder: {
          $cond: {
            if: { $eq: [{ $toLower: "$name" }, "others"] },
            then: 1,
            else: 0,
          },
        },
      },
    },
    { $sort: { sortOrder: 1, name: 1 } },
    { $project: { sortOrder: 0 } },
  ]);
};

CategorySchema.statics.createCategory = function ({ name, icon }) {
  return this.create({ name, icon });
};

CategorySchema.statics.deleteById = function (id) {
  return this.findByIdAndDelete(id);
};

export default mongoose.model("Category", CategorySchema);
