import mongoose from "mongoose";

const SourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

// ── Static Methods ─────────────────────────────────────────────

SourceSchema.statics.findAllSorted = function () {
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

SourceSchema.statics.createSource = function ({ name, icon }) {
  return this.create({ name, icon });
};

SourceSchema.statics.deleteById = function (id) {
  return this.findByIdAndDelete(id);
};

export default mongoose.model("Source", SourceSchema);
